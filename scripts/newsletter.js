function cadastrarNewsletter(evento) {
  evento.preventDefault();

  alert("E-mail cadastrado com sucesso!");

  document.getElementById("email-footer").value = null;
}
