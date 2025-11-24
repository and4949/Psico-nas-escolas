fetch("https://hdd5d7-3000.csb.app/api/verificartoken", {
  headers: { Authenticate: "Bearer " + sessionStorage.getItem("token") },
}).then(function (res) {
  if (res.ok) console.log("sucesso");
  else window.location.href = "./index.html";
});
