/*
  Warnings:

  - You are about to drop the column `createAt` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `photo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `photo` DROP FOREIGN KEY `photo_userId_fkey`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `createAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `photo` DROP COLUMN `createAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `Photo` ADD CONSTRAINT `Photo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `_categorytophoto` RENAME INDEX `_CategoryTophoto_AB_unique` TO `_CategoryToPhoto_AB_unique`;

-- RenameIndex
ALTER TABLE `_categorytophoto` RENAME INDEX `_CategoryTophoto_B_index` TO `_CategoryToPhoto_B_index`;

-- RenameIndex
ALTER TABLE `photo` RENAME INDEX `photo_slug_key` TO `Photo_slug_key`;
