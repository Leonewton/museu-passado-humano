import { buscarPublicacaoPorId, atualizarPublicacao, criarPublicacao } from './publicacoes-services.js';

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


const params = new URLSearchParams(window.location.search);
const idPublicacao = params.get('id');


if (idPublicacao) {
  buscarPublicacaoPorId(idPublicacao)
    .then(pub => {
      if (!pub) {
        alert("Publicação não encontrada.");
        window.location.href = "administrador.html";
        return;
      }

      document.getElementById("imagem-capa").value = pub.capa;
      document.getElementById("titulo-publicacao").value = pub.titulo;
      document.getElementById("descricao-noticia").value = pub.descricao;


      const containerParagrafos = document.getElementById("container-paragrafos");
      containerParagrafos.innerHTML = "";
      pub.paragrafos.forEach((texto) => {
        const textarea = document.createElement("textarea");
        textarea.className = "form-control mb-2 paragrafo";
        textarea.rows = 3;
        textarea.required = true;
        textarea.value = texto;
        containerParagrafos.appendChild(textarea);
      });

      const containerImagens = document.getElementById("container-imagens");
      containerImagens.innerHTML = "";
      pub.imagens.forEach((url) => {
        const input = document.createElement("input");
        input.type = "url";
        input.className = "form-control mb-2 imagem";
        input.required = true;
        input.value = url;
        containerImagens.appendChild(input);
      });

      document.querySelector('button[type="submit"]').textContent = "Salvar alterações";
    })
    .catch(err => {
      alert("Erro ao carregar publicação para edição.");
      console.error(err);
    });
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

  const publicacaoAtualizada = {
    capa,
    titulo,
    descricao,
    paragrafos,
    imagens,
    data: new Date().toISOString(),
    tipo: "artigo"
  };

  if (idPublicacao) {
    atualizarPublicacao(idPublicacao, publicacaoAtualizada)
      .then(() => {
        alert("Publicação atualizada com sucesso!");
        window.location.href = "administrador.html";
      })
      .catch((err) => {
        alert("Erro ao atualizar publicação. Verifique o console.");
        console.error(err);
      });
  } else {
    criarPublicacao(publicacaoAtualizada)
      .then(() => {
        alert("Publicação cadastrada com sucesso!");
        e.target.reset();
      })
      .catch((err) => {
        alert("Erro ao salvar publicação. Verifique o console.");
        console.error(err);
      });
  }
});

window.adicionarParagrafo = adicionarParagrafo;
window.removerParagrafo = removerParagrafo;
window.adicionarImagem = adicionarImagem;
window.removerImagem = removerImagem;
