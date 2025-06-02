import NextAuth from 'next-auth';
import { authOptions } from './authOptions';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/utils/prisma';
import { compare } from 'bcryptjs';

// See .env for required environment variables
// NEXTAUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET

const providers = [];

// Conditionally add Google provider
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  );
}
// Conditionally add GitHub provider
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  providers.push(
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    })
  );
}
// Always add Credentials provider for email/password
providers.push(
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: 'Email', type: 'email', placeholder: 'you@example.com' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      // Find user by email
      const user = await prisma.user.findUnique({ where: { email: credentials?.email } });
      if (!user || !user.password) {
        return null;
      }
      // Compare password
      const isValid = await compare(credentials!.password, user.password);
      if (!isValid) {
        return null;
      }
      // Return user object (id, email, name, etc.)
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 