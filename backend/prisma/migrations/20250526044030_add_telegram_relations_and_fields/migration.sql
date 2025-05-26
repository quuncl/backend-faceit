/*
  Warnings:

  - Added the required column `botToken` to the `telegram` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `telegram` ADD COLUMN `botToken` VARCHAR(255) NOT NULL,
    ADD COLUMN `chatId` VARCHAR(255) NULL,
    ADD COLUMN `username` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `telegram` ADD CONSTRAINT `telegram_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
