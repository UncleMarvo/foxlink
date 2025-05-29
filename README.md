# foxlink

A modern, production-ready Link in Bio platform built with Next.js 15, TypeScript, Tailwind CSS v4+, NextAuth.js, and Prisma (MS SQL Express).

## Features
- Next.js 15 (app directory, server components)
- TypeScript
- Tailwind CSS v4+ (CSS-first config)
- NextAuth.js (email/password + social login)
- Prisma ORM (MS SQL Express)
- Modular, clean codebase

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up Tailwind CSS (v4+)
- Tailwind is already installed.
- Tailwind CSS is enabled via CSS directives in `src/app/globals.css`:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- No `tailwind.config.js` is required unless you need custom configuration.

### 3. Set up Prisma
- Initialize your database connection string in `.env` (created by `npx prisma init`).
- Edit `prisma/schema.prisma` to define your models.
- Run migrations:
  ```bash
  npx prisma migrate dev
  ```

### 4. Run the development server
```bash
npm run dev
```

## Folder Structure
- `src/app` - Next.js app directory
- `src/components` - React components
- `src/utils` - Utility functions
- `prisma` - Prisma schema and migrations

## Notes
- See the full requirements and features in the project documentation.
- This project uses the latest best practices for all major dependencies.

## Profile Management

- Users can view and edit their profile at `/profile`.
- Editable fields: name, bio, and avatar image.
- Avatar images are uploaded and stored in `/public/avatars` (local development).
- Profile updates are handled via the `/api/profile/update` API route (multipart/form-data).
- Only logged-in users can access and edit their profile.

## Production Deployment

This section explains how to deploy the app to a production environment.

### 1. Required Environment Variables

Set the following environment variables in your production environment (e.g., in a `.env` file or your hosting provider's dashboard):

| Variable                                            | Description                                      |
|-----------------------------------------------------|--------------------------------------------------|
| `DATABASE_URL`                                      | Database connection string (Postgres)            |
| `NEXTAUTH_SECRET`                                   | Secret for NextAuth.js sessions                  |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`         | Google OAuth (optional, for social login)        |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`         | GitHub OAuth (optional, for social login)        |
| `STRIPE_SECRET_KEY`                                 | Stripe API secret key                            |
| `NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID`       | Stripe price ID for monthly premium plan         |
| `NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID`        | Stripe price ID for yearly premium plan          |
| `NEXT_PUBLIC_BASE_URL`                              | Public base URL of your app (e.g. https://...)   |
| `RESEND_API_KEY`                                    | Resend API key for transactional emails          |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`  | SMTP credentials (if using SMTP for email)       |
| `ERROR_WEBHOOK_URL`                                 | Webhook for error reporting (optional)           |
| `NEXT_PUBLIC_SUPABASE_URL`                          | Supabase project URL (for avatar uploads)        |
| `NEXT_PUBLIC_SUPABASE_AVATARS_BUCKET`               | Supabase bucket name for avatars                 |
| `SUPABASE_SERVICE_ROLE_KEY`                         | Supabase service role key                        |
| `EMAIL_VERIFICATION_TOKEN_EXPIRES_MINUTES`          | Minutes before email verification token expires  |
| `RATE_LIMIT_WINDOW_MS`                              | (Optional) Rate limit window in ms               |
| `RATE_LIMIT_MAX_REQUESTS`                           | (Optional) Max requests per window               |
| `GEOIP_API_URL`                                     | (Optional) Geo-IP lookup API base URL            |
| `TERMS_VERSION`                                     | (Optional) Current terms version string          |
|--------------------------------------------------------------------------------------------------------|

> **Note:** Only set the variables you need for your features (e.g., social login, Stripe, Supabase, etc.).

### 2. Run Database Migrations

Before starting the app, run all pending Prisma migrations on your production database:

```bash
npx prisma migrate deploy
```

This will apply all migrations in the `prisma/migrations` folder to your production database.

### 3. Build and Start the App in Production Mode

1. **Build the app:**
   ```bash
   npm run build
   ```
2. **Start the app:**
   ```bash
   npm start
   ```

The app will start in production mode. Make sure all environment variables are set before running these commands.

---

For more details, see the Next.js and Prisma documentation, or your hosting provider's deployment guides. 