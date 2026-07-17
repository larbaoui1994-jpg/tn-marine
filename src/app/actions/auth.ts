"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { signIn } from "@/auth";

const registerSchema = z.object({
  name: z.string().trim().min(2).max(120),
  // Normalisé en minuscules pour que l'unicité et la connexion ne dépendent
  // pas de la casse saisie (ex. "John@Example.com" vs "john@example.com").
  email: z
    .email()
    .transform((value) => value.trim().toLowerCase()),
  password: z.string().min(8).max(72),
});

export type RegisterState = {
  status: "idle" | "error";
  errors?: Partial<Record<"name" | "email" | "password", string>>;
  formError?: "EMAIL_TAKEN" | "SIGNIN_AFTER_SIGNUP_FAILED";
};

export async function registerAction(
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const errors: RegisterState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "name" || key === "email" || key === "password") {
        errors[key] = issue.message;
      }
    }
    return { status: "error", errors };
  }

  const existing = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });
  if (existing) {
    return { status: "error", formError: "EMAIL_TAKEN" };
  }

  const hashedPassword = await bcrypt.hash(parsed.data.password, 10);
  try {
    await prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    // Deux inscriptions concurrentes avec le même e-mail peuvent toutes les
    // deux passer la vérification ci-dessus avant qu'aucune n'ait écrit :
    // la contrainte d'unicité en base est le filet de sécurité final.
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { status: "error", formError: "EMAIL_TAKEN" };
    }
    throw error;
  }

  try {
    // signIn() effectue une redirection interne (comportement attendu, ne
    // pas l'intercepter) une fois la session ouverte : c'est pourquoi seule
    // AuthError est interceptée ci-dessous, le reste est relancé tel quel.
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/reservation",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      // Le compte a bien été créé ; seule la connexion automatique a échoué
      // (ex. aléa transitoire) — on l'indique pour inviter à se connecter.
      return { status: "error", formError: "SIGNIN_AFTER_SIGNUP_FAILED" };
    }
    throw error;
  }

  return { status: "idle" };
}

export type LoginState = {
  status: "idle" | "error";
  formError?: "INVALID_CREDENTIALS";
};

export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: (formData.get("callbackUrl") as string) || "/reservation",
    });
    return { status: "idle" };
  } catch (error) {
    if (error instanceof AuthError) {
      return { status: "error", formError: "INVALID_CREDENTIALS" };
    }
    throw error;
  }
}
