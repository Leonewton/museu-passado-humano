function enviarMensagem(evento) {
  evento.preventDefault();

  alert("Mensagem enviada com sucesso!");

  document.getElementById("nome").value = null;
  document.getElementById("email").value = null;
  document.getElementById("assunto").value = null;
  document.getElementById("mensagem").value = null;
}
