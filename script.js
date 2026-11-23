/* ============================================================
   SÉRIE — Hair Atelier
   Interactions: navigation, scroll reveals, form, toast
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Header shadow + active nav link ---------- */
  const header = document.getElementById('siteHeader');
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  let ticking = false;

  function updateOnScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 24);

    const marker = window.scrollY + 140;
    let current = 'home';
    sections.forEach(function (section) {
      if (section.offsetTop <= marker) current = section.id;
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + current);
    });
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  }, { passive: true });
  updateOnScroll();

  /* ---------- Mobile menu ---------- */
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');

  function closeMenu() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }

  toggle.addEventListener('click', function () {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 860) closeMenu();
  });

  /* ---------- Scroll reveals ---------- */
  const reveals = Array.from(document.querySelectorAll('.reveal'));

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Image fallback ---------- */
  document.querySelectorAll('.media img').forEach(function (img) {
    img.addEventListener('error', function () {
      const frame = img.closest('.media');
      if (frame) frame.classList.add('is-broken');
    });
  });

  /* ---------- Booking form ---------- */
  const form = document.getElementById('bookingForm');
  const rules = {
    name: function (value) {
      if (!value.trim()) return 'Please tell us your name.';
      if (value.trim().length < 2) return 'That name looks a little short.';
      return '';
    },
    email: function (value) {
      if (!value.trim()) return 'Please add your email address.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())) return 'Enter a valid email, e.g. you@example.com';
      return '';
    },
    service: function (value) {
      return value ? '' : 'Choose the service you are after.';
    },
    message: function (value) {
      if (!value.trim()) return 'A short note helps us prepare.';
      if (value.trim().length < 10) return 'Just a little more detail, please.';
      return '';
    }
  };

  function showError(field, message) {
    const wrapper = field.closest('.field');
    const errorEl = document.getElementById(field.id + 'Error');
    wrapper.classList.toggle('has-error', Boolean(message));
    field.setAttribute('aria-invalid', String(Boolean(message)));
    if (errorEl) errorEl.textContent = message;
  }

  Object.keys(rules).forEach(function (id) {
    const field = document.getElementById(id);
    field.addEventListener('blur', function () { showError(field, rules[id](field.value)); });
    field.addEventListener('input', function () {
      if (field.closest('.field').classList.contains('has-error')) {
        showError(field, rules[id](field.value));
      }
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    let firstInvalid = null;

    Object.keys(rules).forEach(function (id) {
      const field = document.getElementById(id);
      const message = rules[id](field.value);
      showError(field, message);
      if (message && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    form.reset();
    Object.keys(rules).forEach(function (id) {
      showError(document.getElementById(id), '');
    });
    showToast();
  });

  /* ---------- Success toast ---------- */
  const toast = document.getElementById('toast');
  const toastClose = document.getElementById('toastClose');
  let toastTimer;

  function showToast() {
    clearTimeout(toastTimer);
    toast.classList.add('is-visible');
    toastTimer = setTimeout(hideToast, 6000);
  }
  function hideToast() {
    toast.classList.remove('is-visible');
  }
  toastClose.addEventListener('click', hideToast);

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
