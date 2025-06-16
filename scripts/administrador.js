const seletorPainel = document.getElementById("painel-seletor");
const painelNoticias = document.getElementById("painel-noticias");
const painelExposicoes = document.getElementById("painel-exposicoes");

// Alternar painel exibido (Notícias cadastradas ou Mensagens)
seletorPainel.addEventListener("change", () => {
  if (seletorPainel.value === "noticias") {
    painelNoticias.style.display = "flex";
    painelExposicoes.style.display = "none";
    carregarPainelNoticias();
  } else {
    painelNoticias.style.display = "none";
    painelExposicoes.style.display = "block";
  }
});

// Função para carregar as notícias no painel
function carregarPainelNoticias() {
  painelNoticias.innerHTML = "<p>Carregando notícias...</p>";
  banco
    .ref("noticias")
    .once("value")
    .then((snapshot) => {
      painelNoticias.innerHTML = "";
      painelNoticias.style.display = "flex";
      painelNoticias.style.flexWrap = "wrap";
      painelNoticias.style.gap = "16px";

      snapshot.forEach((child) => {
        const noticia = child.val();
        const id = child.key;

        const card = document.createElement("div");
        card.className = "card shadow";
        card.style.width = "300px";
        card.style.height = "420px";
        card.style.flex = "0 0 auto";
        card.style.display = "flex";
        card.style.flexDirection = "column";
        card.style.justifyContent = "space-between";
        card.style.overflow = "hidden";

        card.innerHTML = `
            <img src="${noticia.capa}" class="card-img-top img-fluid" alt="${noticia.titulo}" 
                style="height: 180px; object-fit: cover;">

            <div class="card-body d-flex flex-column">
                <h5 class="card-title" style="
                    font-size: 1.1rem;
                    line-height: 1.3;
                    max-height: 2.6em; /* ~2 linhas */
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                ">${noticia.titulo}</h5>

                <p class="card-text text-muted" style="
                    font-size: 0.9rem;
                    line-height: 1.3;
                    max-height: 3.9em; /* ~3 linhas */
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                ">${noticia.descricao}</p>

                <div class="mt-auto d-flex justify-content-between">
                <button class="btn btn-sm btn-primary btn-editar">Editar</button>
                <button class="btn btn-sm btn-danger btn-excluir">Excluir</button>
                </div>
            </div>
            `;

        // Botão pra editar uma notícia
        card.querySelector(".btn-editar").addEventListener("click", () => {
          window.location.href = `criar-noticia.html?id=${id}`;
        });

        // Botão pra excluir uma notícia
        card.querySelector(".btn-excluir").addEventListener("click", () => {
          if (confirm(`Confirma a exclusão da notícia "${noticia.titulo}"?`)) {
            banco
              .ref(`noticias/${id}`)
              .remove()
              .then(() => {
                alert("Notícia excluída com sucesso!");
                carregarPainelNoticias();
              })
              .catch((err) => {
                console.error("Erro ao excluir notícia:", err);
                alert("Erro ao excluir notícia. Veja console.");
              });
          }
        });

        painelNoticias.appendChild(card);
      });

      if (!snapshot.exists()) {
        painelNoticias.innerHTML = "<p>Nenhuma notícia cadastrada.</p>";
      }
    })
    .catch((err) => {
      console.error("Erro ao carregar notícias:", err);
      painelNoticias.innerHTML = "<p>Erro ao carregar notícias.</p>";
    });
}

// Exibe o painel no carregamento
window.addEventListener("DOMContentLoaded", () => {
  if (seletorPainel.value === "noticias") {
    painelNoticias.style.display = "flex";
    painelExposicoes.style.display = "none";
    carregarPainelNoticias();
  } else {
    painelNoticias.style.display = "none";
    painelExposicoes.style.display = "block";
  }
});

// Painel de mensagens
const painelMensagens = document.createElement("div");
painelMensagens.id = "painel-mensagens";
painelMensagens.style.display = "none";
painelMensagens.innerHTML = `
  <h4>Mensagens não lidas</h4>
  <div id="mensagens-nao-lidas" class="d-flex flex-wrap gap-3 mb-5"></div>
  <h4>Mensagens lidas</h4>
  <div id="mensagens-lidas" class="d-flex flex-wrap gap-3"></div>
`;
document.querySelector("main").appendChild(painelMensagens);

seletorPainel.addEventListener("change", () => {
  if (seletorPainel.value === "noticias") {
    painelNoticias.style.display = "flex";
    painelMensagens.style.display = "none";
    carregarPainelNoticias();
  } else if (seletorPainel.value === "mensagens") {
    painelNoticias.style.display = "none";
    painelMensagens.style.display = "block";
    carregarPainelMensagens();
  }
});

function carregarPainelMensagens() {
  const containerNaoLidas = document.getElementById("mensagens-nao-lidas");
  const containerLidas = document.getElementById("mensagens-lidas");

  containerNaoLidas.innerHTML = "<p>Carregando...</p>";
  containerLidas.innerHTML = "";

  banco
    .ref("mensagens")
    .once("value")
    .then((snapshot) => {
      containerNaoLidas.innerHTML = "";
      containerLidas.innerHTML = "";

      snapshot.forEach((child) => {
        const msg = child.val();
        const id = child.key;

        const card = document.createElement("div");
        card.className = "card p-3 shadow position-relative";
        card.style.width = "280px";
        card.style.height = "240px";
        card.style.overflow = "hidden";
        card.style.cursor = "pointer";

        const data = new Date(msg.dataEnvio).toLocaleDateString();

        card.innerHTML = `
          <span style="position:absolute; bottom:10px; right:10px; font-size:0.8rem; color:#666">${data}</span>
          <h5 style="font-size:1rem; margin-bottom:4px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap">${
            msg.nome
          }</h5>
          <p style="font-size:0.85rem; margin-bottom:2px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap">${
            msg.email
          }</p>
          <strong style="font-size:0.9rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap">${
            msg.assunto
          }</strong>
          <p style="font-size:0.85rem; margin-top:4px; max-height:3em; overflow:hidden;">${
            msg.mensagem
          }</p>
          <button class="btn btn-sm ${
            msg.lida ? "btn-danger" : "btn-success"
          } mt-2">
            ${msg.lida ? "Marcar como não lida" : "Confirmar leitura"}
          </button>
        `;

        const btn = card.querySelector("button");

        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          if (msg.lida) {
            if (confirm("Deseja marcar esta mensagem como não lida?")) {
              banco.ref(`mensagens/${id}`).update({ lida: false });
              carregarPainelMensagens();
            }
          } else {
            banco.ref(`mensagens/${id}`).update({ lida: true });
            carregarPainelMensagens();
          }
        });

        // Modal clicável, que exibe as informações completas da mensagem
        card.addEventListener("click", () => {
          const modal = document.createElement("div");
          modal.style.position = "fixed";
          modal.style.top = 0;
          modal.style.left = 0;
          modal.style.width = "100%";
          modal.style.height = "100%";
          modal.style.background = "rgba(0,0,0,0.6)";
          modal.style.display = "flex";
          modal.style.justifyContent = "center";
          modal.style.alignItems = "center";
          modal.style.zIndex = 9999;

          modal.innerHTML = `
            <div class="bg-white p-4 rounded shadow" style="max-width:600px; width:90%; max-height:80vh; overflow:auto">
              <h4>${msg.assunto}</h4>
              <p><strong>De:</strong> ${msg.nome} (${msg.email})</p>
              <p><strong>Data:</strong> ${data}</p>
              <hr>
              <p>${msg.mensagem}</p>
              <div class="text-end">
                <button class="btn btn-secondary mt-3">Fechar</button>
              </div>
            </div>
          `;

          modal.querySelector("button").addEventListener("click", () => {
            modal.remove();
          });

          document.body.appendChild(modal);
        });

        if (msg.lida) {
          containerLidas.appendChild(card);
        } else {
          containerNaoLidas.appendChild(card);
        }
      });
    });
}
