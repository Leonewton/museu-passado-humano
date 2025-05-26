if (localStorage.getItem("autenticado") !== "sim") {
  window.location.href = "login.html";
} else {
  document.getElementById("nomeUsuario").textContent =
    localStorage.getItem("nomeUsuario");
}

function sair() {
  localStorage.removeItem("autenticado");
  localStorage.removeItem("nomeUsuario");
  window.location.href = "login.html";
}

function mostrarFormulario() {
  document.getElementById("cardPerfil").style.display = "none";
  document.getElementById("dataAgendamento").value = 0;
  document.getElementById("horaAgendamento").value = 0;

  document.getElementById("formularioAgendamento").style.display = "block";
}

function salvarAgendamento(evento) {
  evento.preventDefault();

  const data = document.getElementById("dataAgendamento").value;
  const hora = document.getElementById("horaAgendamento").value;

  const agendamento = { data, hora };

  let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
  agendamentos.push(agendamento);

  localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

  alert("Agendamento cadastrado com sucesso!");

  document.getElementById("formularioAgendamento").style.display = "none";
}
