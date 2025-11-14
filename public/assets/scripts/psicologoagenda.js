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
      console.log(item);
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
      datas_horarios.innerHTML += `<div class="hora">
        <p>${horascmc}:${minutoscmc} até ${horasfm}:${minutosfm}</p>
        <button class="botao${item.id}" onclick="selecaohora(${item.id})"></button>
      </div>`;
    }
  } catch (error) {}
}
async function selecaohora(x) {
  console.log(x);
  let botao = document.querySelector(`.botao${x}`);
  if (!selecaohoras.includes(x)) {
    botao.style.border = "5px solid #2763e5";
    botao.style.backgroundColor = "#F5F5F5";
    selecaohoras.push(x);
  } else {
    botao.style = "";
    let indice = selecaohoras.indexOf(x);
    if (indice > -1) {
      selecaohoras.splice(indice, 1);
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
  console.log(x);
  const PostConsulta = {
    psicologo_id: 1, //???
    horario_id: x,
  };
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
