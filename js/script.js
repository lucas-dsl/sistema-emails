const btn = document.getElementById("switch-theme");
const sun = document.querySelector(".theme-icon-sol");
const moon = document.querySelector(".theme-icon-lua");

btn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  sun.classList.toggle("theme-active");
  moon.classList.toggle("theme-active");
});
