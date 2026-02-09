// MODO DE ANÁLISE DO EMAIL
const writeBtn = document.querySelector(".btn-write");
const uploadBtn = document.querySelector(".btn-upload");

const writeForm = document.querySelector(".mode-write");
const uploadForm = document.querySelector(".mode-upload");

function activateWrite() {
  writeForm.classList.remove("is-hidden");
  uploadForm.classList.add("is-hidden");

  writeBtn.classList.add("mode-switch-active");
  uploadBtn.classList.remove("mode-switch-active");
}

function activateUpload() {
  uploadForm.classList.remove("is-hidden");
  writeForm.classList.add("is-hidden");

  uploadBtn.classList.add("mode-switch-active");
  writeBtn.classList.remove("mode-switch-active");
}

writeBtn.addEventListener("click", activateWrite);
uploadBtn.addEventListener("click", activateUpload);

export default function initModeSwitch() {
  console.log("mode switch iniciado");
}