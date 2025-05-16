-- CreateTable
CREATE TABLE "UserConfigs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "theme" TEXT NOT NULL DEFAULT 'oceanBreeze',
    "font_size" TEXT NOT NULL DEFAULT 'medium',
    "show_background_pattern" BOOLEAN NOT NULL DEFAULT true,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserConfigs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserConfigs_user_id_key" ON "UserConfigs"("user_id");
