const express = require("express");
const { join } = require("path");
const { rotaAlunos } = require("./controllers/alunos");
const { rotaPsicologos } = require("./controllers/psicologos");
const { rotaHorarios } = require("./controllers/horarios");
const { rotaConsultas } = require("./controllers/consultas");
const { rotaConseguir } = require("./controllers/conseguir");

const cors = require("cors");
const { rotaLogin } = require("./controllers/login");
const server = express();
server.use(express.static("assets"));
server.use(cors());
server.use(express.json());
server.use(rotaAlunos);
server.use(rotaPsicologos);
server.use(rotaHorarios);
server.use(rotaConsultas);
server.use(rotaLogin);
server.use(rotaConseguir);

server.get("/", (req, res) => {
  res.sendFile(join(__dirname, "..", "pages", "index.html"));
});
server.get("/administrador", (req, res) => {
  res.sendFile(join(__dirname, "..", "pages", "administrador.html"));
});
server.get("/aluno-agenda", (req, res) => {
  res.sendFile(join(__dirname, "..", "pages", "aluno-agenda.html"));
});
server.get("/aluno-historico", (req, res) => {
  res.sendFile(join(__dirname, "..", "pages", "aluno-historico.html"));
});
server.get("/cadastro-psicologo", (req, res) => {
  res.sendFile(join(__dirname, "..", "pages", "cadastro-psicologo.html"));
});
server.get("/cadastro-aluno", (req, res) => {
  res.sendFile(join(__dirname, "..", "pages", "cadastro-aluno.html"));
});
server.get("/escolha", (req, res) => {
  res.sendFile(join(__dirname, "..", "pages", "escolha-perfil.html"));
});
server.get("/psicologo-agenda", (req, res) => {
  res.sendFile(join(__dirname, "..", "pages", "psicologo-agenda.html"));
});
server.get("/psicologo-historico", (req, res) => {
  res.sendFile(join(__dirname, "..", "pages", "psicologo-historico.html"));
});

server.listen(3000, () => console.log("Funcionando"));
