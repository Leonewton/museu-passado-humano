if (!obterUsuarioLogado()) {
  window.location.href = "login.html";
}

let usuario = obterUsuarioLogado();
let dadosOriginais = { ...usuario };

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("nome").value = usuario.nome;
  document.getElementById("email").value = usuario.email;
  document.getElementById("telefone").value = usuario.telefone;
  document.getElementById("senha").value = usuario.senha;
});

function habilitarEdicao() {
  document.querySelectorAll("#formDadosUsuario input").forEach((input) => {
    input.removeAttribute("readonly");
  });
  document.getElementById("btnEditar").style.display = "none";
  document.getElementById("btnSalvar").style.display = "inline-block";
  document.getElementById("btnCancelar").style.display = "inline-block";
}

function cancelarEdicao() {
  document.getElementById("nome").value = dadosOriginais.nome;
  document.getElementById("email").value = dadosOriginais.email;
  document.getElementById("telefone").value = dadosOriginais.telefone;
  document.getElementById("senha").value = dadosOriginais.senha;

  document.querySelectorAll("#formDadosUsuario input").forEach((input) => {
    input.setAttribute("readonly", true);
  });

  document.getElementById("btnEditar").style.display = "inline-block";
  document.getElementById("btnSalvar").style.display = "none";
  document.getElementById("btnCancelar").style.display = "none";
}

function salvarEdicao() {
  usuario.nome = document.getElementById("nome").value;
  usuario.email = document.getElementById("email").value;
  usuario.telefone = document.getElementById("telefone").value;
  usuario.senha = document.getElementById("senha").value;

  dadosOriginais = { ...usuario };

  salvarUsuariosNoLocalStorage();

  document.querySelectorAll("#formDadosUsuario input").forEach((input) => {
    input.setAttribute("readonly", true);
  });

  document.getElementById("btnEditar").style.display = "inline-block";
  document.getElementById("btnSalvar").style.display = "none";
  document.getElementById("btnCancelar").style.display = "none";
}
