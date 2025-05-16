-- CreateTable
CREATE TABLE "SocialMedia" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "twitter_url" TEXT DEFAULT '',
    "twitter_visible" BOOLEAN NOT NULL DEFAULT true,
    "facebook_url" TEXT DEFAULT '',
    "facebook_visible" BOOLEAN NOT NULL DEFAULT true,
    "instagram_url" TEXT DEFAULT '',
    "instagram_visible" BOOLEAN NOT NULL DEFAULT true,
    "linkedin_url" TEXT DEFAULT '',
    "linkedin_visible" BOOLEAN NOT NULL DEFAULT true,
    "youtube_url" TEXT DEFAULT '',
    "youtube_visible" BOOLEAN NOT NULL DEFAULT true,
    "tiktok_url" TEXT DEFAULT '',
    "tiktok_visible" BOOLEAN NOT NULL DEFAULT true,
    "github_url" TEXT DEFAULT '',
    "github_visible" BOOLEAN NOT NULL DEFAULT true,
    "twitch_url" TEXT DEFAULT '',
    "twitch_visible" BOOLEAN NOT NULL DEFAULT true,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SocialMedia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SocialMedia_user_id_key" ON "SocialMedia"("user_id");

-- AddForeignKey
ALTER TABLE "SocialMedia" ADD CONSTRAINT "SocialMedia_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
