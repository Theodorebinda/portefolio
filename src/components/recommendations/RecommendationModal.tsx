"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Loader2, Star, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Session } from "next-auth";

interface RecommendationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: Session["user"];
  onSubmitted?: () => void;
}

const MIN_LENGTH = 50;
const MAX_LENGTH = 500;

export function RecommendationModal({
  open,
  onOpenChange,
  user,
  onSubmitted,
}: RecommendationModalProps) {
  const [message, setMessage] = useState("");
  const [headline, setHeadline] = useState(user.headline ?? "");
  const [rating, setRating] = useState<number | null>(null);
  const [consentAccepted, setConsentAccepted] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!open) return;

    setHeadline(user.headline ?? "");
    setMessage("");
    setRating(null);
    setConsentAccepted(true);
    setSubmitting(false);
    setError(null);
    setSuccess(false);
  }, [open, user.headline]);

  const remaining = MAX_LENGTH - message.length;
  const canSubmit = useMemo(
    () =>
      message.trim().length >= MIN_LENGTH &&
      message.trim().length <= MAX_LENGTH &&
      consentAccepted &&
      !submitting,
    [message, consentAccepted, submitting],
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          headline,
          rating,
          publicConsent: consentAccepted,
          storageConsent: consentAccepted,
        }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message ?? "Erreur pendant l'envoi.");
      }

      setSuccess(true);
      onSubmitted?.();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Erreur pendant l'envoi.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[92vh] w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-md border border-white/10 bg-[#222020] p-5 text-slate-100 shadow-2xl focus:outline-none">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-xl font-bold">
                Recommander Theodore
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-slate-400">
                Votre recommandation sera relue avant publication.
              </Dialog.Description>
            </div>
            <Dialog.Close className="rounded-md p-1 text-slate-400 transition hover:bg-white/10 hover:text-white">
              <X size={20} />
              <span className="sr-only">Fermer</span>
            </Dialog.Close>
          </div>

          <div className="mb-5 flex items-center gap-3 rounded-md bg-white/5 p-3">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name ?? "Profil LinkedIn"}
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#b2d2fa] font-bold text-black">
                {(user.name ?? "L").slice(0, 1).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate font-semibold">{user.name}</p>
              <p className="truncate text-xs text-slate-400">{user.email}</p>
            </div>
          </div>

          {success ? (
            <div className="rounded-md border border-[#b2d2fa]/40 bg-[#b2d2fa]/10 p-4 text-sm text-[#d7e9ff]">
              Merci ! Votre recommandation sera visible apres moderation.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="flex flex-col gap-2 text-sm font-medium">
                Titre professionnel
                <input
                  type="text"
                  value={headline}
                  onChange={(event) => setHeadline(event.target.value)}
                  maxLength={180}
                  className="rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm text-white outline-none transition focus:border-[#b2d2fa]"
                  placeholder="Ex: Developpeur full-stack"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium">
                Recommandation
                <textarea
                  required
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  minLength={MIN_LENGTH}
                  maxLength={MAX_LENGTH}
                  rows={6}
                  className="resize-none rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm leading-6 text-white outline-none transition focus:border-[#b2d2fa]"
                  placeholder="Partagez votre experience de collaboration..."
                />
                <span className="text-xs text-slate-400">
                  {message.length}/{MAX_LENGTH} caracteres, {remaining} restants
                </span>
              </label>

              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium">Note optionnelle</span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const value = index + 1;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRating(value)}
                        className="rounded-md p-1 text-[#d09e72] transition hover:bg-white/10"
                        aria-label={`${value} etoile${value > 1 ? "s" : ""}`}
                      >
                        <Star
                          size={22}
                          fill={
                            rating && value <= rating ? "currentColor" : "none"
                          }
                        />
                      </button>
                    );
                  })}
                  {rating && (
                    <button
                      type="button"
                      onClick={() => setRating(null)}
                      className="ml-2 text-xs text-slate-400 underline-offset-4 hover:text-white hover:underline"
                    >
                      Retirer
                    </button>
                  )}
                </div>
              </div>

              <label className="flex items-start gap-3 rounded-md border border-white/10 p-3 text-sm leading-6">
                <input
                  type="checkbox"
                  checked={consentAccepted}
                  onChange={(event) => setConsentAccepted(event.target.checked)}
                  className="mt-1"
                  required
                />
                <span>
                  J&apos;accepte que mon nom, photo, titre professionnel et
                  recommandation ou mon temoignage soient affiches publiquement
                  pour d&apos;autre visiteurs.
                </span>
              </label>

              {error && (
                <p className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={!canSubmit}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#b2d2fa] px-4 text-sm font-semibold text-black transition hover:bg-[#5182be] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting && <Loader2 size={16} className="animate-spin" />}
                Envoyer
              </button>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
