function verificarLogin() {
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;
  const mensagemErro = document.getElementById("erro");

  if (autenticarUsuario(usuario, senha)) {
    salvarUsuarioAtual(usuario);
    window.location.href = "perfil.html";
  } else {
    mensagemErro.style.display = "block";
  }
}
