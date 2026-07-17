"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { submitContactForm, type ContactFormState } from "@/app/actions/contact";

const initialState: ContactFormState = { status: "idle" };

export default function ContactForm() {
  const t = useTranslations("Contact.form");
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );

  return (
    <form action={formAction} noValidate className="space-y-5">
      {/* Piège anti-spam, invisible pour les visiteurs humains */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text">
          {t("name")}
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
          <p className="mt-1 text-xs text-red-600">{t("errorName")}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text">
            {t("email")}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1.5 w-full rounded-md border border-border bg-surface-alt px-3.5 py-2.5 text-sm text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
          />
          {state.errors?.email && (
            <p className="mt-1 text-xs text-red-600">{t("errorEmail")}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-text">
            {t("phone")}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            dir="ltr"
            className="mt-1.5 w-full rounded-md border border-border bg-surface-alt px-3.5 py-2.5 text-sm text-text text-start focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={5}
          className="mt-1.5 w-full rounded-md border border-border bg-surface-alt px-3.5 py-2.5 text-sm text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
        />
        {state.errors?.message && (
          <p className="mt-1 text-xs text-red-600">{t("errorMessage")}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-surface-alt transition-colors hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? t("sending") : t("submit")}
      </button>

      {state.status === "success" && (
        <p
          role="status"
          className="rounded-md border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary-dark"
        >
          {t("success")}
        </p>
      )}
      {state.status === "error" && !state.errors && (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {t("genericError")}
        </p>
      )}
    </form>
  );
}
