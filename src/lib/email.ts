// Utility to send password reset emails
// You should replace the placeholder logic with your actual email provider (Resend, nodemailer, etc.)

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_ADDRESS = 'FoxLink <noreply@foxlink.bio>';

interface SendPasswordResetEmailParams {
  to: string;
  username: string;
  resetUrl: string;
  expires: Date;
}

interface SendContactEmailParams {
  name: string;
  email: string;
  type: string;
  message: string;
}

interface SendWaitlistEmailParams {
  email: string;
  topic: string;
}

// Send verification email
export async function sendVerificationEmail({ to, verificationUrl }: { to: string, verificationUrl: string }) {
  await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: 'Verify your email',
    html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email address.</p>`,
  });

  /*
  // SMTP code (commented out for future use)
  // import nodemailer from 'nodemailer';
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  await transporter.sendMail({
    to,
    subject: 'Verify your email',
    html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email address.</p>`,
  });
  */
}

// Send password reset email
export async function sendPasswordResetEmail({ to, username, resetUrl, expires }: SendPasswordResetEmailParams) {
  // Format expiry as a readable string
  const expiryString = expires.toLocaleString();

  await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: 'Password Reset Request',
    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires at ${expiryString}.</p>`,
  });

  /*
  // SMTP code (commented out for future use)
  // import nodemailer from 'nodemailer';
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  await transporter.sendMail({
    to,
    subject: 'Password Reset Request',
    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires at ${expiryString}.</p>`,
  });
  */
}

// Send contact form email
export async function sendContactEmail({ name, email, type, message }: SendContactEmailParams) {
  const supportEmail = process.env.SUPPORT_EMAIL || 'support@foxlink.com';
  
  await resend.emails.send({
    from: FROM_ADDRESS,
    to: supportEmail,
    subject: `New ${type} from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
          New ${type} Received
        </h2>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Type:</strong> ${type}</p>
        </div>
        <div style="background: #fff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
          <h3 style="color: #333; margin-top: 0;">Message:</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e9ecef; color: #6c757d; font-size: 14px;">
          <p>This message was sent from the FoxLink contact form.</p>
          <p>Reply directly to this email to respond to ${name}.</p>
        </div>
      </div>
    `,
    replyTo: email, // This allows you to reply directly to the sender
  });
}

// Send waitlist confirmation email
export async function sendWaitlistEmail({ email, topic }: SendWaitlistEmailParams) {
  const topicNames: Record<string, string> = {
    'community': 'Community Hub',
    'help_center': 'Help Center',
    'integrations': 'Integrations & Automation',
    'api': 'API Access'
  };

  const topicName = topicNames[topic] || topic;
  
  await resend.emails.send({
    from: FROM_ADDRESS,
    to: email,
    subject: `You're on the waitlist for ${topicName}!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #1e40af; margin-bottom: 10px;">Welcome to the FoxLink Waitlist!</h1>
          <p style="color: #6b7280; font-size: 18px;">You're now on the waitlist for <strong>${topicName}</strong></p>
        </div>
        
        <div style="background: #f8fafc; padding: 25px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #f97316;">
          <h2 style="color: #1e40af; margin-top: 0;">What happens next?</h2>
          <ul style="color: #374151; line-height: 1.6;">
            <li>We'll notify you as soon as this feature becomes available</li>
            <li>You'll get early access before the general public</li>
            <li>We may reach out for feedback during development</li>
          </ul>
        </div>

        <div style="background: #fff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">In the meantime...</h3>
          <p style="color: #374151; line-height: 1.6;">
            Explore FoxLink's current features and start building your link page! 
            <a href="https://foxlink.bio" style="color: #f97316; text-decoration: none;">Visit FoxLink →</a>
          </p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            Thanks for your interest in FoxLink!<br>
            The FoxLink Team
          </p>
        </div>
      </div>
    `,
  });
} 