window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const idNoticia = params.get("id");

  if (idNoticia) {
    // Busca a notícia no Firebase pelo ID
    banco
      .ref(`noticias/${idNoticia}`)
      .once("value")
      .then((snapshot) => {
        const noticia = snapshot.val();
        if (noticia) {
          // Preencher campos
          document.getElementById("imagem-capa").value = noticia.capa;
          document.getElementById("titulo-noticia").value = noticia.titulo;
          document.getElementById("descricao-noticia").value =
            noticia.descricao;

          // Limpar e preencher os paragrafos
          const containerParagrafos = document.getElementById(
            "container-paragrafos"
          );
          containerParagrafos.innerHTML = "";
          noticia.paragrafos.forEach((texto) => {
            const textarea = document.createElement("textarea");
            textarea.className = "form-control mb-2 paragrafo";
            textarea.rows = 3;
            textarea.required = true;
            textarea.value = texto;
            containerParagrafos.appendChild(textarea);
          });

          // Limpar e preencher as imagens
          const containerImagens = document.getElementById("container-imagens");
          containerImagens.innerHTML = "";
          noticia.imagens.forEach((url) => {
            const input = document.createElement("input");
            input.type = "url";
            input.className = "form-control mb-2 imagem";
            input.required = true;
            input.value = url;
            containerImagens.appendChild(input);
          });

          // Alterar comportamento do form para atualizar ao enviar
          const form = document.getElementById("formulario-noticia");
          form.dataset.editando = idNoticia;

          // Mudar texto do botão submit (Quando o administrador edita uma notícia)
          const botaoSubmit = form.querySelector('button[type="submit"]');
          if (botaoSubmit) botaoSubmit.textContent = "Atualizar Notícia";
        } else {
          alert("Notícia não encontrada.");
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar notícia para edição:", error);
        alert("Erro ao carregar notícia.");
      });
  }
};

// Função para adicionar parágrafos durante a criação de uma notícia
function adicionarParagrafo() {
  const container = document.getElementById("container-paragrafos");
  const novoParagrafo = document.createElement("textarea");
  novoParagrafo.className = "form-control mb-2 paragrafo";
  novoParagrafo.rows = 3;
  novoParagrafo.required = true;
  container.appendChild(novoParagrafo);
}

// Função para remover último parágrafo adicionado
function removerParagrafo() {
  const container = document.getElementById("container-paragrafos");
  if (container.children.length > 1) {
    container.removeChild(container.lastElementChild);
  }
}

// Função para adicionar imagens durante a criação de uma notícia
function adicionarImagem() {
  const container = document.getElementById("container-imagens");
  const novaImagem = document.createElement("input");
  novaImagem.type = "url";
  novaImagem.className = "form-control mb-2 imagem";
  novaImagem.required = true;
  container.appendChild(novaImagem);
}

// Função para remover última imagem adicionada
function removerImagem() {
  const container = document.getElementById("container-imagens");
  if (container.children.length > 1) {
    container.removeChild(container.lastElementChild);
  }
}

document
  .getElementById("formulario-noticia")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const imagemCapa = document.getElementById("imagem-capa").value;
    const titulo = document.getElementById("titulo-noticia").value;
    const descricao = document.getElementById("descricao-noticia").value;

    const paragrafos = Array.from(document.querySelectorAll(".paragrafo"))
      .map((p) => p.value.trim())
      .filter((p) => p !== "");
    const imagens = Array.from(document.querySelectorAll(".imagem"))
      .map((img) => img.value.trim())
      .filter((i) => i !== "");

    if (paragrafos.length < 1 || imagens.length < 1) {
      alert(
        "Você deve adicionar pelo menos 1 parágrafo e 1 imagem além da capa."
      );
      return;
    }

    const noticiaAtualizada = {
      capa: imagemCapa,
      titulo: titulo,
      descricao: descricao,
      paragrafos: paragrafos,
      imagens: imagens,
      data: new Date().toISOString(),
    };

    const form = e.target;
    const idEditando = form.dataset.editando;

    if (idEditando) {
      // Atualizar notícia existente
      banco
        .ref(`noticias/${idEditando}`)
        .set(noticiaAtualizada)
        .then(() => {
          alert("Notícia atualizada com sucesso!");
          window.location.href = "administrador.html";
        })
        .catch((error) => {
          console.error("Erro ao atualizar notícia:", error);
          alert("Erro ao atualizar notícia.");
        });
    } else {
      // Criar nova notícia
      const novaReferencia = banco.ref("noticias").push();
      novaReferencia
        .set(noticiaAtualizada)
        .then(() => {
          alert("Notícia cadastrada com sucesso!");
          form.reset();
        })
        .catch((error) => {
          console.error("Erro ao salvar notícia:", error);
          alert("Erro ao salvar a notícia. Verifique o console.");
        });
    }
  });

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const noticiaId = getQueryParam("id");

if (noticiaId) {
  // Buscar notícia e preencher formulário para editar
  banco
    .ref("noticias/" + noticiaId)
    .once("value")
    .then((snapshot) => {
      const noticia = snapshot.val();
      if (!noticia) {
        alert("Notícia não encontrada para edição.");
        return;
      }

      document.getElementById("imagem-capa").value = noticia.capa || "";
      document.getElementById("titulo-noticia").value = noticia.titulo || "";
      document.getElementById("descricao-noticia").value =
        noticia.descricao || "";

      // Preencher parágrafos
      const containerParagrafos = document.getElementById(
        "container-paragrafos"
      );
      containerParagrafos.innerHTML = "";
      noticia.paragrafos.forEach((texto) => {
        const textarea = document.createElement("textarea");
        textarea.className = "form-control mb-2 paragrafo";
        textarea.rows = 3;
        textarea.required = true;
        textarea.value = texto;
        containerParagrafos.appendChild(textarea);
      });

      // Preencher imagens
      const containerImagens = document.getElementById("container-imagens");
      containerImagens.innerHTML = "";
      noticia.imagens.forEach((url) => {
        const input = document.createElement("input");
        input.type = "url";
        input.className = "form-control mb-2 imagem";
        input.required = true;
        input.value = url;
        containerImagens.appendChild(input);
      });
    })
    .catch((err) => {
      console.error("Erro ao carregar notícia para edição:", err);
      alert("Erro ao carregar notícia para edição.");
    });
}
