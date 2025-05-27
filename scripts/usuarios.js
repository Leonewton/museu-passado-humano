let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [
  {
    nome: "Teste",
    email: "teste@teste.com",
    telefone: "(84) 9 9845-5678",
    senha: "123",
    agendamentos: [{ data: "2025-05-01", hora: "10:00" }],
  },
];

function buscarUsuarioPorNome(nome) {
  return usuarios.find((u) => u.nome === nome);
}

function autenticarUsuario(nome, senha) {
  const usuario = buscarUsuarioPorNome(nome);
  return usuario && usuario.senha === senha;
}

function salvarUsuarioAtual(nome) {
  localStorage.setItem("usuarioLogado", nome);
  localStorage.setItem("nomeUsuario", usuario);
}

function obterUsuarioLogado() {
  const nome = localStorage.getItem("usuarioLogado");
  return buscarUsuarioPorNome(nome);
}

function salvarUsuariosNoLocalStorage() {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));


}

function sair() {
  localStorage.removeItem("usuarioLogado");
}
