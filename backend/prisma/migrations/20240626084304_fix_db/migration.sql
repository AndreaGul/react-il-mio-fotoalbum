/*
  Warnings:

  - You are about to drop the column `fotoId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `_categorytofoto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `foto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_categorytofoto` DROP FOREIGN KEY `_CategoryToFoto_A_fkey`;

-- DropForeignKey
ALTER TABLE `_categorytofoto` DROP FOREIGN KEY `_CategoryToFoto_B_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_fotoId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `fotoId`;

-- DropTable
DROP TABLE `_categorytofoto`;

-- DropTable
DROP TABLE `foto`;

-- CreateTable
CREATE TABLE `photo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `img` VARCHAR(191) NULL,
    `visible` BOOLEAN NOT NULL,
    `userId` INTEGER NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `photo_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CategoryTophoto` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CategoryTophoto_AB_unique`(`A`, `B`),
    INDEX `_CategoryTophoto_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `photo` ADD CONSTRAINT `photo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryTophoto` ADD CONSTRAINT `_CategoryTophoto_A_fkey` FOREIGN KEY (`A`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryTophoto` ADD CONSTRAINT `_CategoryTophoto_B_fkey` FOREIGN KEY (`B`) REFERENCES `photo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
