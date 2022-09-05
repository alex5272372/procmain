-- CreateEnum
CREATE TYPE "dr_cr" AS ENUM ('DEBIT', 'CREDIT');

-- CreateEnum
CREATE TYPE "task" AS ENUM ('DELETE_OBJECTS');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "dr_cr" "dr_cr",
    "status" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "changes" (
    "dest" VARCHAR(40) NOT NULL,
    "tbl" VARCHAR(40) NOT NULL,
    "id" INTEGER NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "changes_pkey" PRIMARY KEY ("dest","tbl","id")
);

-- CreateTable
CREATE TABLE "general_ledger" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dr_cr" "dr_cr" NOT NULL,
    "account_id" INTEGER NOT NULL,
    "particulars" VARCHAR(80),
    "amount" INTEGER NOT NULL,

    CONSTRAINT "general_ledger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_params" (
    "id" SERIAL NOT NULL,
    "tbl" VARCHAR(40) NOT NULL,
    "col" VARCHAR(40) NOT NULL,
    "condition" VARCHAR(80),
    "options" JSONB,

    CONSTRAINT "report_params_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales_invoices" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sales_invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales_invoices_products" (
    "id" SERIAL NOT NULL,
    "sale_invoice_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "sales_invoices_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scheduler" (
    "id" SERIAL NOT NULL,
    "plan_time" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "repeat" INTEGER NOT NULL DEFAULT 0,
    "task" "task" NOT NULL,
    "options" JSONB DEFAULT '{}',
    "status" INTEGER NOT NULL DEFAULT 0,
    "start_time" TIMESTAMPTZ(6),
    "end_time" TIMESTAMPTZ(6),
    "result" VARCHAR(200),

    CONSTRAINT "scheduler_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suppliers_invoices" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "suppliers_invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suppliers_invoices_products" (
    "id" SERIAL NOT NULL,
    "supplier_invoice_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "suppliers_invoices_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "warehouse" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "warehouse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_name_key" ON "accounts"("name");

-- CreateIndex
CREATE UNIQUE INDEX "products_name_key" ON "products"("name");

-- AddForeignKey
ALTER TABLE "general_ledger" ADD CONSTRAINT "general_ledger_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sales_invoices_products" ADD CONSTRAINT "sales_invoices_products_sale_invoice_id_fkey" FOREIGN KEY ("sale_invoice_id") REFERENCES "sales_invoices"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sales_invoices_products" ADD CONSTRAINT "sales_invoices_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suppliers_invoices_products" ADD CONSTRAINT "suppliers_invoices_products_supplier_invoice_id_fkey" FOREIGN KEY ("supplier_invoice_id") REFERENCES "suppliers_invoices"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suppliers_invoices_products" ADD CONSTRAINT "suppliers_invoices_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "warehouse" ADD CONSTRAINT "warehouse_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
