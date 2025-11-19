window.pedido = "https://hdd5d7-3000.csb.app/achar/horarios/datas";
window.dia_selecionado = new Date();
window.dias_selecionados = [window.dia_selecionado];
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
        Authenticate: "Bearer " + sessionStorage.getItem("token"),
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
window.listinha = [];
async function atualizarlista() {
  const datas_horarios = document.querySelector(".datas-horarios");
  datas_horarios.innerHTML = ``;

  for (const dias of window.dias_selecionados) {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `https://hdd5d7-3000.csb.app/achar/horarios?comeco=${dias.toISOString()}&fim=${dias.toISOString()}`,
        options
      );
      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }
      const dados = await response.json();
      if (dados) {
        const diasDaSemana = [
          "Domingo",
          "Segunda-feira",
          "Terça-feira",
          "Quarta-feira",
          "Quinta-feira",
          "Sexta-feira",
          "Sábado",
        ];
        const semana_informacao = document.querySelector(".dia-semana");
        let dataescolhida = new Date(dados.itens[0].comeco);
        let semanaescolhida = diasDaSemana[dataescolhida.getDay()];
        let diaescolhido = dataescolhida.getDate().toString().padStart(2, "0");
        let mesescolhido = (dataescolhida.getMonth() + 1)
          .toString()
          .padStart(2, "0");
        semana_informacao.innerHTML = `${semanaescolhida},/${diaescolhido}/${mesescolhido}/${dataescolhida.getFullYear()}`;
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
          datas_horarios.innerHTML += `<div class="hora">
          <p>${horascmc}:${minutoscmc} até ${horasfm}:${minutosfm} (${datacmc.getFullYear()}/${
            datacmc.getMonth() + 1
          }/${datacmc.getDate()})</p>
          <button onclick="atualizarInfosSobre(${item.id})"></button>
      </div>`;
        }
      }
      const detalhes = document.querySelector(".detalhes");
      detalhes.innerHTML = ``;
    } catch (error) {}
  }
}

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
                        <p>Psicologo:${dados.nomepsicologo}</p>
                    </div>`;
    } else {
      detalhes.innerHTML = ` <div class="nao-linha-detalhe"> <button class="deletar" onclick="deletar(${x})"> deletar</button> Nenhuma consulta encontrada</div> `;
    }
  } catch (error) {}
}
async function deletar(x) {
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `https://hdd5d7-3000.csb.app/achar/consultas/horarios/${x}`,
    options
  );
  const dados = await response.json();
  if (dados.consulta) {
    options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch(
      `https://hdd5d7-3000.csb.app/consultas/${dados.consulta.id}`,
      options
    );
  }
  options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  await fetch(`https://hdd5d7-3000.csb.app/horarios/${x}`, options);
}

atualizarlista();
