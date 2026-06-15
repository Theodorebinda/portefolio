import { DefaultSession, DefaultUser } from "next-auth";

type UserRole = "USER" | "ADMIN";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      headline?: string | null;
      linkedinId?: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role?: UserRole;
    headline?: string | null;
    linkedinId?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: UserRole;
    headline?: string | null;
    linkedinId?: string | null;
  }
}
