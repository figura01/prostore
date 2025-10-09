/*
  Warnings:

  - Made the column `userId` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productId` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "productId" SET NOT NULL;
