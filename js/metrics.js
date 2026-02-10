// ATUALIZA MÉTRICAS DO DASHBOARD
export function atualizarMetricas() {
  const linhas = document.querySelectorAll(".email-table-body tr");

  const total = linhas.length;

  const produtivos = document.querySelectorAll(".email-status-productive").length;

  const improdutivos = document.querySelectorAll(".email-status-unproductive").length;

  let porcentagem = 0;

  if (total > 0) {
    porcentagem = Math.round((produtivos / total) * 100);
  }

  const totalEl = document.querySelector(".number-email-total");

// MÉTRICAS DOS FILTROS
  const totalFilter = document.querySelector(".totFilter");
  const prodFilter = document.querySelector(".prodFilter");
  const unprodFilter = document.querySelector(".unprodFilter");

// MÉTRICAS DOS CARDS INICIAIS
  const prodEl = document.querySelector(".number-productive");
  const unprodEl = document.querySelector(".number-unproductive");
  const perfEl = document.querySelector(".number-performance");

// ALTERA OS NÚMEROS
  totalEl.textContent = total;
  totalFilter.textContent = total;
  prodFilter.textContent = produtivos;
  unprodFilter.textContent = improdutivos;
  prodEl.textContent = produtivos;
  unprodEl.textContent = improdutivos;
  perfEl.textContent = porcentagem + "%";
}