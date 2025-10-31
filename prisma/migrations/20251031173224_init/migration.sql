-- CreateTable
CREATE TABLE "Aluno" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "turma" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "adm" BOOLEAN NOT NULL DEFAULT false,
    "escola" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Psicologo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "crp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Horario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "comeco" DATETIME NOT NULL,
    "fim" DATETIME NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Consulta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "aluno_id" INTEGER,
    "psicologo_id" INTEGER NOT NULL,
    "horario_id" INTEGER NOT NULL,
    "nota" INTEGER,
    "avaliacao" TEXT,
    "status" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Consulta_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "Aluno" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Consulta_psicologo_id_fkey" FOREIGN KEY ("psicologo_id") REFERENCES "Psicologo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Consulta_horario_id_fkey" FOREIGN KEY ("horario_id") REFERENCES "Horario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_matricula_key" ON "Aluno"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "Psicologo_crp_key" ON "Psicologo"("crp");

-- CreateIndex
CREATE UNIQUE INDEX "Psicologo_email_key" ON "Psicologo"("email");
