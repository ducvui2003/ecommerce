/*
  Warnings:

  - You are about to drop the column `account_number` on the `payment_transaction` table. All the data in the column will be lost.
  - You are about to drop the column `accumulated` on the `payment_transaction` table. All the data in the column will be lost.
  - You are about to drop the column `amount_in` on the `payment_transaction` table. All the data in the column will be lost.
  - You are about to drop the column `amount_out` on the `payment_transaction` table. All the data in the column will be lost.
  - You are about to drop the column `body` on the `payment_transaction` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `payment_transaction` table. All the data in the column will be lost.
  - You are about to drop the column `gateway` on the `payment_transaction` table. All the data in the column will be lost.
  - You are about to drop the column `reference_number` on the `payment_transaction` table. All the data in the column will be lost.
  - You are about to drop the column `sub_account` on the `payment_transaction` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_content` on the `payment_transaction` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_date` on the `payment_transaction` table. All the data in the column will be lost.
  - Added the required column `provider` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `payment_transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payload` to the `payment_transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider` to the `payment_transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider_payment_id` to the `payment_transaction` table without a default value. This is not possible if the table is not empty.

*/


-- CreateEnum
CREATE TYPE "PaymentProvider" AS ENUM ('VNPAY', 'SEPAY');

DROP TABLE IF EXISTS "payment_transaction";

-- Create Table payment_transaction
CREATE TABLE public.payment_transaction (
  id SERIAL PRIMARY KEY,
  payment_id INTEGER,
  amount DECIMAL(20,2) DEFAULT 0 ,
  payload JSONB NOT NULL ,
  provider_payment_id TEXT NOT NULL,
  provider public."PaymentProvider" NOT NULL,
  created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);