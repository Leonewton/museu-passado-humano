const usuario = obterUsuarioLogado();

if (!usuario) {
  window.location.href = "login.html";
}

const lista = document.getElementById("listaAgendamentos");

function renderizarAgendamentos() {
  lista.innerHTML = "";

  if (usuario.agendamentos.length === 0) {
    lista.innerHTML = "<p>Nenhum agendamento cadastrado.</p>";
    return;
  }

  usuario.agendamentos.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "col-md-4";

    card.innerHTML = `
          <div class="card sombra-grande">
            <div class="card-body">
              <h5 class="card-title">Agendamento ${index + 1}</h5>
              <p class="card-text"><strong>Data:</strong> ${item.data}</p>
              <p class="card-text"><strong>Hora:</strong> ${item.hora}</p>
              <button class="btn btn-danger btn-sm" onclick="cancelarAgendamento(${index})">Cancelar</button>
            </div>
          </div>`;
    lista.appendChild(card);
  });
}

function cancelarAgendamento(index) {
  if (confirm("Deseja cancelar este agendamento?")) {
    usuario.agendamentos.splice(index, 1);
    salvarUsuariosNoLocalStorage();
    renderizarAgendamentos();
  }
}

renderizarAgendamentos();
