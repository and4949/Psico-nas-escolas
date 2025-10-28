const express = require("express");
const { rotaAlunos } = require("./controllers/alunos");
const { rotaPsicologos } = require("./controllers/psicologos");
const { rotaHorarios } = require("./controllers/horarios");
const { rotaConsultas } = require("./controllers/consultas");
const server = express();

server.use(express.json());
server.use(rotaAlunos);
server.use(rotaPsicologos);
server.use(rotaHorarios);
server.use(rotaConsultas);

server.listen(3000, () => console.log("Funcionando"));
