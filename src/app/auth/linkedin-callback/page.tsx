"use client";

import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const LINKEDIN_SUCCESS_MESSAGE = "linkedin:success";

export default function LinkedInCallbackPage() {
  useEffect(() => {
    if (window.opener) {
      window.opener.postMessage(
        LINKEDIN_SUCCESS_MESSAGE,
        window.location.origin
      );

      window.setTimeout(() => {
        window.close();
      }, 500);
      return;
    }

    window.location.replace("/?recommendation=1");
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#222020] px-6 text-center text-white">
      <Loader2 className="h-8 w-8 animate-spin text-[#b2d2fa]" />
      <h1 className="text-xl font-bold">Connexion LinkedIn terminee</h1>
      <p className="max-w-sm text-sm leading-6 text-slate-300">
        Cette fenetre va se fermer automatiquement.
      </p>
    </main>
  );
}
