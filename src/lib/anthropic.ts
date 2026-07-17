import Anthropic from "@anthropic-ai/sdk";

let client: Anthropic | null = null;

/**
 * Client Anthropic paresseux : instancié seulement au premier appel, pour
 * ne jamais faire échouer le démarrage de l'app si la clé n'est pas encore
 * configurée (voir CHATBOT_MODEL / ANTHROPIC_API_KEY dans .env.example).
 */
export function getAnthropicClient(): Anthropic {
  if (!client) {
    client = new Anthropic();
  }
  return client;
}

export const CHATBOT_MODEL = "claude-opus-4-8";
