const { Router } = require("express");
const { db } = require("../db");

const rotaAlunos = Router();

rotaAlunos.get("/alunos", async function (req, res) {
  const itens = await db.aluno.findMany();
  console.log(itens);
  res.json(itens);
});

rotaAlunos.post("/alunos", async function (req, res) {
  const { nome, email, genero, matricula, senha, turma, escola } = req.body;
  const psicologo = await db.psicologo.findFirst({
    where: {
      email,
    },
  });

  if (psicologo) {
    res.status(400).json({
      mensagem: "Email já cadastrado",
    });
    return;
  }
  const itens = await db.aluno.create({
    data: {
      email,
      nome,
      genero,
      matricula,
      senha,
      turma,
      escola,
    },
  });
  console.log(itens);
  res.json(itens);
});

rotaAlunos.delete("/alunos/:id", async function (req, res) {
  const { id } = req.params;
  const usuario = await db.aluno.delete({
    where: { id: Number(id) },
  });
  console.log("Usuário deletado:", usuario);

  res.json({ mensagem: "aluno deletado" });
});
rotaAlunos.put("/alunos/:id", async function (req, res) {
  const { id } = req.params;
  let { nome, email, genero, matricula, senha, turma, escola, adm } = req.body;

  if (adm == "true") {
    adm = true;
  } else {
    adm = false;
  }

  const usuario = await db.aluno.update({
    where: { id: Number(id) },
    data: {
      email,
      nome,
      genero,
      matricula,
      senha,
      turma,
      escola,
      adm,
    },
  });
  console.log("aluno atualizado");
  res.json({ mensagem: "aluno atualizado" });
});

module.exports = { rotaAlunos };
