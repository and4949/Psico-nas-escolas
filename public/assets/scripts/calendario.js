window.dia_selecionado = new Date();
window.dias_selecionados = [window.dia_selecionado];
window.multiselecao = false;
window.diasativos = [];
async function verativos() {
  try {
    const options = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let PrimeiroDoMes = new Date(
      dia_selecionado.getFullYear(),
      dia_selecionado.getMonth(),
      1
    );
    let PrimeiroDiaCalendario = new Date(
      dia_selecionado.getFullYear(),
      dia_selecionado.getMonth(),
      1 - PrimeiroDoMes.getDay()
    );
    let UltimoDiaCalendario = new Date(
      PrimeiroDiaCalendario.getFullYear(),
      PrimeiroDiaCalendario.getMonth(),
      PrimeiroDiaCalendario.getDate() + 41
    );
    const response = await fetch(
      `https://2mkvsd-3000.csb.app/achar/horarios?comeco=${PrimeiroDiaCalendario.toISOString()}&fim=${UltimoDiaCalendario.toISOString()}`,
      options
    );
    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }
    const dados = await response.json();
    window.diasativos = dados.datasUnicas;
  } catch (error) {}
}

function mudarmulti() {
  let botaomulti = document.querySelector(".multipla-selecao button");
  if (window.multiselecao) {
    window.multiselecao = false;
    botaomulti.style.border = "10px solid #81aff4";
    botaomulti.style.backgroundColor = "#cad4e9";
  } else {
    window.multiselecao = true;
    botaomulti.style.border = "5px solid #2763e5";
    botaomulti.style.backgroundColor = "#F5F5F5";
  }
}

async function criar_calendario() {
  await verativos();
  let calendario_visual = document.querySelector(".dias");
  mes_selecionado = window.dia_selecionado.getMonth();
  ano = window.dia_selecionado.getFullYear();
  primeiro_dia_do_mes = new Date(ano, mes_selecionado, 1);
  dia_semana = primeiro_dia_do_mes.getDay();
  let posicao = 1;
  let visual = ``;
  for (let i = 0; i < 6; i++) {
    let semana = [];
    visual += `<div class="semana">`;
    for (let d = 0; d < 7; d++) {
      let dia_atual = new Date(ano, mes_selecionado, posicao - dia_semana);
      semana.push(dia_atual);
      visual += `<button class="dia`;
      posicao = posicao + 1;
      if (dia_atual.getMonth() + 1 < 10) {
        MV = `0${dia_atual.getMonth() + 1}`;
      } else {
        MV = `${dia_atual.getMonth() + 1}`;
      }
      if (dia_atual.getDate() < 10) {
        DV = `0${dia_atual.getDate()}`;
      } else {
        DV = `${dia_atual.getDate()}`;
      }
      let procurar = `${dia_atual.getFullYear()}-${MV}-${DV}`;
      if (!window.diasativos) {
        window.diasativos = [];
      }
      if (window.diasativos.includes(procurar)) {
        if (dia_atual.getMonth() !== window.dia_selecionado.getMonth()) {
          visual += ` ativo-proximo-mes`;
        } else {
          visual += ` ativo`;
        }
      } else if (dia_atual.getMonth() !== window.dia_selecionado.getMonth()) {
        visual += ` proximo-mes`;
      }
      for (const algo of window.dias_selecionados) {
        if (
          dia_atual.getDate() == algo.getDate() &&
          dia_atual.getMonth() == algo.getMonth()
        ) {
          visual += " selecionado";
        }
      }

      visual += `" onclick="selecionar(${dia_atual.getFullYear()},${dia_atual.getMonth()},${dia_atual.getDate()})">${dia_atual.getDate()}</button>`;
    }
    visual += `</div>`;
  }
  calendario_visual.innerHTML = visual;
  mudarmes();
}
function selecionar(a, b, c) {
  if (!window.multiselecao) {
    window.dia_selecionado = new Date(a, b, c);
    window.dias_selecionados = [window.dia_selecionado];
  } else {
    window.dia_selecionado = new Date(a, b, c);
    diajaselecionado = window.dias_selecionados.some(
      (d) => d.getFullYear() === a && d.getMonth() === b && d.getDate() === c
    );
    if (diajaselecionado) {
      window.dias_selecionados = window.dias_selecionados.filter(
        (d) =>
          !(d.getFullYear() == a && d.getMonth() === b && d.getDate() === c)
      );
    } else {
      window.dias_selecionados.push(new Date(a, b, c));
    }
  }
  criar_calendario();
}
function mudarmes() {
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  let alternarmes = document.querySelector(".mes");
  alternarmes.innerHTML = `<button class="anomes" onclick="avançarmes(-1)"> <img src="../assets/images/arrow-left-solid-full 1.svg" alt=""> </button>
    <button class="anomes" onclick="selecionarmes()"><p>${window.dia_selecionado.getFullYear()}/${
    meses[window.dia_selecionado.getMonth()]
  }</p></button>
    <button class="anomes" onclick="avançarmes(1)"> <img src="../assets/images/arrow-right-solid-full 1.svg" alt=""> </button>`;
}
function avançarmes(x) {
  window.dia_selecionado = new Date(
    window.dia_selecionado.getFullYear(),
    window.dia_selecionado.getMonth() + x,
    window.dia_selecionado.getDate()
  );
  if (!window.multiselecao) {
    window.dias_selecionados = [window.dia_selecionado];
  }
  criar_calendario();
}

function selecionarmes() {
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  let alternarmes = document.querySelector(".mes");
  alternarmes.innerHTML = `<p><button class="anomes" onclick="criar_calendario()">${window.dia_selecionado.getFullYear()}</button></p>`;
  let calendario_visual = document.querySelector(".dias");
  let texto = "";
  let n = 0;
  for (let s = 0; s < 3; s++) {
    texto += `<div class="semana">`;
    for (let d = 0; d < 4; d++) {
      texto += `<button class="semanadia" onclick="avançarmes(-${window.dia_selecionado.getMonth()}+${n})">${
        meses[n]
      }</button>`;
      n += 1;
    }
    texto += `</div>`;
  }
  calendario_visual.innerHTML = texto;
}
criar_calendario();
