import initModeSwitch from "./mode-switch.js";
import initTheme from "./theme.js";
import { analisarEmail, analisarArquivo } from "./api.js";
import { adicionarNaTabela } from "./table.js";
import { atualizarMetricas } from "./metrics.js";
import initFilters from "./filters.js";

// INICIA TEMA, TROCA DE MODO DE ANÁLISE E FILTROS
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initModeSwitch();
  initFilters();
});

// ANALISA O EMAIL ESCRITO
const form = document.querySelector(".mode-write");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const dados = {
    subject: form.subject.value,
    sender: form.sender.value,
    content: form.content.value
  };

  const resultado = await analisarEmail(dados);

  adicionarNaTabela(resultado);
  atualizarMetricas();

  form.reset();
});

const formWrite = document.querySelector(".mode-write");
const btnWrite = formWrite.querySelector("button");

formWrite.addEventListener("input", () => {
  // ACENDE O BOTÃO QUANDO ESTA COMPLETO
  if (formWrite.checkValidity()) {
    btnWrite.classList.add("btn-active");
  } else {
    btnWrite.classList.remove("btn-active");
  }
});

// ANALISA O ARQUIVO .TXT OU .PDF
const formUpload = document.querySelector(".mode-upload");
const fileInput = document.querySelector(".upload-input");
const fileNameDisplay = document.querySelector(".file-name");
const btnSubmitUpload = document.querySelector(".mode-upload button[type='submit']");

formUpload.addEventListener("submit", async (e) => {
  e.preventDefault();

  const file = fileInput.files[0];
  if (!file) {
    alert("Por favor, selecione um arquivo!");
    return;
  }

  try {
    const resultado = await analisarArquivo(file);

    adicionarNaTabela(resultado);
    atualizarMetricas();

    formUpload.reset();
    fileNameDisplay.textContent = "";
    btnSubmitUpload.classList.remove("btn-active");

    console.log("Análise concluída e formulário resetado.");
  } catch (error) {
    console.error("Erro detalhado ao analisar:", error);
  }
});

// MOSTRA O NOME DO ARQUIVO E ACENDE O BOTÃO
fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    const nomeArquivo = fileInput.files[0].name;
    fileNameDisplay.textContent = "Arquivo selecionado: " + nomeArquivo;
    btnSubmitUpload.classList.add("btn-active");
  } else {
    fileNameDisplay.textContent = "";
    btnSubmitUpload.classList.remove("btn-active");
  }
});

// FILTRO DE BUSCA POR ESCRITA
const searchInput = document.querySelector(".email-list-search input");

searchInput.addEventListener("input", () => {
  const busca = searchInput.value.toLowerCase();
  const linhas = document.querySelectorAll(".email-table-body tr");

  linhas.forEach(linha => {
    const conteudoLinha = linha.innerText.toLowerCase();
    linha.style.display = conteudoLinha.includes(busca) ? "" : "none";
  });
});