const { Router } = require("express");
const { db } = require("../db");

const rotaPsicologos = Router();

rotaPsicologos.get("/psicologos", async function (req, res) {
  const itens = await db.Psicologo.findMany();
  console.log(itens);
  res.json(itens);
});

rotaPsicologos.post("/psicologos", async function (req, res) {
  const { nome, email, genero, crp, senha } = req.body;
  const aluno = await db.aluno.findFirst({
    where: {
      email,
    },
  });

  if (aluno) {
    res.status(400).json({
      mensagem: "Email já cadastrado",
    });
    return;
  }
  const itens = await db.Psicologo.create({
    data: {
      email,
      nome,
      genero,
      crp,
      senha,
    },
  });
  console.log(itens);
  res.json(itens);
});

rotaPsicologos.delete("/psicologos/:id", async function (req, res) {
  const { id } = req.params;
  const usuario = await db.Psicologo.delete({
    where: { id: Number(id) },
  });
  console.log("Usuário deletado:", usuario);

  res.json({ mensagem: "Psicologo deletado" });
});
rotaPsicologos.put("/psicologos/:id", async function (req, res) {
  const { id } = req.params;
  const { nome, email, genero, crp, senha } = req.body;
  const usuario = await db.Psicologo.update({
    where: { id: Number(id) },
    data: {
      email,
      nome,
      genero,
      crp,
      senha,
    },
  });
  console.log("Psicologo atualizado");
  res.json({ mensagem: "Psicologo atualizado" });
});

module.exports = { rotaPsicologos };
