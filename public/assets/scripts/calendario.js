window.dia_selecionado = new Date();
window.dias_selecionados = [window.dia_selecionado];
window.multiselecao = false;
function criar_calendario() {
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
      // criar metodo get para procurar metodo
      if (dia_atual.getMonth() !== window.dia_selecionado.getMonth()) {
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
    if (!window.dias_selecionados.includes(window.dia_selecionado)) {
      window.dias_selecionados.push(window.dia_selecionado);
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
