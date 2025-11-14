/*
  Warnings:

  - You are about to drop the column `escola` on the `Aluno` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[horario_id]` on the table `Consulta` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Aluno" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "turma" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "adm" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Aluno" ("adm", "email", "genero", "id", "matricula", "nome", "senha", "turma") SELECT "adm", "email", "genero", "id", "matricula", "nome", "senha", "turma" FROM "Aluno";
DROP TABLE "Aluno";
ALTER TABLE "new_Aluno" RENAME TO "Aluno";
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");
CREATE UNIQUE INDEX "Aluno_matricula_key" ON "Aluno"("matricula");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Consulta_horario_id_key" ON "Consulta"("horario_id");
