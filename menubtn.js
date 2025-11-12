document.addEventListener("DOMContentLoaded", () => {
 const menuBtn = document.getElementById("menu-btn");
 if (!menuBtn) return;

 const nav = menuBtn.querySelector(".nav-bar") || document.querySelector(".nav-bar");
 const ul = nav ? nav.querySelector(".nav-bar-ul") : document.querySelector(".nav-bar-ul");
 const layers = menuBtn.querySelectorAll("span");

 if (!menuBtn.hasAttribute("role")) menuBtn.setAttribute("role", "button");
 if (!menuBtn.hasAttribute("tabindex")) menuBtn.setAttribute("tabindex", "0");
 if (!menuBtn.hasAttribute("aria-expanded")) menuBtn.setAttribute("aria-expanded", "false");
 if (nav && !nav.hasAttribute("aria-hidden")) nav.setAttribute("aria-hidden", "true");

 function toggleMenu() {
  layers.forEach((layer) => layer.classList.toggle("active"));
  if (ul) ul.classList.toggle("show");

  const isOpen = ul ? ul.classList.contains("show") : menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.setAttribute("aria-expanded", String(!!isOpen));
  if (nav) nav.setAttribute("aria-hidden", String(!isOpen));
 }

 menuBtn.addEventListener("click", toggleMenu);
 menuBtn.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
   e.preventDefault();
   toggleMenu();
  }
 });
});