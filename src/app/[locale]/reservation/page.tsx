import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { redirect } from "@/i18n/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import AppointmentForm from "@/components/booking/AppointmentForm";
import AppointmentsList from "@/components/booking/AppointmentsList";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Booking" });
  return { title: t("metaTitle") };
}

export default async function ReservationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Booking");

  const session = await auth();
  if (!session?.user?.id) {
    redirect({ href: "/connexion", locale });
    return null;
  }

  const appointments = await prisma.appointment.findMany({
    where: { userId: session.user.id },
    orderBy: { date: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wider text-secondary">
        {t("kicker")}
      </p>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{t("title")}</h1>
      <p className="mt-4 text-text-muted">{t("intro")}</p>

      <div className="mt-10 rounded-xl border border-border bg-surface-alt p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-primary">{t("formHeading")}</h2>
        <div className="mt-6">
          <AppointmentForm />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold">{t("myAppointmentsHeading")}</h2>
        <div className="mt-6">
          <AppointmentsList appointments={appointments} />
        </div>
      </div>
    </div>
  );
}
