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

const themeToggle = document.querySelector(".theme-toggle");
const root = document.documentElement;
const savedTheme = localStorage.getItem("portfolio-theme");
root.dataset.theme = savedTheme === "dark" ? "dark" : "light";
if (themeToggle) {
  themeToggle.querySelector("span").textContent = root.dataset.theme === "dark" ? "☼" : "☾";
}
themeToggle?.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("portfolio-theme", root.dataset.theme);
  themeToggle.querySelector("span").textContent = root.dataset.theme === "dark" ? "☼" : "☾";
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

document.querySelectorAll("[data-gallery]").forEach((gallery) => {
  const images = [...gallery.querySelectorAll(".gallery-stage img")];
  const current = gallery.querySelector("[data-gallery-current]");
  let index = 0;

  const show = (nextIndex) => {
    index = (nextIndex + images.length) % images.length;
    images.forEach((image, imageIndex) => {
      image.classList.toggle("active", imageIndex === index);
      image.setAttribute("aria-hidden", String(imageIndex !== index));
    });
    if (current) current.textContent = String(index + 1);
  };

  gallery.querySelector("[data-gallery-prev]")?.addEventListener("click", () => show(index - 1));
  gallery.querySelector("[data-gallery-next]")?.addEventListener("click", () => show(index + 1));
  show(0);
});
