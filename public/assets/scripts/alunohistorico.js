async function criarlateral(x) {
  infos = document.querySelector(".informações");
  infos.innerHTML = ``;

  try {
    const response = await fetch(
      `https://hdd5d7-3000.csb.app/achar/consultas/${x}`
    );
    const dados = await response.json();
    const item = dados.item;

    if (!item) {
      infos.innerHTML = `<p class="p28px">Consulta não encontrada.</p>`;
      return;
    }

    const date = new Date(item.horario.comeco);
    const horas = date.getHours().toString().padStart(2, "0");
    const minutos = date.getMinutes().toString().padStart(2, "0");

    const aluno = item.aluno ? item.aluno.nome : "vazio";

    const diasDaSemana = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];

    const semana = diasDaSemana[date.getDay()];
    const dia = date.getDate().toString().padStart(2, "0");
    const mes = (date.getMonth() + 1).toString().padStart(2, "0");
    const ano = date.getFullYear();

    infos.innerHTML = `
      <div class="p28px">
        <p>${semana}, ${ano}/${mes}/${dia} às ${horas}:${minutos}</p>
      </div>
      <div class="titulo">
        <p>Paciente: ${aluno}</p>
        <p>Turma: ${item.aluno ? item.aluno.turma : "-"}</p>
        <p>Profissional: ${item.psicologo.nome}</p>
        <p>Consulta presencial ???</p>
      </div>`;
  } catch (err) {
    console.log("Erro:", err);
  }
}

async function procurarconsultas() {
  consults = document.querySelector(".consultas");
  consults.innerHTML = "";
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authenticate: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(
      "https://hdd5d7-3000.csb.app/achar/consultas/participadas",
      options
    );
    const dados = await response.json();
    console.log(dados.itens);
    for (const item of dados.itens) {
      date = new Date(item.horario.comeco);
      const horas = date.getHours().toString().padStart(2, "0");
      const minutos = date.getMinutes().toString().padStart(2, "0");
      if (item.aluno) {
        aluno = item.aluno.nome;
      } else {
        aluno = "vazio";
      }
      const diasDaSemana = [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado",
      ];
      semana = diasDaSemana[date.getDay()];
      dia = date.getDate().toString().padStart(2, "0");
      mes = (date.getMonth() + 1).toString().padStart(2, "0");
      ano = date.getFullYear();
      consults.innerHTML += `<div class="consulta" onclick="criarlateral(${item.id})">
<div class="titulo">
  <p>${semana}, ${ano}/${mes}/${dia} às ${horas}:${minutos}</p>
</div>
<div class="info">
  <div class="icone">
    <img src="../assets/images/Paciente.svg" alt="" />
  </div>
  <p>${aluno}</p>
</div>
</div>`;
    }
  } catch {}
}
procurarconsultas();
/*;*/
