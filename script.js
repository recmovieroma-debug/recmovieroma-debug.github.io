document.addEventListener('DOMContentLoaded', () => {

  /* ---- Menu mobile ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Dropdown "Servizi" apribile anche al tocco su mobile ---- */
  const dropdown = document.querySelector('.nav-links .dropdown');
  if (dropdown) {
    const dropdownLink = dropdown.querySelector('a');
    dropdownLink.addEventListener('click', (e) => {
      if (window.innerWidth <= 868) {
        e.preventDefault();
        dropdown.classList.toggle('active');
      }
    });
  }

  /* ---- Evidenzia la voce di menu della pagina corrente ---- */
  const currentPage = (window.location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a[href]').forEach(link => {
    const href = link.getAttribute('href').split('#')[0];
    if (href && href === currentPage) {
      link.classList.add('active');
    }
  });

  /* ---- Header che si "restringe" allo scroll ---- */
  const header = document.querySelector('header');
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Pulsante "torna su" ---- */
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Torna su');
  backToTop.innerHTML = '&uarr;';
  document.body.appendChild(backToTop);

  const toggleBackToTop = () => {
    backToTop.classList.toggle('is-visible', window.scrollY > 500);
  };
  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- Animazione di comparsa degli elementi allo scroll ---- */
  const revealTargets = document.querySelectorAll(
    '.service-card, .step-card, .phase-card, .pod-card, .spec-item, .feature-item, .feature-box, .video-card, .reel-card, .video-card-small'
  );

  if ('IntersectionObserver' in window && revealTargets.length) {
    revealTargets.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach(el => observer.observe(el));
  }

});
