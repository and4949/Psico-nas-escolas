if (localStorage.getItem("login") && localStorage.getItem("senha")) {
  async function logar() {
    const pemail = localStorage.getItem("login").value;
    const psenha = localStorage.getItem("senha").value;

    const postLogin = {
      email: pemail,
      senha: psenha,
    };
    localStorage.clear();
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postLogin),
      };

      const response = await fetch(
        "https://2mkvsd-3000.csb.app/api/login",
        options
      );
      const dados = await response.json();
      if (response.ok && dados.token) {
        localStorage.setItem("token", dados.token);
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
  }
  logar();
}
