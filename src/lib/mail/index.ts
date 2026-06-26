import { sendBuiltMail } from "./provider";
import { buildContactAdminMail } from "./templates/contact-admin";
import { buildContactUserMail } from "./templates/contact-user";
import type { MailResult, SendMailInput } from "./types";

export { getAdminRecipients, parseMailRecipients } from "./provider";
export type {
  BuiltMail,
  ContactAdminPayload,
  ContactUserPayload,
  MailPayloadMap,
  MailResult,
  MailType,
  SendMailInput,
} from "./types";

export async function sendMail(input: SendMailInput): Promise<MailResult> {
  switch (input.type) {
    case "contact.admin":
      return sendBuiltMail({
        to: input.to,
        ...buildContactAdminMail(input.payload),
      });
    case "contact.user":
      return sendBuiltMail({
        to: input.to,
        ...buildContactUserMail(input.payload),
      });
    default: {
      const unknownInput = input as { type?: string };

      console.error("[mail] Unknown mail type", {
        type: unknownInput.type,
      });

      return {
        ok: false,
        code: "UNKNOWN_MAIL_TYPE",
        message: "Unknown mail type.",
      };
    }
  }
}
