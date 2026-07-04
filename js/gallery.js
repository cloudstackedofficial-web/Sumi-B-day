const galleryTiles = document.querySelectorAll(".gallery-tile");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");

galleryTiles.forEach((tile) => {
  const full = tile.dataset.full || "";

  if (full) {
    tile.classList.add("has-image");
    tile.style.backgroundImage = `linear-gradient(180deg, rgba(10, 12, 15, 0.08), rgba(10, 12, 15, 0.58)), url('${full}')`;
  }

  tile.addEventListener("click", () => {
    const caption = tile.dataset.caption || "";

    if (lightboxImage) {
      lightboxImage.style.background = `linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.02)), url('${full}') center/cover no-repeat, linear-gradient(135deg, rgba(146,197,176,0.55), rgba(219,116,94,0.42))`;
    }

    if (lightboxCaption) {
      lightboxCaption.textContent = caption;
    }

    lightbox?.classList.add("is-open");
    lightbox?.setAttribute("aria-hidden", "false");
  });
});

const closeLightbox = () => {
  lightbox?.classList.remove("is-open");
  lightbox?.setAttribute("aria-hidden", "true");
};

lightboxClose?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});