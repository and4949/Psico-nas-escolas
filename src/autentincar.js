const jwt = require("jsonwebtoken");
const chaveSecreta = "667a89af080112ad5270785bcf0b772e6cd256de";

function autenticar(req, res, next) {
  const token = req.header("Authenticate")?.replace("Bearer ", "");
  console.log(token);

  if (!token) {
    res.status(401).send("O token de acesso é obrigatório");
    return;
  }

  try {
    const decodificado = jwt.verify(token, chaveSecreta);
    req.decodificado = decodificado;
    next();
  } catch (err) {
    res.status(401).send("Token invalido");
    return;
  }
} 

module.exports = { autenticar, chaveSecreta };
