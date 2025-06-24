const conteudo_menu = `
      <img src="imagens/perfil.jpg" alt="Foto de Perfil" />
      <nav class="nav flex-column">
        <a href="administrador.html" class="nav-link">Home</a>
        <a href="criar-noticia.html" class="nav-link">Criar notícia</a>
        <button onclick="sair()" class="btn btn-danger mt-3">Sair</button>
      </nav>
`;

const menu = document.getElementById("aside-administrador");

menu.innerHTML = conteudo_menu;
