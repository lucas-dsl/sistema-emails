// GERA DATA ATUAL
function gerarDataAtual() {
  const d = new Date();

  const dia = String(d.getDate()).padStart(2, "0");
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const hora = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");

  return `${dia}-${mes} ${hora}:${min}`;
}


// DEFINE STATUS
function mapearStatus(statusBackend) {
  if (statusBackend === "productive") {
    return {
      classe: "email-status-productive",
      texto: "Produtivo",
      icone: "imgs/dashboard-metrics/icone-produtivo.png"
    };
  }

  return {
    classe: "email-status-unproductive",
    texto: "Improdutivo",
    icone: "imgs/dashboard-metrics/icone-improdutivo.png"
  };
}


// ADICIONA NA TABELA
export function adicionarNaTabela(email) {

  const tbody = document.querySelector(".email-table-body");

  const data = gerarDataAtual();
  const status = mapearStatus(email.status);

  const tr = document.createElement("tr");

  tr.innerHTML = `
      <td class="subject-email">${email.subject}</td>

      <td>
          <div class="sender-email">
              <div class="sender-email-icon">
                  <img src="imgs/email-list/icone-pessoa.png" alt="">
              </div>
              <div class="info-sender-email">
                  <strong>${email.sender}</strong>
                  <small>${email.sender}</small>
              </div>
          </div>
      </td>

      <td class="email-date">${data}</td>

      <td>
          <div class="email-status ${status.classe}">
              <img src="${status.icone}" alt="">
              <span>${status.texto}</span>
          </div>
      </td>

      <td>
          <div class="email-actions">
              <button><img src="imgs/email-list/icone-olho.png"></button>
              <button><img src="imgs/email-list/icone-sugestao-resposta.png"></button>
              <button><img src="imgs/email-list/icone-lixeira.png"></button>
          </div>
      </td>
  `;

  tbody.prepend(tr);
}
