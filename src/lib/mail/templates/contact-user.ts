import type { ContactUserPayload } from "../types";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function buildContactUserMail(payload: ContactUserPayload) {
  const name = payload.name.trim().replace(/[\r\n]+/g, " ");
  const escapedName = escapeHtml(name);

  return {
    subject: "Message bien reçu",
    text: [
      `Bonjour ${name},`,
      "",
      "Merci pour votre message. Il a bien été transmis depuis le portfolio.",
      "Je reviendrai vers vous dès que possible si une réponse est nécessaire.",
      "",
      "Theodore Samba",
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
        <p style="margin: 0 0 12px;">Bonjour ${escapedName},</p>
        <p style="margin: 0 0 12px;">Merci pour votre message. Il a bien été transmis depuis le portfolio.</p>
        <p style="margin: 0 0 16px;">Je reviendrai vers vous dès que possible si une réponse est nécessaire.</p>
        <p style="margin: 0;">Theodore Samba</p>
      </div>
    `.trim(),
  };
}
