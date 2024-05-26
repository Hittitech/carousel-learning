const mobileNav = document.querySelector(".hamburger");
const navbar = document.querySelector(".menubar");

const toggleNav = () => {
  navbar.classList.toggle("active");
  mobileNav.classList.toggle("hamburger-active");
};
mobileNav.addEventListener("click", () => toggleNav());

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const items = document.querySelectorAll(".carousel-item");
  const sections = document.querySelectorAll(".section");
  let currentIndex = 1;
  let interval;

  // Move to the initial slide (second one) immediately
  carousel.style.transform = `translateX(-100%)`;

  function updateLoader(section) {
    const loader = section.querySelector(".loader::before");
    console.log(loader);
    if (loader) {
      loader.style.transition = "none";
      loader.style.width = "0";
      setTimeout(() => {
        loader.style.transition = "width 3s linear";
        loader.style.width = "100%";
      }, 50); // slight delay to ensure the transition reset
    }
  }

  function updateCarousel(index) {
    const offset = index * -100;
    carousel.style.transition = "transform 0.5s ease-in-out";
    carousel.style.transform = `translateX(${offset}%)`;

    sections.forEach((section, i) => {
      const sectionTexts = section.querySelectorAll(".section-text");
      const loader = section.querySelector(".loader"); // Select the loader element

      if (i === (index - 1) % (items.length - 2)) {
        section.classList.add("active");
        sectionTexts.forEach((text) => text.classList.add("active"));
        loader.classList.add("active"); // Add the active class to the loader
      } else {
        section.classList.remove("active");
        sectionTexts.forEach((text) => text.classList.remove("active"));
        loader.classList.remove("active"); // Remove the active class from the loader
      }
    });
  }

  function startAutoSlide() {
    interval = setInterval(() => {
      currentIndex++;
      updateCarousel(currentIndex);
      if (currentIndex === items.length - 1) {
        setTimeout(() => {
          carousel.style.transition = "none";
          currentIndex = 1;
          carousel.style.transform = `translateX(-100%)`;
        }, 500);
      }
    }, 5000);
  }

  sections.forEach((section, index) => {
    section.addEventListener("click", () => {
      clearInterval(interval);
      currentIndex = index + 1;
      updateCarousel(currentIndex);
      startAutoSlide();
    });
  });

  updateCarousel(currentIndex);
  startAutoSlide();
});
