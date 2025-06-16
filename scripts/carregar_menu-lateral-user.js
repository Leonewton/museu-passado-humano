const conteudo_menu = `
    <img src="imagens/perfil.jpg" alt="Foto de Perfil" />
    <nav class="nav flex-column">
        <a href="dados.html" class="nav-link">Meus dados</a>
        <a href="agendamentos.html" class="nav-link">Meus agendamentos</a>
        <button onclick="sair()" class="btn btn-danger mt-3">Sair</button>
    </nav>
`;

const menu = document.getElementById("aside-user");

menu.innerHTML = conteudo_menu;
