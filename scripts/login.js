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

function verificarLoginAdmin() {
  const administrador = document.getElementById("administrador").value;
  const senha = document.getElementById("senha-adm").value;
  const mensagemErro = document.getElementById("erro-adm");

  if (autenticarAdmin(administrador, senha)) {
    salvarAdministradorAtual(administrador);
    window.location.href = "administrador.html";
  } else {
    mensagemErro.style.display = "block";
  }
}
