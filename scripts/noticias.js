// Array de notícias
const noticias = [
    {
        titulo: "Tendências tecnológicas para a indústria em 2025",
        descricao: "Veja as principais tendências da indústria para os próximos anos.",
        data: "2025-05-23",
        imagem: "imagens/tendencias-para-industria-2025.webp",
        link: "#",
        atualizacao: "3 dias atrás"
    },
    {
        titulo: "Inteligência Artificial transforma o cotidiano em 2025",
        descricao: "Principais mudanças causadas pela IA no nosso dia a dia.",
        data: "2025-05-07",
        imagem: "imagens/inteligencia-artificial.avif",
        link: "#",
        atualizacao: "10 dias atrás"
    },
    {
        titulo: "Computação quântica e sustentabilidade: os próximos passos da Era Digital",
        descricao: "Conheça mais sobre essas duas áreas e veja como elas, juntas, podem mudar a Era da Informação.",
        data: "2025-04-15",
        imagem: "imagens/computacao-quantica.jpg",
        link: "#",
        atualizacao: "1 mês atrás"
    },
    {
        titulo: "Novas descobertas arqueológicas em Luxor",
        descricao: "Veja como essas descobertas aprofundaram o conhecimento sobre o Egito Antigo",
        data: "2025-04-09",
        imagem: "imagens/egito-antigo.jpg",
        link: "#",
        atualizacao: "1 mês atrás"
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

