const usuario = obterUsuarioLogado();

if (!usuario) {
  window.location.href = "login.html";
}

document.getElementById("nomeUsuario").textContent = usuario.nome;

function sair() {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "login.html";
}

function mostrarFormulario() {
  document.getElementById("cardPerfil").style.display = "none";
  document.getElementById("formularioAgendamento").style.display = "block";
}

function salvarAgendamento(evento) {
  evento.preventDefault();

  const data = document.getElementById("dataAgendamento").value;
  const hora = document.getElementById("horaAgendamento").value;

  usuario.agendamentos.push({ data, hora });

  salvarUsuariosNoLocalStorage();
  alert("Agendamento cadastrado com sucesso!");

  document.getElementById("dataAgendamento").value = "";
  document.getElementById("horaAgendamento").value = "";
  document.getElementById("formularioAgendamento").style.display = "none";
}
