window.pedido = "https://hdd5d7-3000.csb.app/achar/horarios/datas";
window.dia_selecionado = new Date();
async function CriarHorarios() {
  const comeco = document.querySelector(".comeco");
  const fim = document.querySelector(".fim");
  if (!comeco.value && !fim.value) {
    return "Ambos valores de horarios nulos";
  }
  if (!comeco.value) {
    return "Primeiro valor de horário vazio";
  }
  if (!fim.value) {
    return "Segundo valor de horário vazio";
  }

  const [horasC, minutosC] = comeco.value.split(":");
  const [horasF, minutosF] = fim.value.split(":");
  for (const diasS of window.dias_selecionados) {
    await mandarhorarios(diasS, horasC, minutosC, horasF, minutosF);
  }
}
async function mandarhorarios(diasS, horasC, minutosC, horasF, minutosF) {
  const DataC = new Date(
    diasS.getFullYear(),
    diasS.getMonth(),
    diasS.getDate(),
    horasC,
    minutosC
  );
  const DataF = new Date(
    diasS.getFullYear(),
    diasS.getMonth(),
    diasS.getDate(),
    horasF,
    minutosF
  );
  const DataComeco = DataC.toISOString();
  const DataFim = DataF.toISOString();

  const PostHorario = {
    comeco: DataComeco,
    fim: DataFim,
  };
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(PostHorario),
    };

    const response = await fetch(
      "https://hdd5d7-3000.csb.app/horarios",
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
async function atualizarlista() {
  const datas_horarios = document.querySelector(".datas-horarios");
  if (!window.multiselecao) {
    datas_horarios.innerHTML = "";
    listinha = [];
  }
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `https://hdd5d7-3000.csb.app/achar/horarios?comeco=${window.dia_selecionado.toISOString()}&fim=${window.dia_selecionado.toISOString()}`,
      options
    );
    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }
    const dados = await response.json();
    if (dados) {
      for (item of dados.itens) {
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
        if (!listinha.includes(item.id)) {
          datas_horarios.innerHTML += `<div class="hora">
        <p>${horascmc}:${minutoscmc} até ${horasfm}:${minutosfm}</p>
        <button onclick="atualizarInfosSobre(${item.id})"></button>
    </div>`;
          listinha.push(item.id);
        }
      }
    }
    const detalhes = document.querySelector(".detalhes");
    detalhes.innerHTML = ``;
  } catch (error) {}
}
atualizarlista();
async function atualizarInfosSobre(x) {
  const detalhes = document.querySelector(".detalhes");
  detalhes.innerHTML = ``;
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `https://hdd5d7-3000.csb.app/achar/consultas/horarios/${x}`,
      options
    );
    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }
    const dados = await response.json();
    if (dados.consulta) {
      detalhes.innerHTML = `
      <div class="linha-detalhe">
                        <button class="deletar" onclick="deletar(${x})"> deletar</button>
                </div>
                <div class="linha-detalhe">
                    <div>
                        <img src="../assets/images/Paciente.svg" alt="">
                        <p>${dados.alunoinfo[0]}:</p>
                    </div>
                    <div>
                        <p>Turma:${dados.alunoinfo[1]}</p>
                    </div>
                </div>
                <div class="linha-detalhe">
                    <div>
                        <img src="../assets/images/Paciente.svg" alt="">
                        <p>Psicologo:${dados.psicologonome}</p>
                    </div>`;
    } else {
      detalhes.innerHTML = ` <div class="linha-detalhe"> <button class="deletar" onclick="deletar(${x})"> deletar</button> </div> nenhuma consulta encontrada`;
    }
  } catch (error) {}
}
