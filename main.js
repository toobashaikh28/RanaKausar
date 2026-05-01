// ── Burger Menu Functionality ──
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  navLinks.classList.toggle('active');
  document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking on a link
navLinksItems.forEach(item => {
  item.addEventListener('click', () => {
    burger.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !burger.contains(e.target) && navLinks.classList.contains('active')) {
    burger.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ── Smooth reveal on scroll ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.book-card, .writing-card, .contact-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ── Active nav highlight ──
const sections = document.querySelectorAll('section');
const navLinksAnchors = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let current = '';
  const scrollPosition = window.scrollY + 200;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      current = section.getAttribute('id');
    }
  });

  navLinksAnchors.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', () => {
  requestAnimationFrame(updateActiveNav);
});
updateActiveNav();

// ── Open PDF directly in new tab when book card is clicked ──
document.querySelectorAll('.book-card').forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.closest('a')) return;
    const pdfUrl = card.getAttribute('data-pdf');
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    }
  });
});

console.log('📚 Website Loaded Successfully!');
console.log('📁 PDF Files should be placed in "assets" folder:');
console.log('   - assets/ranai-khayal.pdf');
console.log('   - assets/mohabbat-fateh-e-alam.pdf');
console.log('   - assets/author-portrait.jpg (optional)');
