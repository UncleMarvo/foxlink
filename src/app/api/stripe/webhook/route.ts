import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/utils/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-04-30.basil' });
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Disable Next.js body parsing for raw body
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to get raw body for Stripe signature verification
async function getRawBody(req: NextRequest): Promise<Buffer> {
  const reader = req.body?.getReader();
  if (!reader) throw new Error('No body reader');
  let chunks: Uint8Array[] = [];
  let done = false;
  while (!done) {
    const { value, done: doneReading } = await reader.read();
    if (value) chunks.push(value);
    done = doneReading;
  }
  return Buffer.concat(chunks);
}

export async function POST(req: NextRequest) {
  let event: Stripe.Event;
  try {
    const sig = req.headers.get('stripe-signature');
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig!, webhookSecret);
  } catch (err) {
    console.error('Stripe webhook signature error:', err);
    return new NextResponse('Webhook signature verification failed', { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        // Get customer and email
        const customerId = session.customer as string;
        const email = session.customer_email as string;
        if (email && customerId) {
          // Set user as premium and save Stripe customer ID
          await prisma.user.updateMany({
            where: { email },
            data: { premium: true, stripeCustomerId: customerId },
          });
        }
        break;
      }
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        // If subscription is active, set premium; otherwise, not premium
        const isActive = subscription.status === 'active' || subscription.status === 'trialing';
        await prisma.user.updateMany({
          where: { stripeCustomerId: customerId },
          data: { premium: isActive },
        });
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        // Set premium to false
        await prisma.user.updateMany({
          where: { stripeCustomerId: customerId },
          data: { premium: false },
        });
        break;
      }
      // Add more event types as needed
      default:
        // Ignore other events
        break;
    }
    return new NextResponse('Webhook received', { status: 200 });
  } catch (err) {
    console.error('Stripe webhook handler error:', err);
    return new NextResponse('Webhook handler error', { status: 500 });
  }
} 