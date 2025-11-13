const form = document.querySelector("form");
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const pemail = document.getElementById("email").value;
  const psenha = document.getElementById("senha").value;

  const postLogin = {
    email: pemail,
    senha: psenha,
  };

  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postLogin),
    };

    const response = await fetch(
      "https://hdd5d7-3000.csb.app/api/login",
      options
    );
    const dados = await response.json();
    if (response.ok && dados.token) {
      console.log(sessionStorage.length);

      sessionStorage.setItem("token", dados.token);
      console.log("foi");
      console.log(sessionStorage.length);
      if (dados.tipo === "adm") {
        window.location.href = "./administrador.html";
      } else if (dados.tipo === "psicologo") {
        window.location.href = "./psicologo-agenda.html";
      } else {
        window.location.href = "./aluno-agenda.html";
      }
    }
  } catch (error) {
    event.preventDefault();
    console.error("Erro na requisição:", error.message);
  }
});
