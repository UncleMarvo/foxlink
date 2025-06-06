-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "email" TEXT,
ADD COLUMN     "name" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;
