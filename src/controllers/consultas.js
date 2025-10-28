const { Router } = require("express");
const { db } = require("../db");

const rotaConsultas = Router();

rotaConsultas.get("/consultas", async function (req, res) {
  const itens = await db.Consulta.findMany();
  console.log(itens);
  res.json(itens);
});

rotaConsultas.post("/consultas", async function (req, res) {
  const { psicologo_id, horario_id, status } = req.body;
  const itens = await db.Consulta.create({
    data: {
      horario_id,
      psicologo_id,
      status,
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
rotaConsultas.put("/consultas/:id", async function (req, res) {
  const { id } = req.params;
  const { psicologo_id, horario_id, status } = req.body;
  const usuario = await db.Consulta.update({
    where: { id: Number(id) },
    data: {
      horario_id,
      psicologo_id,
      status,
    },
  });
  console.log("Consulta atualizado");
  res.json({ mensagem: "Consulta atualizado" });
});

module.exports = { rotaConsultas };
