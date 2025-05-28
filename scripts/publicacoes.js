// Array de notícias
const noticias = [
    {
        titulo: "Nosso novo portal de notícias",
        descricao: "Notícias: confira a nova página do Museu Passado Humano.",
        data: "2025-03-05",
        imagem: "imagens/noticias.jpg",
        link: "noticias.html",
        atualizacao: "2 meses atrás"
    },
    {
        titulo: "Civilizações Antigas",
        descricao: "Confira a nossa nova exposição.",
        data: "2025-04-11",
        imagem: "imagens/egito-capa.jpg",
        link: "civilizacoes-antigas.html",
        atualizacao: "1 mês atrás"
    },
    {
        titulo: "Revolução Industrial",
        descricao: "Confira a nossa nova exposição.",
        data: "2025-03-21",
        imagem: "imagens/capa1.webp",
        link: "revolucao-industrial.html",
        atualizacao: "2 meses atrás"
    },
    {
        titulo: "Era Digital",
        descricao: "Confira a nossa nova exposição.",
        data: "2025-05-12",
        imagem: "imagens/era-digital.jpg",
        link: "era-digital.html",
        atualizacao: "20 dias atrás"
    },
];

// Funções
function renderNoticias(lista) {
    const container = document.getElementById('noticias-lista');
    container.innerHTML = '';

    lista.forEach(noticia => {
        container.innerHTML += `
        <div class="card mb-3" style="position: relative;">
          <a href="${noticia.link}" class="stretched-link"></a>
          <div class="row g-0">
            <div class="col-md-3 d-flex align-items-stretch">
              <img src="${noticia.imagem}" class="card-img-noticia img-fluid rounded-start" alt="${noticia.titulo}">
            </div>
            <div class="col-md-9">
              <div class="card-body">
                <h5 class="card-title">${noticia.titulo}</h5>
                <p class="descricao card-text">${noticia.descricao}</p>
                <p class="data card-text"><small class="text-body-secondary">Publicado em: ${noticia.data.split('-').reverse().join('/')}</small></p>
                <p class="card-text"><small class="text-body-secondary">Última atualização: ${noticia.atualizacao}</small></p>
              </div>
            </div>
          </div>
        </div>
      `;
    });
}

function filtrarNoticias() {
    let texto = document.getElementById('busca-noticia').value.toLowerCase();
    let ordemData = document.getElementById('ordem-data').value;
    let ordemAZ = document.getElementById('ordem-az').value;

    let filtradas = noticias.filter(n =>
        n.titulo.toLowerCase().includes(texto) ||
        n.descricao.toLowerCase().includes(texto)
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


    renderNoticias(filtradas);
}

document.getElementById('busca-noticia').addEventListener('input', filtrarNoticias);
document.getElementById('ordem-data').addEventListener('change', filtrarNoticias);
document.getElementById('ordem-az').addEventListener('change', filtrarNoticias);
document.getElementById('clear-search').addEventListener('click', function () {
    document.getElementById('busca-noticia').value = '';
    filtrarNoticias();
});

// Eventos
window.onload = filtrarNoticias;

const ordemData = document.getElementById('ordem-data');
const ordemAZ = document.getElementById('ordem-az');

ordemData.addEventListener('change', function () {
    if (this.value !== "") {
        ordemAZ.disabled = true;
    } else {
        ordemAZ.disabled = false;
    }
    filtrarNoticias();
});


ordemAZ.addEventListener('change', function () {
    if (this.value !== "") {
        ordemData.disabled = true;
    } else {
        ordemData.disabled = false;
    }
    filtrarNoticias();
});

