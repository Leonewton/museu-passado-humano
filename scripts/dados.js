if (localStorage.getItem("autenticado") !== "sim") {
  window.location.href = "login.html";
} else {
  document.getElementById("nomeUsuario").textContent =
    localStorage.getItem("nomeUsuario");
}

