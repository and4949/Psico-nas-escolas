const express = require("express");
const { rotaAlunos } = require("./controllers/alunos");
const server = express();

server.use(express.json());
server.use(rotaAlunos);


server.listen(3000, () => console.log("Funcionando"));
