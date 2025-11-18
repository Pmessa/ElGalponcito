// Menú hamburguesa
const hamburger = document.querySelector('.hamburger-menu');
const nav = document.querySelector('.main-nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Carrusel
document.querySelectorAll('.carousel-container').forEach(container => {
  const track = container.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const indicatorsContainer = container.querySelector('.carousel-indicators');

  let currentIndex = 0;

  // Crear indicadores
  slides.forEach((_, index) => {
    const indicator = document.createElement('button');
    if (index === 0) indicator.classList.add('active');
    indicatorsContainer.appendChild(indicator);

    indicator.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
    });
  });

  const indicators = Array.from(indicatorsContainer.children);

  function updateCarousel() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    indicators.forEach(btn => btn.classList.remove('active'));
    indicators[currentIndex].classList.add('active');
  }

  // Ajustar al redimensionar
  window.addEventListener('resize', updateCarousel);

  // --- Swipe táctil en móviles ---
  let startX = 0;
  let endX = 0;

  container.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  container.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
  });

  container.addEventListener('touchend', () => {
    const deltaX = endX - startX;

    if (Math.abs(deltaX) > 50) { // umbral para evitar toques leves
      if (deltaX > 0) {
        // swipe a la derecha → imagen anterior
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      } else {
        // swipe a la izquierda → imagen siguiente
        currentIndex = (currentIndex + 1) % slides.length;
      }
      updateCarousel();
    }
  });
});
