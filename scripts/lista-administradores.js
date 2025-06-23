let administradores = JSON.parse(localStorage.getItem("administradores")) || [
  {
    nome: "Admin",
    email: "admin@teste.com",
    telefone: "(84) 9 9999-9991",
    senha: "123",
  },
];

function buscarAdministradorPorNome(nome) {
  return administradores.find((u) => u.nome === nome);
}

function autenticarAdmin(nome, senha) {
  const administrador = buscarAdministradorPorNome(nome);
  return administrador && administrador.senha === senha;
}

function salvarAdministradorAtual(nome) {
  localStorage.setItem("adminLogado", nome);
  localStorage.setItem("nomeAdmin", administrador);
}

function obterAdminLogado() {
  const nome = localStorage.getItem("adminLogado");
  return buscarAdministradorPorNome(nome);
}

function salvarAdministradoresNoLocalStorage() {
  localStorage.setItem("administradores", JSON.stringify(administradores));
}

function sair() {
  localStorage.removeItem("adminLogado");
}
