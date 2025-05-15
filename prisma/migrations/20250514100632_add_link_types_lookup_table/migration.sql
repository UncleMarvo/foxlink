/*
  Warnings:

  - You are about to drop the column `type` on the `Link` table. All the data in the column will be lost.
  - The primary key for the `LinkType` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_typeId_fkey";

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "type",
ALTER COLUMN "typeId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "LinkType" DROP CONSTRAINT "LinkType_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "LinkType_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "LinkType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
