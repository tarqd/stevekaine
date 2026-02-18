/* ============================================================
   Steve Kain EPK — Script
   Scroll reveals, sticky nav, mobile menu
   ============================================================ */

(function () {
  'use strict';

  /* -------------------- Scroll Reveal -------------------- */

  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));


  /* -------------------- Active Nav Link -------------------- */

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle(
              'is-active',
              link.getAttribute('href') === '#' + id
            );
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
  );

  sections.forEach((section) => navObserver.observe(section));


  /* -------------------- Mobile Menu -------------------- */

  const navToggle = document.getElementById('nav-toggle');
  const navLinksEl = document.getElementById('nav-links');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinksEl.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinksEl.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinksEl.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

})();
