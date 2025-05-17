import NextAuth, { AuthOptions } from 'next-auth';
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

// Export authOptions for use in server components
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers,
  session: {
    strategy: 'jwt', // Use JWT for stateless sessions
  },
  callbacks: {
    async signIn({ user, account, credentials }) {
      // Only enforce for credentials provider
      if (account?.provider === 'credentials') {
        const dbUser = await prisma.user.findUnique({ where: { email: user.email ?? undefined } });
        if (!dbUser?.emailVerified) {
          // Block login if not verified
          throw new Error('Please verify your email before logging in.');
        }
      }
      // Allow OAuth users (Google, GitHub, etc.)
      return true;
    },
    async session({ session, token }) {
      // Type guard for session.user
      if (!session.user || !session.user.email) {
        return session;
      }
      // Fetch the latest user data from the database
      const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email ?? undefined },
        select: { id: true, name: true, email: true, image: true, bio: true, username: true },
      });
      if (dbUser && typeof session.user === 'object') {
        session.user.id = dbUser.id;
        session.user.name = dbUser.name ?? undefined;
        session.user.image = dbUser.image ?? undefined;
        session.user.bio = dbUser.bio ?? undefined;
        session.user.username = dbUser.username ?? undefined;
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
    signIn: '/api/auth/signin', // Custom sign-in page
  },
  // Callbacks, events, and custom pages can be added here
  // See NextAuth.js docs for advanced configuration
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 