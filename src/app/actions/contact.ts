"use server";

import { z } from "zod";
import { sendContactEmail } from "@/lib/mail";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email(),
  phone: z.string().trim().max(30).optional().default(""),
  message: z.string().trim().min(10).max(4000),
  // Champ piège anti-spam : doit rester vide (rempli uniquement par des bots
  // ou parfois par un remplissage automatique du navigateur). Pas de
  // contrainte max ici : la détection se fait après coup (ligne ci-dessous),
  // pour ne jamais faire échouer la validation ni masquer les vraies erreurs.
  website: z.string().optional().default(""),
});

export type ContactFormState = {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<"name" | "email" | "phone" | "message", string>>;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
    website: formData.get("website"),
  });

  if (!parsed.success) {
    const fieldErrors: ContactFormState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (
        key === "name" ||
        key === "email" ||
        key === "phone" ||
        key === "message"
      ) {
        fieldErrors[key] = issue.message;
      }
    }
    return { status: "error", errors: fieldErrors };
  }

  if (parsed.data.website) {
    // Honeypot rempli : on répond succès sans rien envoyer.
    return { status: "success" };
  }

  await sendContactEmail(parsed.data);

  return { status: "success" };
}
