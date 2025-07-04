/*
  Warnings:

  - Added the required column `tel` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "tel" VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE "Lesson" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
