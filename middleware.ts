import NextAuth from "next-auth";
import { NextResponse } from "next/server";

function getTokenString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function getOptionalTokenString(value: unknown) {
  return typeof value === "string" ? value : null;
}

function getTokenRole(value: unknown) {
  return value === "ADMIN" ? "ADMIN" : "USER";
}

const { auth: middlewareAuth } = NextAuth({
  providers: [],
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  callbacks: {
    session({ session, token }) {
      if (session.user) {
        session.user.id = getTokenString(token.id);
        session.user.role = getTokenRole(token.role);
        session.user.headline = getOptionalTokenString(token.headline);
        session.user.linkedinId = getOptionalTokenString(token.linkedinId);
      }

      return session;
    },
  },
});

export default middlewareAuth((req) => {
  if (req.auth?.user?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
