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
  const prevButton = container.querySelector('.carousel-button.prev');
  const nextButton = container.querySelector('.carousel-button.next');
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

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });

  // Ajustar al redimensionar
  window.addEventListener('resize', updateCarousel);
});
