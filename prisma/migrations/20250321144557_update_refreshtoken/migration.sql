/*
  Warnings:

  - You are about to drop the column `token_key` on the `refresh_tokens` table. All the data in the column will be lost.
  - You are about to alter the column `created_at` on the `refresh_tokens` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `refresh_tokens` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `created_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - A unique constraint covering the columns `[userId,token_identifier]` on the table `refresh_tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token_identifier` to the `refresh_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `refresh_tokens` DROP FOREIGN KEY `refresh_tokens_userId_fkey`;

-- DropIndex
DROP INDEX `refresh_tokens_userId_token_key_key` ON `refresh_tokens`;

-- AlterTable
ALTER TABLE `refresh_tokens` DROP COLUMN `token_key`,
    ADD COLUMN `token_identifier` VARCHAR(255) NOT NULL,
    MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` TIMESTAMP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `refresh_tokens_userId_token_identifier_key` ON `refresh_tokens`(`userId`, `token_identifier`);

-- AddForeignKey
ALTER TABLE `refresh_tokens` ADD CONSTRAINT `refresh_tokens_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
