import { listarPublicacoes } from './publicacoes-services.js';

let publicacoes = [];

function carregarPublicacoesFirebase() {
  listarPublicacoes()
    .then((dados) => {
      publicacoes = dados.map(pub => ({
        ...pub,
        dataFormatada: new Date(pub.data).toLocaleDateString("pt-BR"),
        atualizacao: calcularTempoAtras(pub.data),
      }));
      filtrarPublicacoes();
    })
    .catch((error) => {
      console.error("Erro ao carregar publicações do Firebase:", error);
    });
}

function calcularTempoAtras(dataISO) {
  const data = new Date(dataISO);
  const hoje = new Date();
  const diff = Math.floor((hoje - data) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "Hoje";
  if (diff === 1) return "Ontem";
  if (diff < 30) return `${diff} dias atrás`;
  if (diff < 60) return "1 mês atrás";
  return `${Math.floor(diff / 30)} meses atrás`;
}

function renderPublicacoes(lista) {
  const container = document.getElementById('publicacoes-lista');
  container.innerHTML = '';

  lista.forEach(pub => {
    container.innerHTML += `
      <div class="card mb-3" style="position: relative;">
        <a href="publicacao-atual.html?id=${pub.id}" class="stretched-link"></a>
        <div class="row g-0">
          <div class="col-md-3 d-flex align-items-stretch">
            <img src="${pub.capa}" class="card-img-publicacao img-fluid rounded-start" alt="${pub.titulo}">
          </div>
          <div class="col-md-9">
            <div class="card-body">
              <h5 class="card-title">${pub.titulo}</h5>
              <p class="descricao card-text">${pub.descricao}</p>
              <p class="data card-text"><small class="text-body-secondary">Publicado em: ${pub.dataFormatada}</small></p>
              <p class="card-text"><small class="text-body-secondary">Última atualização: ${pub.atualizacao}</small></p>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

function filtrarPublicacoes() {
  let texto = document.getElementById('busca-publicacao').value.toLowerCase();
  let ordemData = document.getElementById('ordem-data').value;
  let ordemAZ = document.getElementById('ordem-az').value;

  let filtradas = publicacoes.filter(p =>
    p.titulo.toLowerCase().includes(texto) ||
    p.descricao.toLowerCase().includes(texto)
  );

  if (ordemData !== "") {
    filtradas.sort((a, b) => {
      if (ordemData === 'recente') {
        return new Date(b.data) - new Date(a.data);
      } else {
        return new Date(a.data) - new Date(b.data);
      }
    });
  }

  if (ordemAZ !== "") {
    if (ordemAZ === 'az') {
      filtradas.sort((a, b) => a.titulo.localeCompare(b.titulo));
    } else {
      filtradas.sort((a, b) => b.titulo.localeCompare(a.titulo));
    }
  }

  renderPublicacoes(filtradas);
}

// Eventos
document.getElementById('busca-publicacao').addEventListener('input', filtrarPublicacoes);
document.getElementById('ordem-data').addEventListener('change', filtrarPublicacoes);
document.getElementById('ordem-az').addEventListener('change', filtrarPublicacoes);
document.getElementById('clear-search').addEventListener('click', function () {
  document.getElementById('busca-publicacao').value = '';
  filtrarPublicacoes();
});

window.onload = carregarPublicacoesFirebase;

const ordemData = document.getElementById('ordem-data');
const ordemAZ = document.getElementById('ordem-az');

ordemData.addEventListener('change', function () {
  if (this.value !== "") {
    ordemAZ.disabled = true;
  } else {
    ordemAZ.disabled = false;
  }
  filtrarPublicacoes();
});

ordemAZ.addEventListener('change', function () {
  if (this.value !== "") {
    ordemData.disabled = true;
  } else {
    ordemData.disabled = false;
  }
  filtrarPublicacoes();
});
