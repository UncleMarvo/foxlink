-- Step 1: Add typeId as nullable
ALTER TABLE "Link" ADD COLUMN "typeId" UUID;

-- Step 2: Create LinkType table (with fixed comma)
CREATE TABLE "LinkType" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "color" TEXT NOT NULL
);

-- Step 3: Create index
CREATE UNIQUE INDEX "LinkType_name_key" ON "LinkType"("name");

-- Step 4: Insert types
INSERT INTO "LinkType" ("name", "label", "color") VALUES
  ('website', 'Website', 'bg-blue-100 text-blue-800'),
  ('social', 'Social', 'bg-purple-100 text-purple-800'),
  ('video', 'Video', 'bg-pink-100 text-pink-800');

-- Step 5: Set all existing links to 'website' type
UPDATE "Link" SET "typeId" = (SELECT "id" FROM "LinkType" WHERE "name" = 'website');

-- Step 6: Set typeId to NOT NULL
ALTER TABLE "Link" ALTER COLUMN "typeId" SET NOT NULL;

-- Step 7: Add foreign key
ALTER TABLE "Link" ADD CONSTRAINT "Link_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "LinkType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;