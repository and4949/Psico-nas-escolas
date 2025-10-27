const { Router } = require("express");
const { db } = require("../db");

const rotaAlunos = Router();

rotaAlunos.get("/alunos", async function (req, res) {
  const itens = await db.Aluno.findMany();
  console.log(itens);
  res.json(itens);
});

rotaAlunos.post("/alunos", async function (req, res) {
  const { nome, email, genero, matricula, senha, turma } = req.body;
  const itens = await db.Aluno.create({
    data: {
      email,
      nome,
      genero,
      matricula,
      senha,
      turma,
    },
  });
  console.log(itens);
  res.json(itens);
});

rotaAlunos.delete("/alunos/:id", async function (req, res) {
  const { id } = req.params;
  const usuario = await db.Aluno.delete({
    where: { id: Number(id) },
  });
  console.log("Usuário deletado:", usuario);

  res.json({ mensagem: "aluno deletado" });
});
rotaAlunos.put("/alunos/:id", async function (req, res) {
  const { id } = req.params;
  const { nome, email, genero, matricula, senha, turma } = req.body;
  const usuario = await db.Aluno.update({
    where: { id: Number(id) },
    data: {
      email,
      nome,
      genero,
      matricula,
      senha,
      turma,
    },
  });
  console.log("aluno atualizado");
  res.json({ mensagem: "aluno atualizado" });
});

module.exports = { rotaAlunos };
