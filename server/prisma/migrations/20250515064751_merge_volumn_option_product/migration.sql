/*
  Warnings:

  - You are about to drop the column `volumeId` on the `options` table. All the data in the column will be lost.
  - You are about to drop the `option_resources` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `volumns` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `options` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resourceId` to the `options` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `options` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "option_resources" DROP CONSTRAINT "option_resources_id_fkey";

-- DropForeignKey
ALTER TABLE "option_resources" DROP CONSTRAINT "option_resources_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "options" DROP CONSTRAINT "options_volumeId_fkey";

-- AlterTable
ALTER TABLE "options" DROP COLUMN "volumeId",
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "resourceId" INTEGER NOT NULL,
ADD COLUMN     "value" DECIMAL(65,30) NOT NULL;

-- DropTable
DROP TABLE "option_resources";

-- DropTable
DROP TABLE "volumns";

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "resources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
