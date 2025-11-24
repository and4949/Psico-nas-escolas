window.antigaselecao = "";
async function criarlateral(x) {
  if (window.antigaselecao !== "") {
    const consultaa = document.querySelector(
      `.consulta${window.antigaselecao}`
    );
    consultaa.style.backgroundColor = "#F5F5F5";
    consultaa.style.boxShadow = "2px 4px 4px rgba(0, 0, 0, 0.25)";
    window.antigaselecao = `${x}`;
  }

  const consultab = document.querySelector(`.consulta${x}`);
  consultab.style.backgroundColor = "#CAD4E9";
  consultab.style.boxShadow = "none";

  window.antigaselecao = `${x}`;

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
        `;
    infos.innerHTML += `</div>`;
    let aval = document.querySelector(".alertaava");
    aval.innerHTML = "";
    if (item.status === 2) {
      aval.innerHTML = `
    <div class="texto-alerta" style="
    text-size|: ;
    text-size|: ;
    text-size|:  2;
    text-size|: ;
    font-size: 24px;
    margin-bottom: 5px;
">
    <p>A função “alerta” serve para casos:</p>
    <p>1- Risco de autoagressão ou agressão a </p>
    <p>terceiros</p>
    <p>2- Risco de qualquer tipo de abuso</p>
    <p>3- Risco de negligencia grave</p>
    </div>
    <button class="alerta" onclick="mudarstatus(${x},3,${item.aluno.id})">Alerta!</button>`;
    }
    if (item.status === 1) {
      let aval = document.querySelector(".alertaava");
      aval.innerHTML = `
    <div class="texto-alerta" style="
    text-size|: ;
    text-size|: ;
    text-size|:  2;
    text-size|: ;
    font-size: 24px;
    margin-bottom: 5px;
">
    <p>Concluir Consulta</p>
    </div>
    <button class="enviar" onclick="mudarstatus(${x},2,${item.aluno.id})">Concluir</button>`;
    }
    if (item.status === 0) {
      let aval = document.querySelector(".alertaava");
      aval.innerHTML = ``;
    }
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
      "https://hdd5d7-3000.csb.app/achar/consultas/criadas",
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
      let teste = "";
      switch (item.status) {
        case 0:
          teste = "Vazio";
          break;
        case 1:
          teste = "Agendado";
          break;
        case 2:
          teste = "Concluido";
          break;
        case 3:
          teste = "Alertado";
          break;
      }
      consults.innerHTML += `<div class="consulta consulta${item.id}" onclick="criarlateral(${item.id})">
      <div class="nova">
      <div class="status status-${teste}">
      ${teste}
      </div>
      </div>
<div class="titulo">
  <p>${semana}, ${dia}/${mes}/${ano} às ${horas}:${minutos}</p>
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
async function mudarstatus(x, status, aluno) {
  const UpdateConsulta = {
    status: status,
    aluno_id: aluno,
  };
  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authenticate: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify(UpdateConsulta),
    };
    const response = await fetch(
      `https://hdd5d7-3000.csb.app/consultas/${x}`,
      options
    );
  } catch (error) {}
}
