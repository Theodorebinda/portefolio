import NextAuth, { type NextAuthConfig } from "next-auth";
import LinkedIn from "next-auth/providers/linkedin";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter, AdapterAccount } from "next-auth/adapters";
import { prisma } from "@/lib/prisma";

const adminEmails = new Set(
  (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
);

function isAdminEmail(email?: string | null) {
  return Boolean(email && adminEmails.has(email.toLowerCase()));
}

function getTokenString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function getOptionalTokenString(value: unknown) {
  return typeof value === "string" ? value : null;
}

function getTokenRole(value: unknown) {
  return value === "ADMIN" ? "ADMIN" : "USER";
}

async function fetchLinkedInHeadline(accessToken?: string) {
  if (!accessToken) return null;

  try {
    const response = await fetch("https://api.linkedin.com/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-RestLi-Protocol-Version": "2.0.0",
      },
      cache: "no-store",
    });

    if (!response.ok) return null;

    const profile = (await response.json()) as {
      localizedHeadline?: unknown;
    };

    return typeof profile.localizedHeadline === "string"
      ? profile.localizedHeadline
      : null;
  } catch {
    return null;
  }
}

function withoutStoredTokens(adapter: Adapter): Adapter {
  return {
    ...adapter,
    async linkAccount(account: AdapterAccount) {
      await prisma.account.create({
        data: {
          userId: account.userId,
          type: account.type,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        },
      });
    },
  };
}

export const authConfig = {
  adapter: withoutStoredTokens(PrismaAdapter(prisma)),
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  providers: [
    LinkedIn({
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.role = isAdminEmail(user.email) ? "ADMIN" : user.role ?? "USER";
        token.headline = user.headline ?? null;
        token.linkedinId = user.linkedinId ?? null;
      }

      if (account?.provider === "linkedin" && user?.id) {
        const linkedinId =
          typeof profile?.sub === "string"
            ? profile.sub
            : account.providerAccountId;
        const headline = await fetchLinkedInHeadline(account.access_token);
        const role = isAdminEmail(user.email) ? "ADMIN" : "USER";

        await prisma.user.update({
          where: { id: user.id },
          data: {
            linkedinId,
            headline: headline ?? undefined,
            role,
          },
        });

        token.linkedinId = linkedinId;
        token.headline = headline ?? token.headline ?? null;
        token.role = role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = getTokenString(token.id);
        session.user.role = getTokenRole(token.role);
        session.user.headline = getOptionalTokenString(token.headline);
        session.user.linkedinId = getOptionalTokenString(token.linkedinId);
      }

      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
