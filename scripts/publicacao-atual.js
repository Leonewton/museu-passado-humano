import { buscarPublicacaoPorId } from './publicacoes-services.js';

const urlParams = new URLSearchParams(window.location.search);
const publicacaoId = urlParams.get("id");

if (publicacaoId) {
  buscarPublicacaoPorId(publicacaoId)
    .then(publicacao => {
      if (!publicacao) {
        document.body.innerHTML = '<h2 class="text-center">Publicação não encontrada.</h2>';
        return;
      }
      document.title = publicacao.titulo;
      document.getElementById("titulo-publicacao").textContent = publicacao.titulo;
      document.getElementById("descricao-publicacao").textContent = publicacao.descricao;

      if (publicacao.imagens && publicacao.imagens.length > 0) {
        const carrosselId = "carrosselImagens";
        const carouselInner = publicacao.imagens
          .map(
            (url, index) => `
              <div class="carousel-item${index === 0 ? " active" : ""}">
                <img src="${url}" class="d-block w-100 imagem-carrossel" alt="Imagem ${index + 1}">
              </div>
            `
          )
          .join("");

        document.getElementById("carrossel-fotos").innerHTML = `
          <div id="${carrosselId}" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              ${carouselInner}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#${carrosselId}" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Anterior</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#${carrosselId}" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Próximo</span>
            </button>
          </div>
        `;
      }

      if (publicacao.paragrafos && publicacao.paragrafos.length > 0) {
        document.getElementById("paragrafos").innerHTML = publicacao.paragrafos
          .map((p) => `<p class="paragrafo">${p}</p>`)
          .join("");
      }
    })
    .catch((err) => {
      console.error("Erro ao carregar publicação:", err);
      document.body.innerHTML = '<h2 class="text-center">Erro ao carregar publicação.</h2>';
    });
} else {
  document.body.innerHTML = '<h2 class="text-center">Publicação não encontrada.</h2>';
}