if (localStorage.getItem("login") && localStorage.getItem("senha")) {
  async function logar() {
    const pemail = sessionStorage.getItem("login").value;
    const psenha = sessionStorage.getItem("senha").value;

    const postLogin = {
      email: pemail,
      senha: psenha,
    };
    sessionStorage.clear();
    try {
      //testelegal
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
        sessionStorage.setItem("token", dados.token);
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
