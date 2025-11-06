const form = document.querySelector("form");
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  console.log(email, senha);

  fetch("https://2mkvsd-3000.csb.app/", {
    method: "get",
    
  });
});
