import type { ContactAdminPayload } from "../types";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function buildContactAdminMail(payload: ContactAdminPayload) {
  const name = payload.name.trim().replace(/[\r\n]+/g, " ");
  const email = payload.email.trim();
  const message = payload.message.trim();

  const escapedName = escapeHtml(name);
  const escapedEmail = escapeHtml(email);
  const escapedMessage = escapeHtml(message).replace(/\n/g, "<br />");

  return {
    subject: `Nouveau message portfolio - ${name}`,
    replyTo: email,
    text: [
      "Nouveau message depuis le portfolio.",
      "",
      `Nom: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
        <h1 style="font-size: 20px; margin: 0 0 16px;">Nouveau message depuis le portfolio</h1>
        <p style="margin: 0 0 8px;"><strong>Nom:</strong> ${escapedName}</p>
        <p style="margin: 0 0 16px;"><strong>Email:</strong> ${escapedEmail}</p>
        <div style="margin-top: 16px;">
          <p style="margin: 0 0 8px;"><strong>Message:</strong></p>
          <p style="margin: 0;">${escapedMessage}</p>
        </div>
      </div>
    `.trim(),
  };
}
