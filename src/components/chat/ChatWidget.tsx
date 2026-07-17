"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const t = useTranslations("Chatbot");
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, isOpen]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isPending) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: text },
    ];
    setMessages(nextMessages);
    setInput("");
    setIsPending(true);
    setError(false);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, messages: nextMessages }),
      });
      if (!res.ok) throw new Error("chat request failed");
      const data = (await res.json()) as { reply?: string };
      setMessages([
        ...nextMessages,
        { role: "assistant", content: data.reply || t("errorMessage") },
      ]);
    } catch {
      setError(true);
      setMessages([
        ...nextMessages,
        { role: "assistant", content: t("errorMessage") },
      ]);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="fixed bottom-4 end-4 z-50">
      {isOpen && (
        <div className="mb-3 flex h-[28rem] w-[22rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-xl border border-border bg-surface-alt shadow-2xl">
          <div className="flex items-center justify-between bg-primary px-4 py-3 text-text-inverse">
            <p className="text-sm font-semibold">{t("title")}</p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label={t("closeLabel")}
              className="rounded p-1 hover:bg-white/10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            <div className="max-w-[85%] rounded-lg bg-surface px-3.5 py-2.5 text-sm text-text">
              {t("welcomeMessage")}
            </div>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm ${
                  message.role === "user"
                    ? "ms-auto bg-secondary text-surface-alt"
                    : "bg-surface text-text"
                }`}
              >
                {message.content}
              </div>
            ))}
            {isPending && (
              <div className="max-w-[85%] rounded-lg bg-surface px-3.5 py-2.5 text-sm text-text-muted">
                {t("sending")}
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("inputPlaceholder")}
              disabled={isPending}
              className="min-w-0 flex-1 rounded-md border border-border bg-surface px-3 py-2 text-sm text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
            />
            <button
              type="submit"
              disabled={isPending || !input.trim()}
              className="rounded-md bg-accent px-3.5 py-2 text-sm font-semibold text-primary-dark hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {t("send")}
            </button>
          </form>
          {error && (
            <p role="alert" className="px-3 pb-2 text-xs text-red-600">
              {t("errorMessage")}
            </p>
          )}
          <p className="border-t border-border px-3 py-2 text-center text-[11px] text-text-muted/70">
            {t("disclaimer")}
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-label={isOpen ? t("closeLabel") : t("openLabel")}
        className="ms-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary-dark shadow-lg transition-transform hover:scale-105 hover:bg-accent-dark"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.5-1.185A8.959 8.959 0 0 1 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
