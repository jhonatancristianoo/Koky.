// k.oky — interações do protótipo
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector(".theme-icon");

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("koky-theme", theme);
  const light = theme === "light";
  themeIcon.textContent = light ? "☼" : "◐";
  themeToggle.setAttribute("aria-label", light ? "Ativar tema escuro" : "Ativar tema claro");
  themeToggle.title = light ? "Ativar tema escuro" : "Ativar tema claro";
}
setTheme(root.dataset.theme || "dark");

themeToggle.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

document.getElementById("year").textContent = new Date().getFullYear();

// Revela blocos conforme entram na tela; há fallback para navegadores antigos.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("is-visible"));
}
