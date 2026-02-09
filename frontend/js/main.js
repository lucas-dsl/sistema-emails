import initModeSwitch from "./mode-switch.js";
import initTheme from "./theme.js";
import { analisarEmail } from "./api.js";
import { adicionarNaTabela } from "./table.js";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initModeSwitch();
});

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

  form.reset();
});