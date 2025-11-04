/*
  Warnings:

  - Added the required column `periodo` to the `Aluno` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Aluno" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "turma" TEXT NOT NULL,
    "periodo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "adm" BOOLEAN NOT NULL DEFAULT false,
    "escola" TEXT NOT NULL
);
INSERT INTO "new_Aluno" ("adm", "email", "escola", "genero", "id", "matricula", "nome", "senha", "turma") SELECT "adm", "email", "escola", "genero", "id", "matricula", "nome", "senha", "turma" FROM "Aluno";
DROP TABLE "Aluno";
ALTER TABLE "new_Aluno" RENAME TO "Aluno";
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");
CREATE UNIQUE INDEX "Aluno_matricula_key" ON "Aluno"("matricula");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
