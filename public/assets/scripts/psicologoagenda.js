window.pedido = "https://hdd5d7-3000.csb.app/achar/horariosdisponiveis/datas";
window.dia_selecionado = new Date();
let selecaohoras = [];
async function atualizarlista() {
  selecaohoras.length = 0;
  const datas_horarios = document.querySelector(".horas");
  datas_horarios.innerHTML = ``;
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `https://hdd5d7-3000.csb.app/achar/horariosdisponiveis?comeco=${window.dia_selecionado.toISOString()}&fim=${window.dia_selecionado.toISOString()}`,
      options
    );
    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }
    const dados = await response.json();
    for (const item of dados.itens) {
      let datacmc = new Date(item.comeco);
      let datafm = new Date(item.fim);
      let horascmc = datacmc.getHours();
      let horasfm = datafm.getHours();
      if (datacmc.getMinutes() < 10) {
        minutoscmc = `0${datacmc.getMinutes()}`;
      } else {
        minutoscmc = datacmc.getMinutes();
      }
      if (datafm.getMinutes() < 10) {
        minutosfm = `0${datafm.getMinutes()}`;
      } else {
        minutosfm = datafm.getMinutes();
      }
      datas_horarios.innerHTML += `<div class="hora hora${item.id}">
        <p>${horascmc}:${minutoscmc} até ${horasfm}:${minutosfm}</p>
        <button class="botao${item.id}" onclick="selecaohora(${item.id})"></button>
      </div>`;
    }
  } catch (error) {}
}
async function selecaohora(x) {
  let botao = document.querySelector(`.botao${x}`);
  let horax = document.querySelector(`.hora${x}`);
  if (!selecaohoras.includes(x)) {
    botao.style.border = "5px solid #81aff4";
    botao.style.backgroundColor = "#F5F5F5";
    selecaohoras.push(x);
    horax.style.backgroundColor = "#F5F5F5";
  } else {
    botao.style = "";
    let indice = selecaohoras.indexOf(x);
    if (indice > -1) {
      selecaohoras.splice(indice, 1);
      horax.style.backgroundColor = "#CAD4E9";
    }
  }
}
async function Criarconsultas() {
  if (selecaohoras.length !== 0) {
    for (x of selecaohoras) {
      criarconsulta(x);
    }
  }
}

async function criarconsulta(x) {
  const PostConsulta = {
    horario_id: x,
  };
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authenticate: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify(PostConsulta),
    };

    const response = await fetch(
      "https://hdd5d7-3000.csb.app/consultas",
      options
    );
    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }
    const dados = await response.json();
  } catch (error) {
    console.error("Erro na requisição:", error.message);
  }
}
atualizarlista();
