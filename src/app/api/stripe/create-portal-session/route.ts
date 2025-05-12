import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import Stripe from 'stripe';
import prisma from '@/utils/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-04-30.basil' });

// POST /api/stripe/create-portal-session
export async function POST(req: NextRequest) {
  // Authenticate user
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // Find the user in the DB to get their Stripe customer ID
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user || !user.stripeCustomerId) {
    return NextResponse.json({ error: 'No Stripe customer found.' }, { status: 400 });
  }
  try {
    // Create Stripe Customer Portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
    });
    return NextResponse.json({ url: portalSession.url });
  } catch (err) {
    console.error('Stripe portal error:', err);
    return NextResponse.json({ error: 'Failed to create portal session' }, { status: 500 });
  }
} 