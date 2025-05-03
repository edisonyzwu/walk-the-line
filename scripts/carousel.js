document.addEventListener("DOMContentLoaded", function () {
  // Configuration
  const carouselImages = [
    "assets/photo_carousel_1.jpg",
    "assets/photo_carousel_2.jpg",
    "assets/photo_carousel_3.JPG",
    "assets/photo_carousel_4.JPG",
    "assets/photo_carousel_5.jpg",
    "assets/photo_carousel_6.jpg",
    "assets/photo_carousel_7.jpg",
    "assets/photo_carousel_8.jpg",
    "assets/photo_carousel_9.jpg",
  ];

  const imagesPerView = 3; // Number of images to show at once
  let currentIndex = 0;
  let isAnimating = false; // Flag to prevent rapid clicking
  let itemWidth = 0; // Store item width for performance
  let resizeTimer; // For debouncing resize events

  // Get carousel elements
  const carouselInner = document.querySelector(".carousel-inner");
  const prevButton = document.querySelector(".carousel-control.prev");
  const nextButton = document.querySelector(".carousel-control.next");

  // Initialize carousel
  function initCarousel() {
    // Create a document fragment for better performance
    const fragment = document.createDocumentFragment();

    // Create all carousel items
    carouselImages.forEach((imagePath, index) => {
      const item = document.createElement("div");
      item.className = "carousel-item";

      const img = document.createElement("img");
      img.loading = "lazy"; // Use lazy loading for images not in initial view
      img.alt = `Delivery driver photo ${index + 1}`;

      // Only set src for first few images, use data-src for others
      if (index < imagesPerView * 2) {
        img.src = imagePath;
      } else {
        img.dataset.src = imagePath;
        img.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="; // Tiny placeholder
      }

      item.appendChild(img);
      fragment.appendChild(item);
    });

    // Append all items at once
    carouselInner.appendChild(fragment);

    // Calculate and store item width
    updateItemWidth();

    // Set initial position
    updateCarousel(false);

    // Add event listeners for controls with throttling
    prevButton.addEventListener("click", throttle(showPrevious, 300));
    nextButton.addEventListener("click", throttle(showNext, 300));

    // Add responsive handling with debouncing
    window.addEventListener("resize", debounce(updateCarouselResponsive, 200));
  }

  // Throttle function to limit how often a function can be called
  function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return func(...args);
    };
  }

  // Debounce function to delay execution until after events have stopped
  function debounce(func, delay) {
    return function (...args) {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => func(...args), delay);
    };
  }

  // Update item width calculation
  function updateItemWidth() {
    if (carouselInner.children.length > 0) {
      itemWidth = carouselInner.children[0].offsetWidth;
    }
  }

  // Load images that are now visible or about to be visible
  function loadVisibleImages() {
    const items = carouselInner.querySelectorAll(".carousel-item");
    const imgsPerView = getImagesPerView();

    // Load current visible images and next set
    for (let i = currentIndex; i < currentIndex + imgsPerView * 2 && i < items.length; i++) {
      const img = items[i].querySelector("img");
      if (img && img.dataset.src) {
        img.src = img.dataset.src;
        delete img.dataset.src;
      }
    }
  }

  // Update carousel position with hardware acceleration
  function updateCarousel(animate = true) {
    if (isAnimating) return;

    // Update item width on each update to handle responsive changes
    updateItemWidth();

    if (animate) {
      isAnimating = true;
      carouselInner.classList.add("animating");
    } else {
      carouselInner.classList.remove("animating");
    }

    // Use transform3d for hardware acceleration
    carouselInner.style.transform = `translate3d(-${currentIndex * itemWidth}px, 0, 0)`;

    // Update button states
    const imagesPerView = getImagesPerView();
    const maxIndex = Math.max(0, carouselImages.length - imagesPerView);

    prevButton.disabled = currentIndex <= 0;
    nextButton.disabled = currentIndex >= maxIndex;
    prevButton.style.opacity = prevButton.disabled ? "0.5" : "1";
    nextButton.style.opacity = nextButton.disabled ? "0.5" : "1";

    // Load images that are now visible
    loadVisibleImages();

    if (animate) {
      // Reset animation flag after transition completes
      setTimeout(() => {
        isAnimating = false;
        carouselInner.classList.remove("animating");
      }, 300);
    }
  }

  // Get current number of images per view based on screen size
  function getImagesPerView() {
    if (window.innerWidth <= 480) {
      return 1; // Mobile: 1 image
    } else if (window.innerWidth <= 768) {
      return 2; // Tablet: 2 images
    } else {
      return imagesPerView; // Desktop: 3 images
    }
  }

  // Update carousel for responsive layout
  function updateCarouselResponsive() {
    updateItemWidth();

    const currentImagesPerView = getImagesPerView();

    // Make sure currentIndex is valid for the current view
    // Ensure we can always reach the last set of images
    const maxIndex = Math.max(0, carouselImages.length - currentImagesPerView);
    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    updateCarousel(false);
  }

  // Show previous set of images
  function showPrevious() {
    if (currentIndex > 0 && !isAnimating) {
      // Move by the number of images per view (full page)
      const step = getImagesPerView();
      currentIndex = Math.max(0, currentIndex - step);
      updateCarousel();
    }
  }

  // Show next set of images
  function showNext() {
    const imagesPerView = getImagesPerView();
    const maxIndex = carouselImages.length - imagesPerView;
    if (currentIndex < maxIndex && !isAnimating) {
      // Move by the number of images per view (full page)
      currentIndex = Math.min(maxIndex, currentIndex + imagesPerView);
      updateCarousel();
    }
  }

  // Initialize the carousel
  initCarousel();
});
