import { NextResponse } from "next/server";
import { z } from "zod";
import { getAnthropicClient, CHATBOT_MODEL } from "@/lib/anthropic";
import { buildCatalogContext } from "@/lib/catalog-context";
import { routing } from "@/i18n/routing";

const chatSchema = z.object({
  locale: z.enum(routing.locales),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(4000),
      }),
    )
    .min(1)
    .max(30),
});

const LOCALE_NAMES: Record<string, string> = {
  fr: "français",
  ar: "arabe",
  en: "anglais",
};

const FALLBACK_MESSAGES: Record<string, string> = {
  fr: "Le chatbot n'est pas encore configuré. Merci de nous contacter directement via le formulaire de contact ou par téléphone au +213 561 62 07 52.",
  ar: "المساعد الآلي غير مُهيأ بعد. يرجى الاتصال بنا مباشرة عبر نموذج الاتصال أو هاتفيًا على +213 561 62 07 52.",
  en: "The chatbot isn't configured yet. Please contact us directly via the contact form or by phone at +213 561 62 07 52.",
};

function buildSystemPrompt(catalogContext: string, localeName: string) {
  return `Tu es l'assistant virtuel du site web de TN Marine (EURL Technic Nautic Marine Import), distributeur agréé d'électronique marine et de peintures nautiques basé à Aïn Benian, Alger.

Ton rôle : répondre aux questions des visiteurs sur le catalogue de produits, les marques et leurs caractéristiques techniques, en te basant STRICTEMENT sur le catalogue fourni ci-dessous.

Règles impératives :
- Réponds toujours dans la langue utilisée par le visiteur dans son dernier message. Si tu ne peux pas la déterminer, réponds en ${localeName}.
- Base-toi uniquement sur les informations du catalogue ci-dessous. N'invente jamais de caractéristique, de prix, de stock ou de délai.
- Si un produit ou une information demandée n'est pas dans le catalogue, dis-le honnêtement et propose de contacter TN Marine ou de faire une demande de proforma sur le site.
- Pour tout produit marqué [Autorisation ANF nécessaire], rappelle que l'achat/l'exploitation de cet équipement nécessite une autorisation de l'Agence Nationale des Fréquences (ANF), et oriente vers la page "Guide des autorisations" du site.
- Ton périmètre est strictement limité au catalogue, aux marques et aux informations générales de l'entreprise (adresse, horaires, contact). Tu n'as accès à aucune donnée de compte client, commande, rendez-vous ou proforma — n'invente jamais de telles informations et redirige vers l'espace client ou le contact si on te le demande.
- Réponds de façon concise, professionnelle et chaleureuse, en texte simple (pas de markdown).
- Coordonnées TN Marine si besoin : Lotissement Zagami N°09, La Madrague, Aïn Benian 16018, Alger — tél. +213 561 62 07 52.

Catalogue produits (10 marques : Lowrance, Simrad, Garmin, C-MAP, Navionics, Fusion, Minn Kota, International, Cobra Marine, Airmar) :
${catalogContext}`;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = chatSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const { locale, messages } = parsed.data;

  try {
    const catalogContext = await buildCatalogContext();
    const system = buildSystemPrompt(
      catalogContext,
      LOCALE_NAMES[locale] ?? "français",
    );

    const client = getAnthropicClient();
    const response = await client.messages.create({
      model: CHATBOT_MODEL,
      max_tokens: 1024,
      system,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const reply = textBlock?.text?.trim() || FALLBACK_MESSAGES[locale];

    return NextResponse.json({ reply });
  } catch (error) {
    // Clé API absente/invalide, ou service indisponible : on répond
    // proprement plutôt que de casser le widget (même logique que pour
    // l'envoi d'e-mail — voir src/lib/mail.ts).
    console.error("[chat] Erreur API Anthropic :", error);
    return NextResponse.json({ reply: FALLBACK_MESSAGES[locale] });
  }
}
