if (localStorage.getItem("autenticado") !== "sim") {
  window.location.href = "login.html";
} else {
  document.getElementById("nomeUsuario").textContent =
    localStorage.getItem("nomeUsuario");
}

const lista = document.getElementById("listaAgendamentos");
const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

function renderizarAgendamentos() {
  lista.innerHTML = "";

  if (agendamentos.length === 0) {
    lista.innerHTML = "<p>Nenhum agendamento cadastrado.</p>";
    return;
  }

  agendamentos.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "col-md-4";

    card.innerHTML = `
          <div class="card sombra-grande">
            <div class="card-body">
              <h5 class="card-title">Agendamento ${index + 1}</h5>
              <p class="card-text"><strong>Data:</strong> ${item.data}</p>
              <p class="card-text"><strong>Hora:</strong> ${item.hora}</p>
              <button class="btn btn-danger btn-sm" onclick="cancelarAgendamento(${index})">Cancelar agendamento</button>
            </div>
          </div>`;
    lista.appendChild(card);
  });
}

function cancelarAgendamento(index) {
  if (confirm("Tem certeza que deseja cancelar este agendamento?")) {
    agendamentos.splice(index, 1);
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
    renderizarAgendamentos();
  }
}

renderizarAgendamentos();
