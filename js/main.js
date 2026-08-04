
const root = document.documentElement;
const themeButton = document.querySelector(".theme-button");
const themeIcon = themeButton?.querySelector("span");

function applyTheme(theme) {
  const isDark = theme === "dark";
  root.dataset.theme = theme;

  if (themeButton && themeIcon) {
    themeIcon.textContent = isDark ? "☾" : "☀";
    themeButton.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    themeButton.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
  }
}

const savedTheme = localStorage.getItem("vilde-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
applyTheme(savedTheme || preferredTheme);

themeButton?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  localStorage.setItem("vilde-theme", nextTheme);
});

document.querySelectorAll(".copy-code").forEach((button) => {
  button.addEventListener("click", async () => {
    const code = button.parentElement.querySelector("code")?.innerText || "";
    try {
      await navigator.clipboard.writeText(code);
      const original = button.textContent;
      button.textContent = "Copied";
      setTimeout(() => button.textContent = original, 1400);
    } catch {
      button.textContent = "Copy failed";
    }
  });
});

document.querySelectorAll(".share-page").forEach((button) => {
  button.addEventListener("click", async () => {
    const shareData = {
      title: document.title,
      text: document.querySelector('meta[name="description"]')?.content || "",
      url: window.location.href
    };

    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        const original = button.textContent;
        button.textContent = "Link copied";
        setTimeout(() => button.textContent = original, 1400);
      } catch {
        button.textContent = "Copy failed";
      }
    }
  });
});

const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox?.querySelector("img");

document.querySelectorAll(".article-image img").forEach((image) => {
  image.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("open");
  });
});

document.querySelector(".lightbox-close")?.addEventListener("click", () => {
  lightbox?.classList.remove("open");
});

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.classList.remove("open");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") lightbox?.classList.remove("open");
});


const linksTrigger = document.querySelector(".links-trigger");
const linksModal = document.querySelector(".links-modal");
const linksModalClose = document.querySelector(".links-modal-close");
const linksModalBackdrop = document.querySelector(".links-modal-backdrop");
const linksBlogLink = document.querySelector(".links-blog-link");

function openLinksModal() {
  if (!linksModal) return;

  linksModal.classList.add("open");
  linksModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  linksModalClose?.focus();
}

function closeLinksModal({ restoreFocus = true } = {}) {
  if (!linksModal) return;

  linksModal.classList.remove("open");
  linksModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (restoreFocus) {
    linksTrigger?.focus();
  }
}

linksTrigger?.addEventListener("click", openLinksModal);
linksModalClose?.addEventListener("click", () => closeLinksModal());
linksModalBackdrop?.addEventListener("click", () => closeLinksModal());

linksBlogLink?.addEventListener("click", () => {
  closeLinksModal({ restoreFocus: false });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && linksModal?.classList.contains("open")) {
    closeLinksModal();
  }
});
