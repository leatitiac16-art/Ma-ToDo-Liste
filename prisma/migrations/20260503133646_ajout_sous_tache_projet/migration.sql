-- CreateTable
CREATE TABLE "SousTacheProjet" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "terminee" BOOLEAN NOT NULL DEFAULT false,
    "tacheProjetId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SousTacheProjet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SousTacheProjet" ADD CONSTRAINT "SousTacheProjet_tacheProjetId_fkey" FOREIGN KEY ("tacheProjetId") REFERENCES "TacheProjet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
