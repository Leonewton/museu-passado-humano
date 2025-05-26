function verificarLogin() {
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;
  const mensagemErro = document.getElementById("erro");

  if (usuario === "Teste" && senha === "123") {
    localStorage.setItem("autenticado", "sim");
    localStorage.setItem("nomeUsuario", usuario);
    window.location.href = "perfil.html";
  } else {
    mensagemErro.style.display = "block";
  }
}
