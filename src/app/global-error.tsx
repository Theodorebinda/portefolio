"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#222020] px-6 text-center font-sans text-white">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#b2d2fa]">
            Erreur
          </p>
          <h1 className="text-3xl font-bold">Application indisponible</h1>
          <p className="max-w-lg text-sm leading-6 text-slate-300">
            Un probleme global a interrompu le rendu de l&apos;application.
          </p>
          {process.env.NODE_ENV === "development" && (
            <p className="max-w-lg break-words rounded-md bg-white/10 p-3 text-xs text-slate-300">
              {error.message}
            </p>
          )}
          <button
            type="button"
            onClick={reset}
            className="rounded-md bg-[#b2d2fa] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#5182be]"
          >
            Reessayer
          </button>
        </main>
      </body>
    </html>
  );
}
