const express = require("express");
const { rotaAlunos } = require("./alunos");
const { rotaPsicologos } = require("./psicologos");
const { rotaHorarios } = require("./horarios");
const { rotaConsultas } = require("./consultas");
const server = express();

server.use(express.json());
server.use(rotaAlunos);
server.use(rotaPsicologos);
server.use(rotaHorarios);
server.use(rotaConsultas);

server.listen(3000, () => console.log("Funcionando"));
