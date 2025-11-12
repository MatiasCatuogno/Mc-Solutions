document.addEventListener("DOMContentLoaded", function () {
 const body = document.getElementById("body");
 const toggle = document.getElementById("blackmode");
 if (!body || !toggle) return;

 const saved = localStorage.getItem("blackmode");
 if (saved === "true" || (saved === null && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  body.classList.add("blackmode");
  toggle.checked = true;
 } else {
  body.classList.remove("blackmode");
  toggle.checked = false;
 }

 toggle.addEventListener("change", function () {
  const dark = toggle.checked;
  body.classList.toggle("blackmode", dark);
  localStorage.setItem("blackmode", String(dark));
 });

 if (window.matchMedia) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener?.("change", (e) => {
   if (localStorage.getItem("blackmode") === null) {
    body.classList.toggle("blackmode", e.matches);
    toggle.checked = e.matches;
   }
  });
 }
});