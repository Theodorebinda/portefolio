import { RecommendationStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "../../../../../../auth";
import { prisma } from "@/lib/prisma";

function getModerationStatus(value: unknown) {
  if (value === RecommendationStatus.PENDING) return RecommendationStatus.PENDING;
  if (value === RecommendationStatus.APPROVED) return RecommendationStatus.APPROVED;
  if (value === RecommendationStatus.REJECTED) return RecommendationStatus.REJECTED;

  return null;
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json(
      { message: "Acces administrateur requis." },
      { status: 403 }
    );
  }

  const body = (await request.json()) as { status?: unknown };
  const status = getModerationStatus(body.status);

  if (!status) {
    return NextResponse.json(
      { message: "Statut de moderation invalide." },
      { status: 400 }
    );
  }

  const recommendation = await prisma.recommendation.update({
    where: { id: params.id },
    data: {
      status,
      approvedAt: status === "APPROVED" ? new Date() : null,
    },
  });

  return NextResponse.json({
    id: recommendation.id,
    status: recommendation.status,
    approvedAt: recommendation.approvedAt?.toISOString() ?? null,
  });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json(
      { message: "Acces administrateur requis." },
      { status: 403 }
    );
  }

  await prisma.recommendation.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ id: params.id });
}
