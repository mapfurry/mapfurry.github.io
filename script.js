const menuButton = document.getElementById("menuButton");
const menuPanel = document.getElementById("menuPanel");
const menuLinks = menuPanel.querySelectorAll("a");

function setMenu(open) {
  menuButton.classList.toggle("is-open", open);
  menuPanel.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);

  menuButton.setAttribute("aria-expanded", String(open));
  menuPanel.setAttribute("aria-hidden", String(!open));
}

menuButton.addEventListener("click", () => {
  const open = !menuPanel.classList.contains("is-open");
  setMenu(open);
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenu(false);
  }
});

const hero = document.querySelector(".hero");
const heroImage = document.getElementById("heroImage");
const heroOverlay = document.getElementById("heroOverlay");
const heroContent = document.getElementById("heroContent");

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateHero() {
  const rect = hero.getBoundingClientRect();
  const scrollable = hero.offsetHeight - window.innerHeight;

  if (scrollable <= 0) return;

  const progress = clamp((-rect.top) / scrollable, 0, 1);

  const blur = progress * 18;
  const imageOpacity = 1 - progress * 0.68;
  const overlayOpacity = progress * 0.82;
  const contentOpacity = 1 - progress * 1.25;
  const contentMove = progress * -48;
  const imageScale = 1.04 + progress * 0.05;

  heroImage.style.filter = `blur(${blur}px)`;
  heroImage.style.opacity = imageOpacity;
  heroImage.style.transform = `scale(${imageScale})`;

  heroOverlay.style.opacity = overlayOpacity;

  heroContent.style.opacity = clamp(contentOpacity, 0, 1);
  heroContent.style.transform = `translateY(${contentMove}px)`;
  heroContent.style.filter = `blur(${progress * 8}px)`;
}

let ticking = false;

function onScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateHero();
      ticking = false;
    });

    ticking = true;
  }
}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", updateHero);

updateHero();
