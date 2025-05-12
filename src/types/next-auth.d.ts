import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      bio?: string | null;
    } & DefaultSession['user'];
  }
  interface User extends DefaultUser {
    bio?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    bio?: string | null;
  }
} 