/*
  Warnings:

  - A unique constraint covering the columns `[date,tenant_id]` on the table `holidays` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,outlet_id]` on the table `user_outlets` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "holidays_date_idx";

-- DropIndex
DROP INDEX "user_outlets_user_id_outlet_id_idx";

-- AlterTable
ALTER TABLE "shifts" ALTER COLUMN "start_time" SET DATA TYPE TEXT,
ALTER COLUMN "end_time" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "holidays_date_tenant_id_key" ON "holidays"("date", "tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_outlets_user_id_outlet_id_key" ON "user_outlets"("user_id", "outlet_id");
