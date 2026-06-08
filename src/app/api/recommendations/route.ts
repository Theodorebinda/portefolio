import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "@/lib/prisma";

const PAGE_SIZE = 6;
const MIN_MESSAGE_LENGTH = 50;
const MAX_MESSAGE_LENGTH = 500;
const MAX_HEADLINE_LENGTH = 180;

function normalizePage(value: string | null) {
  const page = Number(value ?? "1");
  return Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
}

function normalizeHeadline(value: unknown) {
  if (typeof value !== "string") return null;

  const headline = value.trim();
  if (!headline) return null;

  return headline.slice(0, MAX_HEADLINE_LENGTH);
}

function normalizeRating(value: unknown) {
  if (value === null || value === undefined || value === "") return null;

  const rating = Number(value);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return Number.NaN;
  }

  return rating;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = normalizePage(searchParams.get("page"));
  const skip = (page - 1) * PAGE_SIZE;

  const [items, total] = await Promise.all([
    prisma.recommendation.findMany({
      where: {
        status: "APPROVED",
        publicConsent: true,
        storageConsent: true,
      },
      orderBy: { approvedAt: "desc" },
      skip,
      take: PAGE_SIZE,
      include: {
        user: {
          select: {
            name: true,
            image: true,
            headline: true,
          },
        },
      },
    }),
    prisma.recommendation.count({
      where: {
        status: "APPROVED",
        publicConsent: true,
        storageConsent: true,
      },
    }),
  ]);

  return NextResponse.json({
    items: items.map((item) => ({
      id: item.id,
      name: item.user.name,
      image: item.user.image,
      headline: item.headline ?? item.user.headline,
      message: item.message,
      rating: item.rating,
      createdAt: item.createdAt.toISOString(),
      approvedAt: item.approvedAt?.toISOString() ?? null,
    })),
    page,
    pageSize: PAGE_SIZE,
    total,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  });
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Authentification requise." },
      { status: 401 }
    );
  }

  const body = (await request.json()) as {
    message?: unknown;
    rating?: unknown;
    headline?: unknown;
    publicConsent?: unknown;
    storageConsent?: unknown;
  };

  const message = typeof body.message === "string" ? body.message.trim() : "";
  const rating = normalizeRating(body.rating);
  const headline = normalizeHeadline(body.headline);

  if (
    message.length < MIN_MESSAGE_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return NextResponse.json(
      { message: "La recommandation doit contenir entre 50 et 500 caracteres." },
      { status: 400 }
    );
  }

  if (Number.isNaN(rating)) {
    return NextResponse.json(
      { message: "La note doit etre comprise entre 1 et 5." },
      { status: 400 }
    );
  }

  if (body.publicConsent !== true || body.storageConsent !== true) {
    return NextResponse.json(
      { message: "Le consentement est obligatoire." },
      { status: 400 }
    );
  }

  if (headline) {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { headline },
    });
  }

  await prisma.recommendation.create({
    data: {
      userId: session.user.id,
      message,
      rating,
      headline: headline ?? session.user.headline ?? null,
      publicConsent: true,
      storageConsent: true,
      status: "PENDING",
    },
  });

  return NextResponse.json(
    { message: "Merci ! Votre recommandation sera visible apres moderation." },
    { status: 201 }
  );
}
