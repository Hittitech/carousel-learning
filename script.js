// script.js
document.addEventListener("DOMContentLoaded", function() {
    const slider = document.getElementById('carouselSlider');
    const items = document.querySelectorAll('.carousel-item');
    const sections = document.querySelectorAll('.section');

    slider.addEventListener('input', function() {
        updateCarousel(slider.value);
        updateSections(slider.value);
    });

    function updateCarousel(index) {
        const offset = (index - 1) * -100;
        items.forEach(item => {
            item.style.transform = `translateX(${offset}%)`;
        });
    }

    function updateSections(index) {
        sections.forEach((section, i) => {
            if (i === (index - 1)) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    let currentIndex = 1;
    setInterval(() => {
        currentIndex = currentIndex < 4 ? currentIndex + 1 : 1;
        slider.value = currentIndex;
        updateCarousel(currentIndex);
        updateSections(currentIndex);
    }, 3000); 
});
