// TEMA (Light / Dark)
const themeBtn = document.getElementById("switch-theme");
const sun = document.querySelector(".theme-icon-sol");
const moon = document.querySelector(".theme-icon-lua");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  sun.classList.toggle("theme-active");
  moon.classList.toggle("theme-active");
});

export default function initTheme() {
  console.log("tema iniciado");
}