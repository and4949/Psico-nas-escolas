const express = require("express");
const { rotaAlunos } = require("./controllers/alunos");
const { rotaPsicologos } = require("./controllers/psicologos");
const { rotaHorarios } = require("./controllers/horarios");
const { rotaConsultas } = require("./controllers/consultas");
const cors = require("cors");
const server = express();
server.use(cors());
server.use(express.json());
server.use(rotaAlunos);
server.use(rotaPsicologos);
server.use(rotaHorarios);
server.use(rotaConsultas);

server.get("/", (req, res) => {
  res.send(200);
});

server.listen(3000, () => console.log("Funcionando"));
