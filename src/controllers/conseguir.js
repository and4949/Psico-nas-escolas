const { Router } = require("express");
const { db } = require("../db");

const rotaConseguir = Router();
rotaConseguir.get("/achar/horarios/datas", async function (req, res) {
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

rotaConseguir.get("/achar/consultas/horarios/:id", async function (req, res) {
  const { id } = req.params;
  const horario = await db.horario.findFirst({
    where: {
      id: parseInt(id),
    },
  });
  const consulta = await db.consulta.findFirst({
    where: {
      horario_id: parseInt(id),
    },
  });
  if (consulta) {
    const psicologo = await db.psicologo.findFirst({
      where: {
        id: parseInt(consulta.psicologo_id),
      },
    });
    nomepsicologo = psicologo.nome;
    if (consulta.aluno_id) {
      const aluno = await db.aluno.findFirst({
        where: {
          id: parseInt(consulta.aluno_id),
        },
      });
      alunoinfo = [aluno.nome, aluno.turma];
    }
  }

  res.status(200).json({ horario, consulta, alunoinfo, nomepsicologo });
});

module.exports = { rotaConseguir };
