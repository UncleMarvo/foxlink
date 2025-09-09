-- CreateTable
CREATE TABLE "public"."Waitlist" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Waitlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Waitlist_email_topic_key" ON "public"."Waitlist"("email", "topic");
