function enviarMensagem(evento) {
  evento.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const assunto = document.getElementById("assunto").value;
  const mensagem = document.getElementById("mensagem").value;

  const novaMensagemRef = banco.ref("mensagens").push();

  novaMensagemRef
    .set({
      nome: nome,
      email: email,
      assunto: assunto,
      mensagem: mensagem,
      dataEnvio: new Date().toISOString(),
      lida: false,
    })
    .then(() => {
      alert("Mensagem enviada com sucesso!");
      document.getElementById("nome").value = "";
      document.getElementById("email").value = "";
      document.getElementById("assunto").value = "";
      document.getElementById("mensagem").value = "";
    })
    .catch((error) => {
      console.error("Erro ao enviar mensagem:", error);
      alert("Erro ao enviar mensagem. Veja o console para mais detalhes.");
    });
}
