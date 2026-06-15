import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#222020] px-6 text-center text-white">
      <p className="text-sm font-semibold uppercase tracking-wide text-[#b2d2fa]">
        404
      </p>
      <h1 className="text-3xl font-bold">Page introuvable</h1>
      <p className="max-w-lg text-sm leading-6 text-slate-300">
        La page demandee n&apos;existe pas ou a ete deplacee.
      </p>
      <Link
        href="/"
        className="rounded-md bg-[#b2d2fa] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#5182be]"
      >
        Retour a l&apos;accueil
      </Link>
    </main>
  );
}
