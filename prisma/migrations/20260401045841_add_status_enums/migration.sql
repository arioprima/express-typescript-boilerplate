/*
  Warnings:

  - The `status` column on the `attendances` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `schedules` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `swap_requests` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'REVISED');

-- CreateEnum
CREATE TYPE "ScheduleStatus" AS ENUM ('SCHEDULED', 'CONFIRMED', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "SwapRequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED');

-- AlterTable
ALTER TABLE "attendances" DROP COLUMN "status",
ADD COLUMN     "status" "AttendanceStatus" DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "status",
ADD COLUMN     "status" "ScheduleStatus" NOT NULL DEFAULT 'SCHEDULED';

-- AlterTable
ALTER TABLE "swap_requests" DROP COLUMN "status",
ADD COLUMN     "status" "SwapRequestStatus" NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE INDEX "attendances_status_idx" ON "attendances"("status");

-- CreateIndex
CREATE INDEX "swap_requests_status_idx" ON "swap_requests"("status");
