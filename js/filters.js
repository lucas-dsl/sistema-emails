// FILTROS DA LISTA DE EMAILS
export default function initFilters() {

  const btnAll = document.querySelector(".filter-all");
  const btnProd = document.querySelector(".filter-productive");
  const btnUnprod = document.querySelector(".filter-unproductive");

  const allFilters = document.querySelectorAll(".filter");

  function setActive(button) {
    allFilters.forEach(btn => btn.classList.remove("filter-active"));
    button.classList.add("filter-active");
  }

  function filtrar(tipo) {

    const linhas = document.querySelectorAll(".email-table-body tr");

    linhas.forEach(linha => {

      const status = linha.querySelector(".email-status");

      if (tipo === "all") {
        linha.style.display = "";
      }

      else if (tipo === "productive") {
        linha.style.display =
          status.classList.contains("email-status-productive")
            ? ""
            : "none";
      }

      else if (tipo === "unproductive") {
        linha.style.display =
          status.classList.contains("email-status-unproductive")
            ? ""
            : "none";
      }

    });
  }

  btnAll.addEventListener("click", () => {
    setActive(btnAll);
    filtrar("all");
  });

  btnProd.addEventListener("click", () => {
    setActive(btnProd);
    filtrar("productive");
  });

  btnUnprod.addEventListener("click", () => {
    setActive(btnUnprod);
    filtrar("unproductive");
  });

}