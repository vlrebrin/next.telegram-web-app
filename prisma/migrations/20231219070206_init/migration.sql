-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "tg_id" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "jsondata" TEXT NOT NULL DEFAULT 'NO JSON DATA',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Check" (
    "id" SERIAL NOT NULL,
    "summa" DOUBLE PRECISION NOT NULL DEFAULT 12000.2,
    "value" INTEGER NOT NULL DEFAULT 22214,
    "intake" INTEGER NOT NULL DEFAULT 0,
    "closed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Check_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metering" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "num" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "intake" INTEGER NOT NULL DEFAULT 0,
    "payment" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "contribution" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "isNoValue" BOOLEAN NOT NULL DEFAULT true,
    "isCommon" BOOLEAN NOT NULL DEFAULT false,
    "checkId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Metering_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- AddForeignKey
ALTER TABLE "Metering" ADD CONSTRAINT "Metering_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metering" ADD CONSTRAINT "Metering_checkId_fkey" FOREIGN KEY ("checkId") REFERENCES "Check"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
