"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { sendProformaEmails } from "@/lib/mail";

const lineSchema = z
  .object({
    productId: z.string().optional(),
    freeText: z.string().trim().max(200).optional(),
    reference: z.string().trim().max(100).optional(),
    quantity: z.number().int().min(1).max(999),
  })
  .refine((line) => Boolean(line.productId) || Boolean(line.freeText), {
    message: "PRODUCT_REQUIRED",
    path: ["productId"],
  });

const proformaSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.email(),
  phone: z.string().trim().min(6).max(30),
  company: z.string().trim().max(160).optional().default(""),
  notes: z.string().trim().max(2000).optional().default(""),
  lines: z.array(lineSchema).min(1),
});

export type ProformaState = {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<"fullName" | "email" | "phone" | "lines", string>>;
};

export async function submitProformaAction(
  _prevState: ProformaState,
  formData: FormData,
): Promise<ProformaState> {
  const session = await auth();

  const lineIds = String(formData.get("lineIds") || "")
    .split(",")
    .filter(Boolean);

  const rawLines = lineIds.map((id) => {
    const productIdRaw = String(formData.get(`product_${id}`) || "");
    return {
      productId:
        productIdRaw && productIdRaw !== "autre" ? productIdRaw : undefined,
      freeText: String(formData.get(`freeText_${id}`) || "").trim() || undefined,
      reference: String(formData.get(`reference_${id}`) || "").trim() || undefined,
      quantity: Number(formData.get(`quantity_${id}`)),
    };
  });

  const parsed = proformaSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    company: formData.get("company"),
    notes: formData.get("notes"),
    lines: rawLines,
  });

  if (!parsed.success) {
    const errors: ProformaState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "fullName" || key === "email" || key === "phone") {
        errors[key] = issue.message;
      } else if (key === "lines") {
        errors.lines = "INVALID";
      }
    }
    return { status: "error", errors };
  }

  const request = await prisma.proformaRequest.create({
    data: {
      userId: session?.user?.id,
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      company: parsed.data.company || null,
      notes: parsed.data.notes || null,
      lines: {
        create: parsed.data.lines.map((line) => ({
          productId: line.productId || null,
          freeText: line.freeText || null,
          reference: line.reference || null,
          quantity: line.quantity,
        })),
      },
    },
    include: { lines: { include: { product: true } } },
  });

  await sendProformaEmails({
    fullName: parsed.data.fullName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    company: parsed.data.company || "",
    notes: parsed.data.notes || "",
    lines: request.lines.map((line) => ({
      productName: line.product?.name || line.freeText || "—",
      reference: line.reference || "",
      quantity: line.quantity,
    })),
  });

  return { status: "success" };
}
