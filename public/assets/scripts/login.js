const form = document.querySelector("form");
form.addEventListener("submit", async function (event) {
  event.preventDefault();
});

function pegar_infos() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  console.log(email, senha);
}
