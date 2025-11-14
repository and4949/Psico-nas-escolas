/*consults = document.querySelector(".consultas");
consults.innerHTML= ""
consults.innerHTML = `<div class="consulta">
<div class="titulo">
  <p>Quinta-feira, 10/02/2025 às 14:30</p>
</div>
<div class="info">
  <div class="icone">
    <img src="../assets/images/Local.svg" alt="" />
  </div>
  <p>Marli Maria de Souza</p>
</div>
<div class="info">
  <div class="icone">
    <img src="../assets/images/Paciente.svg" alt="" />
  </div>
  <p>André dos Santos</p>
</div>
</div>`;*/
async function procurarconsultas() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
    await fetch("https://hdd5d7-3000.csb.app",options)
}
