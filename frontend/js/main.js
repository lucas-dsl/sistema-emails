import initModeSwitch from "./mode-switch.js";
import initTheme from "./theme.js";
import { analisarEmail, analisarArquivo } from "./api.js";
import { adicionarNaTabela } from "./table.js";
import { atualizarMetricas } from "./metrics.js";
import initFilters from "./filters.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. INICIALIZAÇÃO DE MÓDULOS EXTERNOS
  initTheme();
  initModeSwitch();
  initFilters();

  // 2. SELEÇÃO DE ELEMENTOS GLOBAIS
  const forms = {
    write: document.querySelector(".mode-write"),
    upload: document.querySelector(".mode-upload")
  };

  const modalElements = {
    modal: document.getElementById("modalSugestao"),
    campoTexto: document.getElementById("texto-sugestao"),
    btnEditar: document.querySelector(".btn-edit-mode"),
    btnCopiar: document.getElementById("btnCopiar")
  };

  const uploadElements = {
    fileInput: document.querySelector(".upload-input"),
    fileNameDisplay: document.querySelector(".file-name"),
    btnSubmit: document.querySelector(".mode-upload button[type='submit']")
  };

  const tableBody = document.querySelector(".email-table-body");
  const searchInput = document.querySelector(".email-list-search input");

  // --- FUNÇÕES DE APOIO ---

  function fecharModalSugestao() {
    if (modalElements.modal) {
      modalElements.modal.classList.remove("active");
      modalElements.campoTexto.readOnly = true;
      modalElements.campoTexto.style.border = "0.1rem solid #E9ECEF";
      if (modalElements.btnEditar) {
        modalElements.btnEditar.querySelector("span").textContent = "Editar";
      }
    }
  }

  // --- LÓGICA DE ANÁLISE (ESCRITA) ---

  forms.write.addEventListener("submit", async (e) => {
    e.preventDefault();
    const dados = {
      subject: forms.write.subject.value,
      sender: forms.write.sender.value,
      content: forms.write.content.value
    };

    const resultado = await analisarEmail(dados);
    adicionarNaTabela(resultado);
    atualizarMetricas();
    forms.write.reset();
    forms.write.querySelector("button").classList.remove("btn-active");
  });

  forms.write.addEventListener("input", () => {
    const btn = forms.write.querySelector("button");
    btn.classList.toggle("btn-active", forms.write.checkValidity());
  });

  // --- LÓGICA DE ANÁLISE (UPLOAD) ---

  forms.upload.addEventListener("submit", async (e) => {
    e.preventDefault();
    const file = uploadElements.fileInput.files[0];

    try {
      const resultado = await analisarArquivo(file);
      adicionarNaTabela(resultado);
      atualizarMetricas();

      forms.upload.reset();
      uploadElements.fileNameDisplay.textContent = "";
      uploadElements.btnSubmit.classList.remove("btn-active");
    } catch (error) {
      console.error("Erro detalhado ao analisar:", error);
    }
  });

  uploadElements.fileInput.addEventListener("change", () => {
    if (uploadElements.fileInput.files.length > 0) {
      uploadElements.fileNameDisplay.textContent = "Arquivo: " + uploadElements.fileInput.files[0].name;
      uploadElements.btnSubmit.classList.add("btn-active");
    } else {
      uploadElements.fileNameDisplay.textContent = "";
      uploadElements.btnSubmit.classList.remove("btn-active");
    }
  });

  // --- FILTRO DE BUSCA ---

  searchInput.addEventListener("input", () => {
    const busca = searchInput.value.toLowerCase();
    const linhas = document.querySelectorAll(".email-table-body tr");

    linhas.forEach(linha => {
      const visivel = linha.innerText.toLowerCase().includes(busca);
      linha.style.display = visivel ? "" : "none";
    });
  });

  // --- LÓGICA DO MODAL (SUGESTÃO DE RESPOSTA) ---

  tableBody.addEventListener("click", async (e) => {
    const btn = e.target.closest(".btn-suggest");
    if (!btn) return;

    const { content, subject, sender, category } = btn.dataset;

    // Preenchimento do Modal
    document.getElementById("modal-subject").textContent = subject;
    document.getElementById("modal-sender").textContent = sender;

    const statusBadge = document.getElementById("modal-status");
    statusBadge.className = `status-badge ${category}`;
    statusBadge.querySelector("span").textContent = category.charAt(0).toUpperCase() + category.slice(1);

    modalElements.modal.classList.add("active");
    modalElements.campoTexto.value = "Gerando sugestão de resposta... ✨";

    try {
      const response = await fetch("http://127.0.0.1:8000/suggest-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, category })
      });

      const result = await response.json();
      modalElements.campoTexto.value = result.reply;
    } catch (error) {
      modalElements.campoTexto.value = "Erro ao conectar com o servidor.";
    }
  });

  // Eventos de Fechar Modal
  document.querySelectorAll("#close-modal, #btn-fechar-footer").forEach(btn => {
    btn.addEventListener("click", fecharModalSugestao);
  });

  // Funcionalidade Editar
  if (modalElements.btnEditar) {
    modalElements.btnEditar.addEventListener("click", () => {
      modalElements.campoTexto.readOnly = false;
      modalElements.campoTexto.focus();
      modalElements.campoTexto.style.border = "0.2rem solid #007BFF";
      modalElements.btnEditar.querySelector("span").textContent = "Editando...";
    });
  }

  // Sair da edição ao clicar fora
  modalElements.campoTexto.addEventListener("blur", () => {
    modalElements.campoTexto.readOnly = true;
    modalElements.campoTexto.style.border = "0.1rem solid #E9ECEF";
    if (modalElements.btnEditar) {
      modalElements.btnEditar.querySelector("span").textContent = "Editar";
    }
  });

  // Funcionalidade Copiar
  if (modalElements.btnCopiar) {
    modalElements.btnCopiar.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(modalElements.campoTexto.value);
        const span = modalElements.btnCopiar.querySelector("span");
        const original = span.textContent;
        span.textContent = "Copiado!";
        setTimeout(() => span.textContent = original, 2000);
      } catch (err) {
        console.error("Erro ao copiar.");
      }
    });
  }
});