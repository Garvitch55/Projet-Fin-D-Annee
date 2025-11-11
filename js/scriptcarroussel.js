document.addEventListener("DOMContentLoaded", () => {
  const photosProjet = document.getElementById("photos-projet");
  const flecheGauche = document.getElementById("fleche-gauche");
  const flecheDroite = document.getElementById("fleche-droite");
  const conteneurImages = document.querySelector(".conteneur-images");
  const indicateursContainer = document.querySelector(".indicateurs");
  const totalImages = document.querySelectorAll("#photos-projet .photos").length;

  let index = 0;
  let autoSlide = null;

  // 🔵 Génération automatique des indicateurs
  for (let i = 0; i < totalImages; i++) {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    indicateursContainer.appendChild(dot);

    // Permet de cliquer sur un point pour aller à l'image correspondante
    dot.addEventListener("click", () => {
      stopAutoSlide();
      index = i;
      updateCarousel();
      startAutoSlide();
    });
  }

  const indicateurs = document.querySelectorAll(".indicateurs span");

  function updateCarousel() {
    photosProjet.style.transform = `translateX(-${index * 100}%)`;
    photosProjet.style.transition = "transform 0.8s ease-in-out";

    // Met à jour les indicateurs
    indicateurs.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function nextImage() {
    index = (index + 1) % totalImages;
    updateCarousel();
  }

  function prevImage() {
    index = (index - 1 + totalImages) % totalImages;
    updateCarousel();
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlide = setInterval(nextImage, 5000);
  }

  function stopAutoSlide() {
    if (autoSlide) {
      clearInterval(autoSlide);
      autoSlide = null;
    }
  }

  flecheDroite.addEventListener("click", () => {
    stopAutoSlide();
    nextImage();
    startAutoSlide();
  });

  flecheGauche.addEventListener("click", () => {
    stopAutoSlide();
    prevImage();
    startAutoSlide();
  });

  // Pause quand la souris est sur les images ou les flèches
  const zonesPause = [conteneurImages, flecheGauche, flecheDroite];
  zonesPause.forEach(zone => {
    zone.addEventListener("mouseenter", stopAutoSlide);
    zone.addEventListener("mouseleave", startAutoSlide);
  });

  startAutoSlide();
});





