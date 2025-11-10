const { Router } = require("express");
const { db } = require("../db");
const { autenticar } = require("../autentincar");

const rotaHorarios = Router();

rotaHorarios.get("/horarios",autenticar, async function (req, res) {
  const itens = await db.Horario.findMany();
  console.log(itens);
  res.json(itens);
});

rotaHorarios.post("/Horarios", async function (req, res) {
  const { comeco, fim } = req.body;
  const itens = await db.Horario.create({
    data: {
      fim,
      comeco,
    },
  });
  console.log(itens);
  res.json(itens);
});

rotaHorarios.delete("/Horarios/:id", async function (req, res) {
  const { id } = req.params;
  const usuario = await db.Horario.delete({
    where: { id: Number(id) },
  });
  console.log("Usuário deletado:", usuario);

  res.json({ mensagem: "Horario deletado" });
});
rotaHorarios.put("/Horarios/:id", async function (req, res) {
  const { id } = req.params;
  const { comeco, fim, status } = req.body;
  const usuario = await db.Horario.update({
    where: { id: Number(id) },
    data: {
      fim,
      comeco,
      status,
    },
  });
  console.log("Horario atualizado");
  res.json({ mensagem: "Horario atualizado" });
});

module.exports = { rotaHorarios };
