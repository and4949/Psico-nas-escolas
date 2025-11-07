window.multiselecao = false
window.selecao = []
window.dia_selecionado = new Date();
function criar_calendario() {
  let calendario_visual = document.querySelector(".dias");
  mes_selecionado = dia_selecionado.getMonth();
  ano = dia_selecionado.getFullYear();
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
      if (dia_atual.getMonth() !== dia_selecionado.getMonth()) {
        visual += ` proximo-mes`;
      }
      if (
        dia_atual.getDate() == dia_selecionado.getDate() &&
        dia_atual.getMonth() == dia_selecionado.getMonth()
      ) {
        visual += " selecionado";
      }
      visual += `" onclick="selecionar(${dia_atual.getFullYear()},${dia_atual.getMonth()},${dia_atual.getDate()})">${dia_atual.getDate()}</button>`;
    }
    visual += `</div>`;
  }
  calendario_visual.innerHTML = visual;
  mudarmes();
}
function selecionar(a, b, c) {
    if (!multiselecao){
        dia_selecionado = new Date(a,b,c);
        criar_calendario();
    }
    if (multiselecao){
        selecao.push( new Date(a,b,c))
    }
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
    <button class="anomes" onclick="selecionarmes()"><p>${dia_selecionado.getFullYear()}/${
    meses[dia_selecionado.getMonth()]
  }</p></button>
    <button class="anomes" onclick="avançarmes(1)"> <img src="../assets/images/arrow-right-solid-full 1.svg" alt=""> </button>`;
}
function avançarmes(x) {
  dia_selecionado = new Date(
    dia_selecionado.getFullYear(),
    dia_selecionado.getMonth() + x,
    dia_selecionado.getDate()
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
  alternarmes.innerHTML = `<p><button class="anomes" onclick="criar_calendario()">${dia_selecionado.getFullYear()}</button></p>`;
  let calendario_visual = document.querySelector(".dias");
  let texto = "";
  let n = 0;
  for (let s = 0; s < 3; s++) {
    texto += `<div class="semana">`;
    for (let d = 0; d < 4; d++) {
      texto += `<button class="semanadia" onclick="avançarmes(-${dia_selecionado.getMonth()}+${n})">${
        meses[n]
      }</button>`;
      n += 1;
    }
    texto += `</div>`;
  }
  calendario_visual.innerHTML = texto;
}
criar_calendario();
