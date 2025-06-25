function cadastrarNewsletter(evento) {
  evento.preventDefault();

  const email = document.getElementById("email-footer").value;

  const novaMensagemRef = banco.ref("emails-newsletter").push();

  novaMensagemRef
    .set({
      email: email,
    })
    .then(() => {
      alert("E-mail cadastrado com sucesso!");
      document.getElementById("email-footer").value = "";
    })
    .catch((error) => {
      console.error("Erro ao cadastrar e-mail:", error);
      alert("Erro ao cadastrar e-mail. Veja o console para mais detalhes.");
    });
}
