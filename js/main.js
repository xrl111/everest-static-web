// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

// Navbar background change on scroll
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = '#fff';
    navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
  } else {
    navbar.style.background = 'transparent';
    navbar.style.boxShadow = 'none';
  }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // Here you would typically send the form data to a server
    alert('Cảm ơn bạn đã gửi tin nhắn! Chúng tôi sẽ liên hệ lại với bạn sớm.');
    this.reset();
  });
}

// Add animation to staff cards on scroll
const staffCards = document.querySelectorAll('.staff-card');
const animateCards = () => {
  staffCards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top;
    const triggerBottom = window.innerHeight * 0.8;

    if (cardTop < triggerBottom) {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }
  });
};

// Initialize staff cards
staffCards.forEach((card) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'all 0.5s ease';
});

window.addEventListener('scroll', animateCards);
window.addEventListener('load', animateCards);

// Slideshow functionality
const slideshow = {
  currentSlide: 0,
  slides: document.querySelectorAll('.slide'),
  dots: document.querySelector('.slide-dots'),
  autoPlayInterval: null, // Initialize as null

  init() {
    // Create dots
    this.slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => this.goToSlide(index));
      this.dots.appendChild(dot);
    });

    // Add arrow click handlers
    document
      .querySelector('.prev-slide')
      .addEventListener('click', () => this.prevSlide());
    document
      .querySelector('.next-slide')
      .addEventListener('click', () => this.nextSlide());

    // Start autoplay
    this.startAutoPlay();

    // Pause autoplay on hover
    document
      .querySelector('.slideshow')
      .addEventListener('mouseenter', () => this.stopAutoPlay());
    document
      .querySelector('.slideshow')
      .addEventListener('mouseleave', () => this.startAutoPlay());
  },

  goToSlide(index) {
    // Remove active class from current slide and dot
    this.slides[this.currentSlide].classList.remove('active');
    this.dots.children[this.currentSlide].classList.remove('active');

    // Update current slide
    this.currentSlide = index;

    // Add active class to new slide and dot
    this.slides[this.currentSlide].classList.add('active');
    this.dots.children[this.currentSlide].classList.add('active');
  },

  nextSlide() {
    const next = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(next);
  },

  prevSlide() {
    const prev =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prev);
  },

  startAutoPlay() {
    if (this.autoPlayInterval) return;
    this.autoPlayInterval = setInterval(() => this.nextSlide(), 3000); // Change slide every 3 seconds
  },

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  },
};

// Initialize slideshow
document.addEventListener('DOMContentLoaded', () => {
  slideshow.init();
});
