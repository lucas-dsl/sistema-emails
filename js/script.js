// TEMA (Light / Dark)
const themeBtn = document.getElementById("switch-theme");
const sun = document.querySelector(".theme-icon-sol");
const moon = document.querySelector(".theme-icon-lua");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  sun.classList.toggle("theme-active");
  moon.classList.toggle("theme-active");
});

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