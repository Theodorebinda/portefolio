import { Resend } from "resend";
import type { BuiltMail, MailResult } from "./types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let resendClient: Resend | null = null;
let resendClientKey: string | null = null;

function isMailEnabled() {
  return (process.env.MAIL_ENABLED ?? "true").toLowerCase() !== "false";
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

export function parseMailRecipients(value: string | string[] | undefined) {
  const rawRecipients = Array.isArray(value)
    ? value
    : (value ?? "").split(",");

  const recipients = rawRecipients
    .map((recipient) => recipient.trim().toLowerCase())
    .filter(Boolean);

  if (recipients.length === 0) {
    return [];
  }

  if (recipients.some((recipient) => !EMAIL_PATTERN.test(recipient))) {
    return [];
  }

  return Array.from(new Set(recipients));
}

export function getAdminRecipients() {
  return parseMailRecipients(process.env.MAIL_ADMIN_RECIPIENTS);
}

function getResendClient(apiKey: string) {
  if (!resendClient || resendClientKey !== apiKey) {
    resendClient = new Resend(apiKey);
    resendClientKey = apiKey;
  }

  return resendClient;
}

export async function sendBuiltMail(mail: BuiltMail): Promise<MailResult> {
  if (!isMailEnabled()) {
    console.info("[mail] MAIL_ENABLED=false: simulated send", {
      subject: mail.subject,
      toCount: parseMailRecipients(mail.to).length,
    });

    return { ok: true, providerId: "mail-disabled" };
  }

  const from = process.env.MAIL_FROM?.trim();
  if (!from) {
    console.error("[mail] Missing MAIL_FROM configuration", {
      subject: mail.subject,
    });

    return {
      ok: false,
      code: "MAIL_CONFIG_ERROR",
      message: "Mail sender is not configured.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error("[mail] Missing RESEND_API_KEY configuration", {
      subject: mail.subject,
    });

    return {
      ok: false,
      code: "MAIL_CONFIG_ERROR",
      message: "Mail provider is not configured.",
    };
  }

  const recipients = parseMailRecipients(mail.to);
  if (recipients.length === 0) {
    console.error("[mail] Invalid or empty mail recipients", {
      subject: mail.subject,
    });

    return {
      ok: false,
      code: "MAIL_CONFIG_ERROR",
      message: "Mail recipients are not configured.",
    };
  }

  try {
    const response = await getResendClient(apiKey).emails.send({
      from,
      to: recipients,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
      replyTo: mail.replyTo,
    });

    if (response.error) {
      console.error("[mail] Resend send failed", {
        subject: mail.subject,
        toCount: recipients.length,
        errorName: response.error.name,
        errorMessage: response.error.message,
      });

      return {
        ok: false,
        code: "MAIL_SEND_ERROR",
        message: "Mail provider failed to send the message.",
      };
    }

    return { ok: true, providerId: response.data?.id };
  } catch (error) {
    console.error("[mail] Unexpected mail send failure", {
      subject: mail.subject,
      toCount: recipients.length,
      error: getErrorMessage(error),
    });

    return {
      ok: false,
      code: "MAIL_SEND_ERROR",
      message: "Mail provider failed to send the message.",
    };
  }
}
