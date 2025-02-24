/*
  Warnings:

  - The primary key for the `Call` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Call` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Call" DROP CONSTRAINT "Call_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Call_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Call_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Call_id_key" ON "Call"("id");
