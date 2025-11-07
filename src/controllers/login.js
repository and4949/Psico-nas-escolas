const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { db } = require("../db");
const { chaveSecreta } = require("../autentincar");

const rotaLogin = Router();

rotaLogin.post("/api/login", async function (req, res) {
  const { email, senha } = req.body;
  const psicologo = await db.psicologo.findFirst({
    where: {
      email,
      senha,
    },
  });
  if (psicologo) {
    const token = jwt.sign({ id: psicologo.id }, chaveSecreta);
    res.status(200).json({ token, tipo: "psicologo" });
    return;
  }

  const adm = await db.aluno.findFirst({
    where: {
      email,
      senha,
      adm: true,
    },
  });

  const aluno = await db.aluno.findFirst({
    where: {
      email,
      senha,
    },
  });

  if (adm) {
    const token = jwt.sign({ id: adm.id }, chaveSecreta);
    res.status(200).json({ token, tipo: "adm" });
    return;
  }
  if (aluno && !adm) {
    const token = jwt.sign({ id: aluno.id }, chaveSecreta);
    res.status(200).json({ token, tipo: "aluno" });
    return;
  }

  res.status(401).json({ mensagem: "erro login" });
});

module.exports = { rotaLogin };
