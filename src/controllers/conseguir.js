const { Router } = require("express");
const { db } = require("../db");

const rotaConseguir = Router();
rotaConseguir.get("/achar/data/horarios", async function (req, res) {
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
    return res.json({ mensagem: "Nada encontrado" });
  }

  const datasUnicas = [
    ...new Set(
      itens.map((item) => new Date(item.comeco).toISOString().split("T")[0])
    ),
  ];

  res.status(200).json({ datasUnicas });
});

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

  res.status(200).json({ itens });
});

module.exports = { rotaConseguir };
