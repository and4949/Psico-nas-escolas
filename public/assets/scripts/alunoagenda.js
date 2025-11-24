window.pedido = "https://hdd5d7-3000.csb.app/achar/consultasdisponiveis/datas";
window.dias_selecionados = [new Date()];
async function atualizarlista() {
  const datas_horarios = document.querySelector(".opcoes-dias");
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
        `https://hdd5d7-3000.csb.app/achar/consultasdisponiveis?comeco=${dias.toISOString()}&fim=${dias.toISOString()}`,
        options
      );
      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }
      const dados = await response.json();
      if (dados.itens) {
        const date = new Date(dados.itens[0].horario.comeco);

        const horas = date.getHours().toString().padStart(2, "0");
        const minutos = date.getMinutes().toString().padStart(2, "0");

        const horaFormatada = `${horas}:${minutos}`;
        console.log(horaFormatada);
        console.log(dados.itens);
        datas_horarios.innerHTML += `

      <div class="opcao-dia">
            <div class="texto">
              Psicólogo(a): ${dados.itens[0].psicologo.nome}
              <p>Horario de começo da sessão: ${horas}:${minutos}</p>
            </div>
      <button onclick="Marcar(${dados.itens[0].id})" >Marcar consulta</button>
          </div>`;
      }
    } catch (error) {}
  }
}
async function Marcar(x) {
  const UpdateConsulta = {
    status: 1,
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
atualizarlista();
