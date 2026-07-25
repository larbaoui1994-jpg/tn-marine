-- AlterTable: replace single imageUrl with an ordered images array.
ALTER TABLE "Product" ADD COLUMN "images" TEXT[] NOT NULL DEFAULT '{}';
UPDATE "Product" SET "images" = ARRAY["imageUrl"] WHERE "imageUrl" IS NOT NULL;
ALTER TABLE "Product" DROP COLUMN "imageUrl";
