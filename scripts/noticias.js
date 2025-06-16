let noticias = [];

function carregarNoticiasFirebase() {
  banco
    .ref("noticias")
    .once("value")
    .then((snapshot) => {
      noticias = [];

      snapshot.forEach((childSnapshot) => {
        const noticia = childSnapshot.val();

        // Convertendo a data para o formato dd/mm/aaaa
        const dataOriginal = new Date(noticia.data);
        const dataFormatada = dataOriginal.toLocaleDateString("pt-BR");
        const diasAtras = calcularTempoAtras(dataOriginal);

        noticias.push({
          id: childSnapshot.key,
          titulo: noticia.titulo,
          descricao: noticia.descricao,
          dataOriginal: dataOriginal,
          dataFormatada: dataFormatada,
          imagem: noticia.capa,
          atualizacao: diasAtras,
        });
      });

      filtrarNoticias();
    })
    .catch((error) => {
      console.error("Erro ao carregar notícias do Firebase:", error);
    });
}

function calcularTempoAtras(data) {
  const hoje = new Date();
  const diff = Math.floor((hoje - data) / (1000 * 60 * 60 * 24));

  if (diff === 0) return "Hoje";
  if (diff === 1) return "Ontem";
  if (diff < 30) return `${diff} dias atrás`;
  if (diff < 60) return "1 mês atrás";
  return `${Math.floor(diff / 30)} meses atrás`;
}

function renderNoticias(lista) {
  const container = document.getElementById("noticias-lista");
  container.innerHTML = "";

  lista.forEach((noticia) => {
    container.innerHTML += `
        <div class="card mb-3" style="position: relative;">
          <a href="noticia-atual.html?id=${noticia.id}" class="stretched-link"></a>
          <div class="row g-0">
            <div class="col-md-3 d-flex align-items-stretch">
              <img src="${noticia.imagem}" class="card-img-noticia img-fluid rounded-start" alt="${noticia.titulo}">
            </div>
            <div class="col-md-9">
              <div class="card-body">
                <h5 class="card-title">${noticia.titulo}</h5>
                <p class="descricao card-text">${noticia.descricao}</p>
                <p class="data card-text"><small class="text-body-secondary">Publicado em: ${noticia.dataFormatada}</small></p>
                <p class="card-text"><small class="text-body-secondary">Última atualização: ${noticia.atualizacao}</small></p>
              </div>
            </div>
          </div>
        </div>
      `;
  });
}

function filtrarNoticias() {
  let texto = document.getElementById("busca-noticia").value.toLowerCase();
  let ordemData = document.getElementById("ordem-data").value;
  let ordemAZ = document.getElementById("ordem-az").value;

  let filtradas = noticias.filter(
    (n) =>
      n.titulo.toLowerCase().includes(texto) ||
      n.descricao.toLowerCase().includes(texto)
  );

  if (ordemData !== "") {
    filtradas.sort((a, b) => {
      if (ordemData === "recente") {
        return b.dataOriginal - a.dataOriginal;
      } else {
        return a.dataOriginal - b.dataOriginal;
      }
    });
  }

  if (ordemAZ !== "") {
    if (ordemAZ === "az") {
      filtradas.sort((a, b) => a.titulo.localeCompare(b.titulo));
    } else {
      filtradas.sort((a, b) => b.titulo.localeCompare(a.titulo));
    }
  }

  renderNoticias(filtradas);
}

document
  .getElementById("busca-noticia")
  .addEventListener("input", filtrarNoticias);
document
  .getElementById("ordem-data")
  .addEventListener("change", filtrarNoticias);
document.getElementById("ordem-az").addEventListener("change", filtrarNoticias);
document.getElementById("clear-search").addEventListener("click", function () {
  document.getElementById("busca-noticia").value = "";
  filtrarNoticias();
});

window.onload = carregarNoticiasFirebase;

const ordemData = document.getElementById("ordem-data");
const ordemAZ = document.getElementById("ordem-az");

ordemData.addEventListener("change", function () {
  if (this.value !== "") {
    ordemAZ.disabled = true;
  } else {
    ordemAZ.disabled = false;
  }
  filtrarNoticias();
});

ordemAZ.addEventListener("change", function () {
  if (this.value !== "") {
    ordemData.disabled = true;
  } else {
    ordemData.disabled = false;
  }
  filtrarNoticias();
});
