import { AuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import LinkedInProvider from 'next-auth/providers/linkedin';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/utils/prisma';
import { compare } from 'bcryptjs';

const providers = [];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  );
}
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  providers.push(
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    })
  );
}

if (process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET) {
  providers.push(
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: {
        params: { scope: 'openid profile email' }
      },
    })
  );
}

providers.push(
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: 'Email', type: 'email', placeholder: 'you@example.com' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      const user = await prisma.user.findUnique({ where: { email: credentials?.email } });
      if (!user || !user.password) {
        return null;
      }
      const isValid = await compare(credentials!.password, user.password);
      if (!isValid) {
        return null;
      }
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        role: user.role,
      };
    },
  })
);

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, credentials }) {
      if (account?.provider === 'credentials') {
        const dbUser = await prisma.user.findUnique({ where: { email: user.email ?? undefined } });
        if (!dbUser?.emailVerified) {
          throw new Error('Please verify your email before logging in.');
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (!session.user || !session.user.email) {
        return session;
      }
      const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email ?? undefined },
        select: { id: true, name: true, email: true, image: true, bio: true, username: true, role: true },
      });
      if (dbUser && typeof session.user === 'object') {
        session.user.id = dbUser.id;
        session.user.name = dbUser.name ?? undefined;
        session.user.image = dbUser.image ?? undefined;
        session.user.bio = dbUser.bio ?? undefined;
        session.user.username = dbUser.username ?? undefined;
        session.user.role = dbUser.role ?? undefined;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username ?? undefined;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
}; 