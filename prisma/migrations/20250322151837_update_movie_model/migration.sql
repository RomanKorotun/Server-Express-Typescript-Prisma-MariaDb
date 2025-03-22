/*
  Warnings:

  - You are about to drop the column `avatar` on the `movies` table. All the data in the column will be lost.
  - Added the required column `poster` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `movies` DROP COLUMN `avatar`,
    ADD COLUMN `poster` VARCHAR(512) NOT NULL;
