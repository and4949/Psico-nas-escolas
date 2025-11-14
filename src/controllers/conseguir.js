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
  let alunoinfo = [];
  let nomepsicologo = true;
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
      if (aluno) {
        alunoinfo = [aluno.nome, aluno.turma];
      } else {
        alunoinfo = [null, null];
      }
    }
  }

  res.status(200).json({ horario, consulta, alunoinfo, nomepsicologo });
});

rotaConseguir.get("/achar/horariosdisponiveis", async function (req, res) {
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
      status: 0,
    },
  });
  res.status(200).json({ itens });
});

rotaConseguir.get(
  "/achar/horariosdisponiveis/datas",
  async function (req, res) {
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
        status: 0,
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
  }
);

rotaConseguir.get(
  "/achar/consultasdisponiveis/datas",
  async function (req, res) {
    const { comeco } = req.query;
    const { fim } = req.query;
    const inicio_mes = new Date(comeco);
    inicio_mes.setHours(0, 0, 0, 0);
    const fim_mes = new Date(fim);
    fim_mes.setHours(23, 59, 59, 999);
    const itens = await db.Consulta.findMany({
      where: {
        status: 0,
        aluno_id: null,
        horario: {
          comeco: {
            gte: inicio_mes,
            lte: fim_mes,
          },
        },
      },
      include: {
        horario: true,
      },
    });
    const datasUnicas = itens
      .map((c) => c.horario.comeco.toISOString().split("T")[0])
      .filter((value, index, self) => self.indexOf(value) === index); // remove duplicatas

    res.status(200).json({ datasUnicas });
  }
);
rotaConseguir.get("/achar/consultasdisponiveis", async function (req, res) {
  const { comeco } = req.query;
  const { fim } = req.query;
  const inicio_mes = new Date(comeco);
  inicio_mes.setHours(0, 0, 0, 0);
  const fim_mes = new Date(fim);
  fim_mes.setHours(23, 59, 59, 999);

  const itens = await db.consulta.findMany({
    where: {
      status: 0,
      aluno_id: null,
      horario: {
        comeco: {
          gte: inicio_mes,
          lte: fim_mes,
        },
      },
    },
    include: {
      horario: true,
      psicologo: {
        select: {
          id: true,
          nome: true,
        },
      },
    },
  });
  if (itens.length === 0) {
    res.status(200).json();
  }
  res.status(200).json({ itens });
});

module.exports = { rotaConseguir };
