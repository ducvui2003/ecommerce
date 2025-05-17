-- DropForeignKey
ALTER TABLE "options" DROP CONSTRAINT "options_resource_id_fkey";

-- AlterTable
ALTER TABLE "options" ALTER COLUMN "resource_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE SET NULL ON UPDATE CASCADE;
