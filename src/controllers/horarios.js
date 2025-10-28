const { Router } = require("express");
const { db } = require("../db");

const rotaHorarios = Router();

rotaHorarios.get("/horarios", async function (req, res) {
  const itens = await db.Psicologo.findMany();
  console.log(itens);
  res.json(itens);
});

rotaHorarios.post("/Horarios", async function (req, res) {
  const { comeco, fim, status, escola } = req.body;
  const itens = await db.Psicologo.create({
    data: {
      fim,
      comeco,
      status,
      escola,
    },
  });
  console.log(itens);
  res.json(itens);
});

rotaHorarios.delete("/Horarios/:id", async function (req, res) {
  const { id } = req.params;
  const usuario = await db.Psicologo.delete({
    where: { id: Number(id) },
  });
  console.log("Usuário deletado:", usuario);

  res.json({ mensagem: "Horario deletado" });
});
rotaHorarios.put("/Horarios/:id", async function (req, res) {
  const { id } = req.params;
  const { comeco, fim, status, escola } = req.body;
  const usuario = await db.Psicologo.update({
    where: { id: Number(id) },
    data: {
      fim,
      comeco,
      status,
      escola,
    },
  });
  console.log("Horario atualizado");
  res.json({ mensagem: "Horario atualizado" });
});

module.exports = { rotaHorarios };
