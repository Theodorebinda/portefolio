import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminRecipients, sendMail } from "@/lib/mail";

export const runtime = "nodejs";

type ApiCode =
  | "SUCCESS"
  | "INVALID_JSON"
  | "VALIDATION_ERROR"
  | "MAIL_CONFIG_ERROR"
  | "MAIL_SEND_ERROR"
  | "SERVER_ERROR";

const contactSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(150),
    message: z.string().trim().min(10).max(3000),
    website: z.string().optional().default(""),
  })
  .strict();

function jsonResponse(
  body: {
    ok: boolean;
    code: ApiCode;
    message: string;
    errors?: Record<string, string[]>;
  },
  status: number
) {
  return NextResponse.json(body, { status });
}

function validationErrors(error: z.ZodError) {
  return error.issues.reduce<Record<string, string[]>>((errors, issue) => {
    const key = issue.path.join(".") || "body";
    errors[key] = [...(errors[key] ?? []), issue.message];
    return errors;
  }, {});
}

function successResponse() {
  return jsonResponse(
    {
      ok: true,
      code: "SUCCESS",
      message: "Message envoyé avec succès.",
    },
    200
  );
}

function mailFailureResponse(code: "MAIL_CONFIG_ERROR" | "MAIL_SEND_ERROR") {
  return jsonResponse(
    {
      ok: false,
      code,
      message: "Le message n'a pas pu être envoyé. Réessayez plus tard.",
    },
    500
  );
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonResponse(
      {
        ok: false,
        code: "INVALID_JSON",
        message: "Le corps de la requête est invalide.",
      },
      400
    );
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return jsonResponse(
      {
        ok: false,
        code: "VALIDATION_ERROR",
        message: "Les données envoyées sont invalides.",
        errors: validationErrors(parsed.error),
      },
      400
    );
  }

  const { name, email, message, website } = parsed.data;

  if (website.trim()) {
    console.info("[contact] Honeypot filled, returning silent success.");
    return successResponse();
  }

  const adminRecipients = getAdminRecipients();

  if (adminRecipients.length === 0) {
    console.error("[contact] Missing or invalid MAIL_ADMIN_RECIPIENTS.");
    return mailFailureResponse("MAIL_CONFIG_ERROR");
  }

  try {
    const adminMailResult = await sendMail({
      type: "contact.admin",
      to: adminRecipients,
      payload: { name, email, message },
    });

    if (!adminMailResult.ok) {
      console.error("[contact] Admin contact mail failed", {
        code: adminMailResult.code,
      });

      return mailFailureResponse(
        adminMailResult.code === "MAIL_CONFIG_ERROR"
          ? "MAIL_CONFIG_ERROR"
          : "MAIL_SEND_ERROR"
      );
    }

    const userMailResult = await sendMail({
      type: "contact.user",
      to: email,
      payload: { name, email, message },
    });

    if (!userMailResult.ok) {
      console.warn("[contact] Contact acknowledgement mail failed", {
        code: userMailResult.code,
      });
    }

    return successResponse();
  } catch (error) {
    console.error("[contact] Unexpected contact route failure", {
      error: error instanceof Error ? error.message : String(error),
    });

    return jsonResponse(
      {
        ok: false,
        code: "SERVER_ERROR",
        message: "Une erreur inattendue est survenue.",
      },
      500
    );
  }
}
