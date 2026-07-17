import { getLocale, getTranslations } from "next-intl/server";

interface AppointmentsListProps {
  appointments: {
    id: string;
    date: Date;
    topic: string | null;
    notes: string | null;
    status: "PENDING" | "CONFIRMED" | "CANCELLED";
  }[];
}

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-accent/15 text-accent-dark",
  CONFIRMED: "bg-secondary/15 text-secondary-dark",
  CANCELLED: "bg-red-100 text-red-700",
};

export default async function AppointmentsList({
  appointments,
}: AppointmentsListProps) {
  const t = await getTranslations("Booking");
  const locale = await getLocale();

  if (appointments.length === 0) {
    return (
      <p className="rounded-lg border border-border bg-surface-alt px-6 py-8 text-center text-text-muted">
        {t("noAppointments")}
      </p>
    );
  }

  const formatter = new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <ul className="space-y-3">
      {appointments.map((appointment) => (
        <li
          key={appointment.id}
          className="flex flex-col gap-2 rounded-lg border border-border bg-surface-alt p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="font-medium text-text">{appointment.topic}</p>
            <p className="mt-0.5 text-sm text-text-muted">
              {formatter.format(appointment.date)}
            </p>
            {appointment.notes && (
              <p className="mt-1 text-sm text-text-muted">{appointment.notes}</p>
            )}
          </div>
          <span
            className={`shrink-0 self-start rounded-full px-3 py-1 text-xs font-medium sm:self-center ${STATUS_STYLES[appointment.status]}`}
          >
            {t(`status.${appointment.status}`)}
          </span>
        </li>
      ))}
    </ul>
  );
}
