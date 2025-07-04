/*
  Warnings:

  - You are about to drop the column `address` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `plz` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "address",
ADD COLUMN     "plz" VARCHAR(255) NOT NULL,
ADD COLUMN     "street" VARCHAR(255) NOT NULL;
