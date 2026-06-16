-- CreateTable
CREATE TABLE "Tache" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "terminee" BOOLEAN NOT NULL DEFAULT false,
    "priorite" TEXT NOT NULL DEFAULT 'normale',
    "energie" TEXT,
    "humeur" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SousTache" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "terminee" BOOLEAN NOT NULL DEFAULT false,
    "tacheId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SousTache_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SousTache" ADD CONSTRAINT "SousTache_tacheId_fkey" FOREIGN KEY ("tacheId") REFERENCES "Tache"("id") ON DELETE CASCADE ON UPDATE CASCADE;
