"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { loginAction, type LoginState } from "@/app/actions/auth";

const initialState: LoginState = { status: "idle" };

export default function LoginForm() {
  const t = useTranslations("Auth");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/reservation";
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} noValidate className="space-y-5">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

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
          className="mt-1.5 w-full rounded-md border border-border bg-surface-alt px-3.5 py-2.5 text-sm text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
        />
      </div>

      {state.status === "error" && (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {t("errors.invalidCredentials")}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-primary px-5 py-3 text-sm font-semibold text-surface-alt transition-colors hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? t("loginSubmitting") : t("loginSubmit")}
      </button>
    </form>
  );
}
