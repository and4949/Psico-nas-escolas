const form = document.querySelector("form");
form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const pnome = document.getElementById("nome");
  const psenha = document.getElementById("senha");
  const pconfirmar = document.querySelector(".confirmac");
  const pemail = document.getElementById("email");
  const pcrp = document.getElementById("crp");
  const pgenero = document.getElementById("genero");

  const postAluno = {
    nome: pnome.value,
    senha: psenha.value,
    email: pemail.value,
    crp: pcrp.value,
    genero: pgenero.value,
  };
  if (psenha.value == pconfirmar.value) {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postAluno),
      };

      const response = await fetch(
        "https://2mkvsd-3000.csb.app/psicologos",
        options
      );
      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }
      const dados = await response.json();
      console.log("opa");
      localStorage.setItem("login", dados["id"]);

      event.preventDefault();
    } catch (error) {
      event.preventDefault();
      console.error("Erro na requisição:", error.message);
    }
  } else {
    console.error("Senhas não iguais");
    psenha.style.border = "red solid 3px";
    pconfirmar.style.border = "red solid 3px";
  }
});
