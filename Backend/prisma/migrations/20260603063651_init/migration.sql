-- CreateTable
CREATE TABLE `Payment` (
    `id` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `packageName` VARCHAR(191) NOT NULL,
    `checkoutId` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `mpesaCheckoutId` VARCHAR(191) NULL,
    `mpesaResultCode` INTEGER NULL,
    `mpesaResultDesc` VARCHAR(191) NULL,
    `mpesaMetadata` JSON NULL,
    `transactionId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Payment_checkoutId_key`(`checkoutId`),
    UNIQUE INDEX `Payment_mpesaCheckoutId_key`(`mpesaCheckoutId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
