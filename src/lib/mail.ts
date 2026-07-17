import nodemailer from "nodemailer";

/**
 * Envoi d'e-mail via SMTP. Configuré par variables d'environnement
 * (voir .env.example) : tant qu'elles ne sont pas renseignées, les
 * messages sont simplement journalisés côté serveur au lieu d'échouer,
 * pour que les formulaires restent utilisables en développement.
 */

interface ContactEmailInput {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ProformaLineInput {
  productName: string;
  reference: string;
  quantity: number;
}

interface ProformaEmailInput {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
  lines: ProformaLineInput[];
}

function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });
}

async function sendOrLog(options: {
  to: string;
  subject: string;
  body: string;
  replyTo?: string;
  logLabel: string;
}) {
  const transport = getTransport();

  if (!transport) {
    // SMTP non configuré : on journalise pour ne pas bloquer les formulaires en local.
    console.info(`[${options.logLabel}] SMTP non configuré — e-mail non envoyé :`, {
      to: options.to,
      subject: options.subject,
      body: options.body,
    });
    return { delivered: false as const };
  }

  try {
    await transport.sendMail({
      to: options.to,
      from: process.env.SMTP_USER,
      replyTo: options.replyTo,
      subject: options.subject,
      text: options.body,
    });
  } catch (error) {
    // Un envoi SMTP raté ne doit pas faire planter l'action appelante :
    // les données ont déjà été enregistrées en base, donc on journalise
    // l'échec sans le propager (évite un crash / une double soumission).
    console.error(`[${options.logLabel}] Échec de l'envoi de l'e-mail :`, error);
    return { delivered: false as const };
  }

  return { delivered: true as const };
}

export async function sendContactEmail(input: ContactEmailInput) {
  const to = process.env.CONTACT_TO_EMAIL || "contact@tnmarine.dz";
  const subject = `Nouveau message de contact — ${input.name}`;
  const body = [
    `Nom : ${input.name}`,
    `E-mail : ${input.email}`,
    `Téléphone : ${input.phone || "—"}`,
    "",
    input.message,
  ].join("\n");

  return sendOrLog({ to, subject, body, replyTo: input.email, logLabel: "contact" });
}

function formatProformaLines(lines: ProformaLineInput[]) {
  return lines
    .map(
      (line, index) =>
        `${index + 1}. ${line.productName}` +
        (line.reference ? ` (réf. ${line.reference})` : "") +
        ` — qté ${line.quantity}`,
    )
    .join("\n");
}

/**
 * Envoie la demande de proforma à l'équipe commerciale, et un accusé de
 * réception au client (cahier des charges §6.6).
 */
export async function sendProformaEmails(input: ProformaEmailInput) {
  const salesTo = process.env.CONTACT_TO_EMAIL || "contact@tnmarine.dz";
  const linesText = formatProformaLines(input.lines);

  const salesBody = [
    `Nom : ${input.fullName}`,
    `E-mail : ${input.email}`,
    `Téléphone : ${input.phone}`,
    `Société : ${input.company || "—"}`,
    "",
    "Produits demandés :",
    linesText,
    "",
    input.notes ? `Précisions :\n${input.notes}` : "",
  ].join("\n");

  const sales = await sendOrLog({
    to: salesTo,
    subject: `Nouvelle demande de proforma — ${input.fullName}`,
    body: salesBody,
    replyTo: input.email,
    logLabel: "proforma:equipe",
  });

  const clientBody = [
    `Bonjour ${input.fullName},`,
    "",
    "Nous avons bien reçu votre demande de proforma pour les produits suivants :",
    linesText,
    "",
    "Notre équipe commerciale vous recontactera avec une proforma détaillée dans les meilleurs délais.",
    "",
    "TN Marine — Technic Nautic Marine Import",
  ].join("\n");

  const client = await sendOrLog({
    to: input.email,
    subject: "Accusé de réception — Votre demande de proforma TN Marine",
    body: clientBody,
    logLabel: "proforma:client",
  });

  return { salesDelivered: sales.delivered, clientDelivered: client.delivered };
}
