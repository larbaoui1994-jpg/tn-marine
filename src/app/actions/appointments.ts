"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const appointmentSchema = z.object({
  date: z.string().min(1),
  topic: z.string().trim().max(200).optional().default(""),
  notes: z.string().trim().max(2000).optional().default(""),
});

export type AppointmentState = {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<"date" | "topic", string>>;
};

export async function createAppointmentAction(
  _prevState: AppointmentState,
  formData: FormData,
): Promise<AppointmentState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { status: "error" };
  }

  const parsed = appointmentSchema.safeParse({
    date: formData.get("date"),
    topic: formData.get("topic"),
    notes: formData.get("notes"),
  });

  if (!parsed.success) {
    const errors: AppointmentState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "date" || key === "topic") {
        errors[key] = issue.message;
      }
    }
    return { status: "error", errors };
  }

  const date = new Date(parsed.data.date);
  if (Number.isNaN(date.getTime()) || date.getTime() < Date.now()) {
    return { status: "error", errors: { date: "past" } };
  }

  if (!parsed.data.topic) {
    return { status: "error", errors: { topic: "required" } };
  }

  await prisma.appointment.create({
    data: {
      userId: session.user.id,
      date,
      topic: parsed.data.topic,
      notes: parsed.data.notes || null,
    },
  });

  revalidatePath("/[locale]/reservation", "page");

  return { status: "success" };
}
