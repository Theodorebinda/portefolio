export type ContactAdminPayload = {
  name: string;
  email: string;
  message: string;
};

export type ContactUserPayload = {
  name: string;
  email: string;
  message: string;
};

export type MailPayloadMap = {
  "contact.admin": ContactAdminPayload;
  "contact.user": ContactUserPayload;
};

export type MailType = keyof MailPayloadMap;

export type SendMailInput<TType extends MailType = MailType> =
  TType extends MailType
    ? {
        type: TType;
        to: string | string[];
        payload: MailPayloadMap[TType];
      }
    : never;

export type MailResult =
  | { ok: true; providerId?: string }
  | { ok: false; code: string; message: string };

export type BuiltMail = {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string | string[];
};
