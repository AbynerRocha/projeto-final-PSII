/*
  Warnings:

  - You are about to drop the `sells` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `sells` DROP FOREIGN KEY `sells_gamesId_fkey`;

-- DropForeignKey
ALTER TABLE `sells` DROP FOREIGN KEY `sells_userId_fkey`;

-- DropTable
DROP TABLE `sells`;
