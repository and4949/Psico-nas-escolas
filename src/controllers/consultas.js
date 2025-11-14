const { Router } = require("express");
const { db } = require("../db");
const { autenticar } = require("../autentincar");

const rotaConsultas = Router();

rotaConsultas.get("/consultas", autenticar, async function (req, res) {
  const itens = await db.Consulta.findMany();
  console.log(itens);
  res.json(itens);
});

rotaConsultas.post("/consultas", autenticar, async function (req, res) {
  const { aluno_id, psicologo_id, horario_id, nota, avaliacao } = req.body;
  const id = req.decodificado.id;
  const itens = await db.Consulta.create({
    data: {
      aluno_id,
      horario_id,
      psicologo_id: id,
      nota,
      avaliacao,
    },
  });
  const horario = await db.Horario.update({
    where: { id: horario_id },
    data: {
      status: 1,
    },
  });

  console.log(itens);
  res.json(itens);
});

rotaConsultas.delete("/consultas/:id", async function (req, res) {
  const { id } = req.params;
  const usuario = await db.Consulta.delete({
    where: { id: Number(id) },
  });
  console.log("Usuário deletado:", usuario);

  res.json({ mensagem: "Consulta deletado" });
});
rotaConsultas.put("/consultas/:id", autenticar, async function (req, res) {
  const { id } = req.params;
  const aluno = req.decodificado.id;
  const { psicologo_id, horario_id, aluno_id, nota, avaliacao, status } =
    req.body;
  const usuario = await db.Consulta.update({
    where: { id: Number(id) },
    data: {
      aluno_id : aluno,
      horario_id,
      psicologo_id,
      nota,
      avaliacao,
      status,
    },
  });
  console.log("Consulta atualizado");
  res.json({ mensagem: "Consulta atualizado" });
});

module.exports = { rotaConsultas };
