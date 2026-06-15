"use client";

import { signIn } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";

const LINKEDIN_SUCCESS_MESSAGE = "linkedin:success";
const DEFAULT_REDIRECT_TO = "/auth/linkedin-callback?recommendation=1";
const POPUP_WIDTH = 600;
const POPUP_HEIGHT = 700;

interface UseLinkedInAuthOptions {
  redirectTo?: string;
  onSuccess?: () => void | Promise<void>;
}

function isMobileUserAgent(userAgent: string) {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i.test(
    userAgent
  );
}

function getCenteredPopupFeatures() {
  const dualScreenLeft = window.screenLeft ?? window.screenX ?? 0;
  const dualScreenTop = window.screenTop ?? window.screenY ?? 0;
  const viewportWidth =
    window.innerWidth || document.documentElement.clientWidth || screen.width;
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight || screen.height;
  const left = dualScreenLeft + Math.max(0, (viewportWidth - POPUP_WIDTH) / 2);
  const top = dualScreenTop + Math.max(0, (viewportHeight - POPUP_HEIGHT) / 2);

  return [
    "popup=yes",
    `width=${POPUP_WIDTH}`,
    `height=${POPUP_HEIGHT}`,
    `left=${Math.round(left)}`,
    `top=${Math.round(top)}`,
    "resizable=yes",
    "scrollbars=yes",
    "status=no",
    "toolbar=no",
    "menubar=no",
    "location=no",
  ].join(",");
}

function writePopupLoadingState(popup: Window) {
  try {
    popup.document.write(`
      <!doctype html>
      <html lang="fr">
        <head><title>Connexion LinkedIn</title></head>
        <body style="margin:0;background:#222020;color:white;font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;">
          <p style="font-size:14px;color:#d7e9ff;">Connexion a LinkedIn...</p>
        </body>
      </html>
    `);
    popup.document.close();
  } catch {
    // The popup can become cross-origin very quickly in some browsers.
  }
}

export function useLinkedInAuth({
  redirectTo = DEFAULT_REDIRECT_TO,
  onSuccess,
}: UseLinkedInAuthOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const popupRef = useRef<Window | null>(null);
  const closeWatcherRef = useRef<number | null>(null);

  const clearCloseWatcher = useCallback(() => {
    if (!closeWatcherRef.current) return;

    window.clearInterval(closeWatcherRef.current);
    closeWatcherRef.current = null;
  }, []);

  const closePopup = useCallback(() => {
    try {
      popupRef.current?.close();
    } catch {
      // No-op: the popup may already be closed.
    } finally {
      popupRef.current = null;
    }
  }, []);

  const startCloseWatcher = useCallback(() => {
    clearCloseWatcher();
    closeWatcherRef.current = window.setInterval(() => {
      if (!popupRef.current?.closed) return;

      popupRef.current = null;
      clearCloseWatcher();
      setIsLoading(false);
    }, 500);
  }, [clearCloseWatcher]);

  const fallbackToRedirect = useCallback(async () => {
    setIsLoading(true);
    await signIn("linkedin", {
      redirectTo,
    });
  }, [redirectTo]);

  const loginWithLinkedIn = useCallback(async () => {
    setIsLoading(true);

    if (isMobileUserAgent(navigator.userAgent)) {
      await fallbackToRedirect();
      return;
    }

    const popup = window.open(
      "",
      "linkedin-auth",
      getCenteredPopupFeatures()
    );

    if (!popup) {
      await fallbackToRedirect();
      return;
    }

    popupRef.current = popup;
    writePopupLoadingState(popup);

    try {
      const response = await signIn("linkedin", {
        redirect: false,
        redirectTo,
      });

      if (!response?.url) {
        throw new Error("LinkedIn sign-in URL unavailable.");
      }

      popup.location.assign(response.url);
      popup.focus();
      startCloseWatcher();
    } catch {
      clearCloseWatcher();
      closePopup();
      await fallbackToRedirect();
    }
  }, [
    clearCloseWatcher,
    closePopup,
    fallbackToRedirect,
    redirectTo,
    startCloseWatcher,
  ]);

  useEffect(() => {
    async function handleMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;
      if (event.data !== LINKEDIN_SUCCESS_MESSAGE) return;

      clearCloseWatcher();
      closePopup();
      setIsLoading(false);
      await onSuccess?.();
    }

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
      clearCloseWatcher();
    };
  }, [clearCloseWatcher, closePopup, onSuccess]);

  return {
    isLoading,
    loginWithLinkedIn,
  };
}
