-- AlterTable
ALTER TABLE "wardrobe_items" ADD COLUMN     "last_worn" TIMESTAMPTZ(3),
ADD COLUMN     "wear_count" INTEGER NOT NULL DEFAULT 0;
