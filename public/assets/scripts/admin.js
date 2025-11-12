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
        "https://2mkvsd-3000.csb.app/horarios",
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
}
async function carregar() {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authenticate: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(
      "https://2mkvsd-3000.csb.app/horarios",
      options
    );
    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }
    const dados = await response.json();
    console.log(dados);
  } catch (error) {
    console.error("Erro na requisição:", error.message);
  }
}
