const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");

toggle?.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.querySelector("span").textContent = open ? "CLOSE" : "MENU";
});

menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menu.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.querySelector("span").textContent = "MENU";
}));

function updateTime() {
  const element = document.querySelector("#local-time");
  if (element) element.textContent = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Africa/Freetown"
  }).format(new Date());
}
updateTime();
setInterval(updateTime, 30000);
