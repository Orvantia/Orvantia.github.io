// =============================================================
//  ORVANTIA — script.js
// =============================================================

// =============================================================
//  NAVBAR — efecto scroll + menú mobile
// =============================================================
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// =============================================================
//  REVEAL ON SCROLL
// =============================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// =============================================================
//  FAQ ACCORDION
// =============================================================
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.classList.contains('open');

    document.querySelectorAll('.faq-question').forEach(b => {
      b.classList.remove('open');
      b.nextElementSibling.classList.remove('open');
    });

    if (!isOpen) {
      btn.classList.add('open');
      answer.classList.add('open');
    }
  });
});

// =============================================================
//  MENSAJE DE ÉXITO — si vuelven desde FormSubmit con ?enviado=ok
// =============================================================
if (new URLSearchParams(window.location.search).get('enviado') === 'ok') {
  const banner = document.createElement('div');
  banner.className = 'form-alert form-alert--success';
  banner.style.cssText = 'position:fixed;bottom:24px;right:24px;max-width:340px;z-index:999;box-shadow:0 4px 20px rgba(0,0,0,0.1);';
  banner.textContent = '¡Mensaje enviado! Te contactaremos pronto.';
  document.body.appendChild(banner);
  setTimeout(() => banner.remove(), 6000);

  // Limpia el parámetro de la URL sin recargar
  history.replaceState({}, '', window.location.pathname);
}
