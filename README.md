# linkinbio2

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
