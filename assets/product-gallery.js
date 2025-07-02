/**
 * Product Gallery and Lightbox functionality
 * This file handles all product gallery interactions including thumbnail navigation,
 * main carousel functionality and lightbox display
 */
document.addEventListener('DOMContentLoaded', function () {
    initMainCarousel();
    initThumbnailClicks();
    initLightbox();
});


/**
 * Initializes the main product image carousel
 * Sets up Flickity with the appropriate options for the main product view
 */
function initMainCarousel() {
    const flkty = new Flickity('.main-carousel', {
        cellAlign: 'center',
        contain: true,
        prevNextButtons: true,
        pageDots: false,
        adaptiveHeight: true,
        wrapAround: true,
        draggable: true,
    });
    // Store the flickity instance for global access
    window.mainCarousel = flkty;
}


/**
 * Sets up click handlers for thumbnail images
 * When a thumbnail is clicked, the main carousel navigates to the corresponding image
 */
function initThumbnailClicks() {
  const thumbs = document.querySelectorAll('.gallery-thumb');
  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const index = parseInt(thumb.dataset.index);
      if (window.mainCarousel) {
        window.mainCarousel.select(index);
      }
    });
  });
}


/**
 * Initializes the lightbox functionality
 * Handles opening and closing the lightbox, plus preloading images
 */
function initLightbox() {
  const lightbox = document.getElementById('gallery-lightbox');
  const closeBtn = document.getElementById('lightbox-close');
  const overlay = document.querySelector('.gallery-overlay');
  
  // Initialize lightbox carousel
  const flickityLightbox = initLightboxCarousel();
  
  // Preload lightbox images for better performance
  preloadLightboxImages();
  
  // Setup event handlers
  setupLightboxOpen(lightbox, overlay, flickityLightbox);
  setupLightboxClose(lightbox, closeBtn);
  setupOutsideClickClose(lightbox);
}


function initLightboxCarousel() {
  const flickityLightbox = new Flickity('.lightbox-carousel', {
    cellAlign: 'center',
    contain: true,
    prevNextButtons: true,
    pageDots: true,
    wrapAround: true,
    lazyLoad: 2,
    initialIndex: 4  // Start at the 5th image (index 4)
  });
  
  return flickityLightbox;
}


/**
 * Preloads all images in the lightbox carousel for smoother experience
 */
function preloadLightboxImages() {
  const images = Array.from(document.querySelectorAll('.lightbox-carousel .carousel-cell img'));
  images.forEach(img => {
    const src = img.getAttribute('src');
    if (src) {
      const preloadImage = new Image();
      preloadImage.src = src;
    }
  });
}


/**
 * Sets up the event handler for opening the lightbox
 * @param {HTMLElement} lightbox - The lightbox container element
 * @param {HTMLElement} overlay - The gallery overlay element that triggers the lightbox
 * @param {Object} flickityLightbox - The Flickity instance for the lightbox carousel
 */
function setupLightboxOpen(lightbox, overlay, flickityLightbox) {
  overlay?.addEventListener('click', () => {
    // Display the lightbox
    lightbox.style.display = 'flex';
    
    // Prevent scrolling of background content
    document.body.classList.add('lightbox-open');
    
    // Ensure Flickity recalculates sizes and positions after display change
    setTimeout(() => {
      if (flickityLightbox) {
        flickityLightbox.resize();
        flickityLightbox.select(4); // Navigate to the 5th image (index 4)
      }
    }, 10);
  });
}


/**
 * Sets up the event handler for closing the lightbox via the close button
 * @param {HTMLElement} lightbox - The lightbox container element
 * @param {HTMLElement} closeBtn - The close button element
 */
function setupLightboxClose(lightbox, closeBtn) {
  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
    document.body.classList.remove('lightbox-open');
  });
}


/**
 * Sets up the event handler for closing the lightbox by clicking outside the carousel
 * @param {HTMLElement} lightbox - The lightbox container element
 */
function setupOutsideClickClose(lightbox) {
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
      document.body.classList.remove('lightbox-open');
    }
  });
}
