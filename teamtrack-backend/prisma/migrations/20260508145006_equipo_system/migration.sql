/*
  Warnings:

  - Added the required column `equipoId` to the `Proyecto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `equipoId` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Proyecto` ADD COLUMN `equipoId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Usuario` ADD COLUMN `equipoId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Equipo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_equipoId_fkey` FOREIGN KEY (`equipoId`) REFERENCES `Equipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Proyecto` ADD CONSTRAINT `Proyecto_equipoId_fkey` FOREIGN KEY (`equipoId`) REFERENCES `Equipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
