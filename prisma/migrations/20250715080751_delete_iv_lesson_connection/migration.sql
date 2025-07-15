/*
  Warnings:

  - You are about to drop the column `invoiceId` on the `Lesson` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_invoiceId_fkey";

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "invoiceId";
