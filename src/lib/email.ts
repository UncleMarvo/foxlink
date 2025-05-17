// Utility to send password reset emails
// You should replace the placeholder logic with your actual email provider (Resend, nodemailer, etc.)

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_ADDRESS = 'Your App <noreply@yourdomain.com>';

interface SendPasswordResetEmailParams {
  to: string;
  username: string;
  resetUrl: string;
  expires: Date;
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