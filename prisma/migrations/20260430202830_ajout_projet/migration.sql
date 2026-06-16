-- CreateTable
CREATE TABLE "Projet" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "couleur" TEXT NOT NULL DEFAULT '#6dabd4',
    "dateDebut" TEXT,
    "dateFin" TEXT,
    "progression" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Projet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TacheProjet" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "date" TEXT,
    "energie" TEXT,
    "priorite" TEXT,
    "terminee" BOOLEAN NOT NULL DEFAULT false,
    "projetId" INTEGER NOT NULL,

    CONSTRAINT "TacheProjet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TacheProjet" ADD CONSTRAINT "TacheProjet_projetId_fkey" FOREIGN KEY ("projetId") REFERENCES "Projet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
