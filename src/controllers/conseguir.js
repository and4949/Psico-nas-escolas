const { Router } = require("express");
const { db } = require("../db");

const rotaConseguir = Router();

/*rotaConseguir.get("/achar/horarios", async function (req, res) {
  const { data } = req.query;
  const dia = new Date(data);
  const inicio_dia = new Date(dia);
  inicio_dia.setHours(0, 0, 0, 0);
  const fim_dia = new Date(dia);
  fim_dia.setHours(23, 59, 59, 999);

  const itens = await db.Horario.findMany({
    where: {
      comeco: {
        gte: inicio_dia,
        lte: fim_dia,
      },
    },
  });
  if (itens.length === 0) {
    return res.status(404).json({ mensagem: "Nada encontrado" });
  }
  console.log("encontrado");
  res.status(200).json({ mensagem: "Horario encontrado" });
});*/

rotaConseguir.get("/achar/horarios", async function (req, res) {
  const { comeco } = req.query;
  const { fim } = req.query;
  const inicio_mes = new Date(comeco);
  inicio_mes.setHours(0, 0, 0, 0);
  const fim_mes = new Date(fim);
  fim_mes.setHours(23, 59, 59, 999);

  const itens = await db.horario.findMany({
    where: {
      comeco: {
        gte: inicio_mes,
        lte: fim_mes,
      },
    },
  });
  if (itens.length === 0) {
    return res.status(404).json({ mensagem: "Nada encontrado" });
  }

  const datasUnicas = [
    ...new Set(
      itens.map((item) => new Date(item.comeco).toISOString().split("T")[0])
    ),
  ];

  res.status(200).json({ datasUnicas });
});

module.exports = { rotaConseguir };
