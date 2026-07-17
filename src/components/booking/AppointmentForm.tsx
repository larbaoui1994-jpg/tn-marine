"use client";

import { useActionState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import {
  createAppointmentAction,
  type AppointmentState,
} from "@/app/actions/appointments";

const initialState: AppointmentState = { status: "idle" };

export default function AppointmentForm() {
  const t = useTranslations("Booking");
  const [state, formAction, isPending] = useActionState(
    createAppointmentAction,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form ref={formRef} action={formAction} noValidate className="space-y-5">
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-text">
          {t("dateLabel")}
        </label>
        <input
          type="datetime-local"
          id="date"
          name="date"
          required
          className="mt-1.5 w-full rounded-md border border-border bg-surface-alt px-3.5 py-2.5 text-sm text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
        />
        {state.errors?.date && (
          <p className="mt-1 text-xs text-red-600">{t("errorDate")}</p>
        )}
      </div>

      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-text">
          {t("topicLabel")}
        </label>
        <input
          type="text"
          id="topic"
          name="topic"
          required
          maxLength={200}
          placeholder={t("topicPlaceholder")}
          className="mt-1.5 w-full rounded-md border border-border bg-surface-alt px-3.5 py-2.5 text-sm text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
        />
        {state.errors?.topic && (
          <p className="mt-1 text-xs text-red-600">{t("errorTopic")}</p>
        )}
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-text">
          {t("notesLabel")}
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          maxLength={2000}
          className="mt-1.5 w-full rounded-md border border-border bg-surface-alt px-3.5 py-2.5 text-sm text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-primary-dark transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? t("submitting") : t("submit")}
      </button>

      {state.status === "success" && (
        <p role="status" className="rounded-md border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary-dark">
          {t("success")}
        </p>
      )}
    </form>
  );
}
