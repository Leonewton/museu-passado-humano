import { criarPublicacao } from './publicacoes-services.js';

function adicionarParagrafo() {
  const container = document.getElementById("container-paragrafos");
  const novoParagrafo = document.createElement("textarea");
  novoParagrafo.className = "form-control mb-2 paragrafo";
  novoParagrafo.rows = 3;
  novoParagrafo.required = true;
  container.appendChild(novoParagrafo);
}

function removerParagrafo() {
  const container = document.getElementById("container-paragrafos");
  if (container.children.length > 1) {
    container.removeChild(container.lastElementChild);
  }
}

function adicionarImagem() {
  const container = document.getElementById("container-imagens");
  const novaImagem = document.createElement("input");
  novaImagem.type = "url";
  novaImagem.className = "form-control mb-2 imagem";
  novaImagem.required = true;
  container.appendChild(novaImagem);
}

function removerImagem() {
  const container = document.getElementById("container-imagens");
  if (container.children.length > 1) {
    container.removeChild(container.lastElementChild);
  }
}

document.getElementById("formulario-publicacao").addEventListener("submit", function (e) {
  e.preventDefault();

  const capa = document.getElementById("imagem-capa").value.trim();
  const titulo = document.getElementById("titulo-publicacao").value.trim();
  const descricao = document.getElementById("descricao-noticia").value.trim();

  const paragrafos = Array.from(document.querySelectorAll(".paragrafo"))
    .map((p) => p.value.trim())
    .filter((p) => p !== "");
  const imagens = Array.from(document.querySelectorAll(".imagem"))
    .map((img) => img.value.trim())
    .filter((i) => i !== "");

  if (paragrafos.length < 1 || imagens.length < 1) {
    alert("Adicione pelo menos 1 parágrafo e 1 imagem além da capa.");
    return;
  }

  const publicacao = {
    capa,
    titulo,
    descricao,
    paragrafos,
    imagens,
    data: new Date().toISOString(),
    tipo: "artigo"
  };

  criarPublicacao(publicacao)
    .then(() => {
      alert("Publicação cadastrada com sucesso!");
      e.target.reset();
      window.location.href = "publicacoes.html";
    })
    .catch((err) => {
      alert("Erro ao salvar publicação. Verifique o console.");
      console.error(err);
    });
});

window.adicionarParagrafo = adicionarParagrafo;
window.removerParagrafo = removerParagrafo;
window.adicionarImagem = adicionarImagem;
window.removerImagem = removerImagem;
