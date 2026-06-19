import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

const TRANSIENT_PRISMA_CONNECTION_CODES = new Set([
  "P1001",
  "P1002",
  "P2024",
  "P1017",
]);

const TRANSIENT_POSTGRES_CONNECTION_CODES = new Set([
  "08000",
  "08001",
  "08003",
  "08004",
  "08006",
  "57P01",
  "57P02",
  "57P03",
]);

function getErrorCode(error: unknown) {
  if (typeof error !== "object" || error === null || !("code" in error)) {
    return null;
  }

  const code = (error as { code?: unknown }).code;

  return typeof code === "string" ? code : null;
}

export function isTransientPrismaConnectionError(error: unknown) {
  const code = getErrorCode(error);
  const message = error instanceof Error ? error.message : String(error);

  return (
    Boolean(
      code &&
        (TRANSIENT_PRISMA_CONNECTION_CODES.has(code) ||
          TRANSIENT_POSTGRES_CONNECTION_CODES.has(code)),
    ) ||
    /E57P01|terminating connection due to administrator command|Timed out fetching a new connection from the connection pool|server has closed the connection|connection.*(?:closed|terminated)/i.test(
      message,
    )
  );
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function withPrismaConnectionRetry<T>(
  operation: () => Promise<T>,
  retries = 1,
) {
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (attempt >= retries || !isTransientPrismaConnectionError(error)) {
        throw error;
      }

      await prisma.$disconnect().catch(() => undefined);
      await wait(250 * (attempt + 1));
    }
  }

  throw lastError;
}
