const firebaseUrl = "https://noticias-museu-d198e-default-rtdb.firebaseio.com/administradores.json";

let administradores = [];

async function carregarAdministradores() {
  try {
    const resposta = await fetch(firebaseUrl);
    const dados = await resposta.json();
    administradores = Object.values(dados || {});
  } catch (erro) {
    console.error("Erro ao buscar administradores:", erro);
  }
}

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

carregarAdministradores();

