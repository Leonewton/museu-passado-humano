const firebaseUrl =
  "https://noticias-museu-d198e-default-rtdb.firebaseio.com/noticias.json";

const urlParams = new URLSearchParams(window.location.search);
const noticiaId = urlParams.get("id");

fetch(firebaseUrl)
  .then((res) => res.json())
  .then((dados) => {
    const todasNoticias = Object.entries(dados);
    const noticiaAtual = todasNoticias.find(([id, n]) => id === noticiaId);

    if (!noticiaAtual) {
      document.body.innerHTML =
        '<h2 class="text-center">Notícia não encontrada.</h2>';
      return;
    }

    const [id, noticia] = noticiaAtual;
    document.title = noticia.titulo;
    document.getElementById("titulo-noticia").textContent = noticia.titulo;
    document.getElementById("descricao-noticia").textContent =
      noticia.descricao;

    // Carrossel de imagens
    if (noticia.imagens && noticia.imagens.length > 0) {
      const carrosselId = "carrosselImagens";
      const carouselInner = noticia.imagens
        .map(
          (url, index) => `
            <div class="carousel-item${index === 0 ? " active" : ""}">
              <img src="${url}" class="d-block w-100 imagem-carrossel" alt="Imagem ${
            index + 1
          }">
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

    if (noticia.paragrafos && noticia.paragrafos.length > 0) {
      document.getElementById("paragrafos").innerHTML = noticia.paragrafos
        .map((p) => `<p class="paragrafo">${p}</p>`)
        .join("");
    }

    const outras = todasNoticias.filter(([nid]) => nid !== noticiaId);
    const menuOutras = document.getElementById("outras-noticias");
    outras.forEach(([oid, o]) => {
      const link = document.createElement("a");
      link.href = `noticia-atual.html?id=${oid}`;
      link.textContent = o.titulo;
      menuOutras.appendChild(link);
    });
  })
  .catch((err) => {
    console.error("Erro ao carregar notícia:", err);
  });
