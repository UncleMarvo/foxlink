import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      bio?: string | null;
      username?: string | null;
      role?: string;
    } & DefaultSession['user'];
  }
  interface User extends DefaultUser {
    bio?: string | null;
    username?: string | null;
    role?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    bio?: string | null;
    username?: string | null;
  }
} 