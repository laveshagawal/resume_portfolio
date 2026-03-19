// ── JS-READY: enables fade-up animations ──
document.body.classList.add('js-ready');

// ── SCROLL FADE-IN ANIMATIONS ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── NAVBAR SHADOW ON SCROLL ──
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 40) {
    nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

// ── ACTIVE NAV LINK HIGHLIGHT ON SCROLL ──
const sections = ['about', 'skills', 'experience', 'projects', 'education', 'certs', 'contact'];
const navLinks = document.querySelectorAll('.nav-links a');

function setActiveLink(id) {
  navLinks.forEach(link => {
    link.classList.remove('nav-active');
    if (link.getAttribute('href') === '#' + id) {
      link.classList.add('nav-active');
    }
  });
}

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setActiveLink(entry.target.id);
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(id => {
  const el = document.getElementById(id);
  if (el) sectionObserver.observe(el);
});

// ── SMOOTH SCROLL WITH OFFSET FOR FIXED NAV ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navHeight = document.querySelector('nav').offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 10;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── MOBILE HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
  });

  // Close mobile menu on link click
  document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });
}
