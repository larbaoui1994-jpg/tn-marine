"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { registerAction, type RegisterState } from "@/app/actions/auth";

const initialState: RegisterState = { status: "idle" };

export default function SignUpForm() {
  const t = useTranslations("Auth");
  const [state, formAction, isPending] = useActionState(registerAction, initialState);

  return (
    <form action={formAction} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text">
          {t("nameLabel")}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          minLength={2}
          maxLength={120}
          className="mt-1.5 w-full rounded-md border border-border bg-surface-alt px-3.5 py-2.5 text-sm text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
        />
        {state.errors?.name && (
          <p className="mt-1 text-xs text-red-600">{t("errors.nameTooShort")}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text">
          {t("emailLabel")}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="mt-1.5 w-full rounded-md border border-border bg-surface-alt px-3.5 py-2.5 text-sm text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
        />
        {state.errors?.email && (
          <p className="mt-1 text-xs text-red-600">{t("errors.emailInvalid")}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text">
          {t("passwordLabel")}
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          minLength={8}
          className="mt-1.5 w-full rounded-md border border-border bg-surface-alt px-3.5 py-2.5 text-sm text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
        />
        <p className="mt-1 text-xs text-text-muted">{t("passwordHint")}</p>
        {state.errors?.password && (
          <p className="mt-1 text-xs text-red-600">{t("errors.passwordTooShort")}</p>
        )}
      </div>

      {state.formError === "EMAIL_TAKEN" && (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {t("errors.emailTaken")}
        </p>
      )}
      {state.formError === "SIGNIN_AFTER_SIGNUP_FAILED" && (
        <p role="alert" className="rounded-md border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent-dark">
          {t("errors.signinAfterSignupFailed")}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-primary px-5 py-3 text-sm font-semibold text-surface-alt transition-colors hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? t("signupSubmitting") : t("signupSubmit")}
      </button>
    </form>
  );
}
