-- AlterTable
ALTER TABLE "SocialMedia" ADD COLUMN     "bluesky_url" TEXT DEFAULT '',
ADD COLUMN     "bluesky_visible" BOOLEAN NOT NULL DEFAULT true;
