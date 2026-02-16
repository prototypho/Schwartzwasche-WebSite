// Contact Modal Logic
const contactModal = document.getElementById("contactModal");
const contactBtn = document.querySelector(".termin");
const closeContactModal = document.getElementById("closeContactModal");
const contactForm = document.getElementById("contactForm");
// Open contact modal when clicking "Kontaktieren Sie Uns" button
contactBtn?.addEventListener("click", () => {
  contactModal.classList.remove("hidden");
  contactModal.classList.add("flex");
  document.body.style.overflow = "hidden";
});
// Close contact modal
closeContactModal?.addEventListener("click", () => {
  contactModal.classList.add("hidden");
  contactModal.classList.remove("flex");
  document.body.style.overflow = "auto";
});
// Close modal when clicking outside
contactModal?.addEventListener("click", (e) => {
  if (e.target === contactModal) {
    contactModal.classList.add("hidden");
    contactModal.classList.remove("flex");
    document.body.style.overflow = "auto";
  }
});
// Netlify Forms will handle the submission and redirect to success.html
// No need to prevent default or handle submission with JavaScript
// Gallery Modal Logic
const galleryModal = document.getElementById("galleryModal");
const closeGalleryModal = document.getElementById("closeGalleryModal");
const galleryGrid = document.getElementById("galleryGrid");
const galleryButton = document.querySelector('a[href="#galerie"]');
// Full screen modal
const fullscreenModal = document.getElementById("fullscreenModal");
const closeFullscreenModal = document.getElementById("closeFullscreenModal");
const fullscreenImage = document.getElementById("fullscreenImage");
// Gallery images - These will only appear in the modal
const galleryImages = [
  "assets/img/galeria/behand.png",
  "assets/img/galeria/DETO4890.JPG",
  "assets/img/galeria/TUDF8787.JPG",
  "assets/img/galeria/UQBO3254.JPG",
  "assets/img/galeria/detail.png",
  "assets/img/galeria/galeri1.jpg",
  "assets/img/galeria/galeri2.jpg",
  "assets/img/galeria/galeri3.jpg",
  "assets/img/galeria/galeri4.jpg",
  "assets/img/galeria/galeri5.jpg",
  "assets/img/galeria/galeri6.jpg",
  "assets/img/galeria/galeri7.jpg",
  "assets/img/galeria/galeri8.jpg",
  "assets/img/galeria/galeri9.jpg",
  "assets/img/galeria/galeri10.jpg",
  "assets/img/galeria/galeri11.jpg",
  "assets/img/galeria/galeri12.jpg",
  "assets/img/galeria/galeri13.jpg",
  "assets/img/galeria/galeri14.jpg",
  "assets/img/galeria/galeri15.jpg",
  "assets/img/galeria/galeri16.jpg",
  "assets/img/galeria/galeri17.jpg",
  "assets/img/galeria/galeri18.jpg",
  "assets/img/galeria/galeri19.jpg",
  "assets/img/galeria/galeri20.jpg",
];
// Populate gallery grid with thumbnails
function populateGallery() {
  galleryGrid.innerHTML = "";
  galleryImages.forEach((imageSrc, index) => {
    const thumbnail = document.createElement("div");
    thumbnail.className =
      "gallery-thumbnail aspect-square bg-cover bg-center rounded-lg cursor-pointer transition-all hover:scale-105 hover:brightness-110 border border-primary/20 hover:border-primary/60";
    thumbnail.style.backgroundImage = `url("${imageSrc}")`;
    thumbnail.setAttribute("data-image-src", imageSrc);

    // Click to open full screen
    thumbnail.addEventListener("click", () => {
      fullscreenImage.src = imageSrc;
      fullscreenModal.classList.remove("hidden");
      fullscreenModal.classList.add("flex");
    });

    galleryGrid.appendChild(thumbnail);
  });
}
// Open gallery modal when clicking "Galerie Ansehen" button
const galerieButtons = document.querySelectorAll('a[href="#galerie"]');
galerieButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // Check if it's the "Galerie Ansehen" button (not the nav link)
    if (btn.textContent.includes("Galerie Ansehen")) {
      e.preventDefault();
      populateGallery();
      galleryModal.classList.remove("hidden");
      galleryModal.classList.add("flex");
      document.body.style.overflow = "hidden";
    }
  });
});
// Close gallery modal
closeGalleryModal?.addEventListener("click", () => {
  galleryModal.classList.add("hidden");
  galleryModal.classList.remove("flex");
  document.body.style.overflow = "auto";
});
// Close modal when clicking outside
galleryModal?.addEventListener("click", (e) => {
  if (e.target === galleryModal) {
    galleryModal.classList.add("hidden");
    galleryModal.classList.remove("flex");
    document.body.style.overflow = "auto";
  }
});
// Close fullscreen modal
closeFullscreenModal?.addEventListener("click", () => {
  fullscreenModal.classList.add("hidden");
  fullscreenModal.classList.remove("flex");
});
// Close fullscreen modal when clicking outside
fullscreenModal?.addEventListener("click", (e) => {
  if (e.target === fullscreenModal || e.target === closeFullscreenModal) {
    fullscreenModal.classList.add("hidden");
    fullscreenModal.classList.remove("flex");
  }
});
// Close modals with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (!contactModal.classList.contains("hidden")) {
      contactModal.classList.add("hidden");
      contactModal.classList.remove("flex");
      document.body.style.overflow = "auto";
    }
    if (!galleryModal.classList.contains("hidden")) {
      galleryModal.classList.add("hidden");
      galleryModal.classList.remove("flex");
      document.body.style.overflow = "auto";
    }
    if (!fullscreenModal.classList.contains("hidden")) {
      fullscreenModal.classList.add("hidden");
      fullscreenModal.classList.remove("flex");
    }
  }
});
