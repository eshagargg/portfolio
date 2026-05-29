window.addEventListener('DOMContentLoaded', () => {

  /* ================= LOADER ================= */
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    startReveal();
  }, 2000);

  function startReveal() {
    document.querySelectorAll('#home .reveal-up').forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.12}s`;
      el.classList.add('in');
    });
  }

  /* ================= NAVBAR ================= */
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scroll-top');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 50);
    scrollTopBtn.classList.toggle('visible', y > 400);
    updateActiveNav(y);
  });

  function updateActiveNav(y) {
    let current = '';
    sections.forEach(sec => {
      if (y >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  const navToggle = document.getElementById('navToggle');
  const navLinksEl = document.getElementById('navLinks');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });

      navLinksEl.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });

  navToggle?.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinksEl.classList.toggle('open');
  });

  /* ================= SCROLL REVEAL ================= */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
    if (!el.closest('#home')) observer.observe(el);
  });

  /* ================= HERO CAROUSEL ================= */
  const imgs = document.querySelectorAll('.carousel-img');
  const dots = document.querySelectorAll('.dot');
  const labelText = document.querySelector('.label-text');
  const labelNum = document.querySelector('.label-num');

  const labels = ['Visionary Leader', 'Developer', 'Tech Enthuast', 'Programmer'];
  const nums = ['01', '02', '03', '04'];

  let currentSlide = 0;
  let autoTimer;

  function goToSlide(idx) {
    imgs[currentSlide].classList.remove('active');
    imgs[currentSlide].classList.add('leaving');
    dots[currentSlide].classList.remove('active');

    setTimeout(() => imgs[currentSlide].classList.remove('leaving'), 900);

    currentSlide = idx;

    imgs[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');

    labelText.style.opacity = '0';
    labelNum.style.opacity = '0';

    setTimeout(() => {
      labelText.textContent = labels[currentSlide];
      labelNum.textContent = nums[currentSlide];
      labelText.style.opacity = '1';
      labelNum.style.opacity = '1';
    }, 300);
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % imgs.length);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(autoTimer);
      goToSlide(parseInt(dot.dataset.dot));
      autoTimer = setInterval(nextSlide, 3500);
    });
  });

  autoTimer = setInterval(nextSlide, 3500);

  /* ================= INTEREST ORBIT ================= */
  const orbitEl = document.getElementById('interestOrbit');
  const orbitItems = document.querySelectorAll('.orbit-item');
  const detailLabel = document.querySelector('.id-label');
  const detailTitle = document.querySelector('.id-title');
  const detailDesc = document.querySelector('.id-desc');

  const radii = { desktop: 170, mobile: 110 };

  function getRadius() {
    return window.innerWidth < 500 ? radii.mobile : radii.desktop;
  }

  function positionOrbitItems() {
    if (!orbitEl) return;

    const r = getRadius();

    orbitItems.forEach(item => {
      const angle = parseFloat(item.dataset.angle);
      const rad = (angle - 90) * Math.PI / 180;

      const x = 50 + (r / orbitEl.offsetWidth) * 100 * Math.cos(rad);
      const y = 50 + (r / orbitEl.offsetHeight) * 100 * Math.sin(rad);

      item.style.left = `${x}%`;
      item.style.top = `${y}%`;
    });
  }

  positionOrbitItems();
  window.addEventListener('resize', positionOrbitItems);

  let orbitAngle = 0;

  function animateOrbit() {
    orbitAngle += 0.2;

    orbitItems.forEach(item => {
      const base = parseFloat(item.dataset.angle);
      const rad = (base + orbitAngle - 90) * Math.PI / 180;

      const r = getRadius();

      const x = 50 + (r / orbitEl.offsetWidth) * 100 * Math.cos(rad);
      const y = 50 + (r / orbitEl.offsetHeight) * 100 * Math.sin(rad);

      item.style.left = `${x}%`;
      item.style.top = `${y}%`;
    });

    requestAnimationFrame(animateOrbit);
  }

  if (orbitEl) animateOrbit();

  orbitItems.forEach(item => {
    item.addEventListener('click', () => {
      orbitItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      detailLabel.textContent = 'Interest Spotlight';

      detailTitle.style.opacity = '0';
      detailDesc.style.opacity = '0';

      setTimeout(() => {
        detailTitle.textContent = item.dataset.label;
        detailDesc.textContent = item.dataset.desc;
        detailTitle.style.opacity = '1';
        detailDesc.style.opacity = '1';
      }, 200);
    });
  });

  /* ================= CONTACT FORM ================= */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  function showError(id, msg) {
    const el = document.getElementById(id);
    const field = el.closest('.form-field');
    el.textContent = msg;
    el.classList.add('show');
    field.classList.add('error');
  }

  function clearError(id) {
    const el = document.getElementById(id);
    const field = el.closest('.form-field');
    el.classList.remove('show');
    field.classList.remove('error');
  }

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    nameInput.addEventListener('input', () => {
      nameInput.value = nameInput.value.replace(/[^a-zA-Z\s]/g, '');
      clearError('nameError');
    });

    phoneInput.addEventListener('input', () => {
      phoneInput.value = phoneInput.value.replace(/[^0-9]/g, '');
      clearError('phoneError');
    });

    emailInput.addEventListener('input', () => clearError('emailError'));
    messageInput.addEventListener('input', () => clearError('messageError'));

    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      clearError('nameError'); clearError('phoneError'); clearError('emailError'); clearError('messageError');

      if (!/^[a-zA-Z\s]{2,30}$/.test(name)) { showError('nameError', 'Only letters allowed, max 30 characters.'); valid = false; }
      if (!/^[0-9]{10}$/.test(phone)) { showError('phoneError', 'Enter valid 10-digit number.'); valid = false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError('emailError', 'Invalid email.'); valid = false; }
      if (!message) { showError('messageError', 'Enter message.'); valid = false; }

      if (valid) {
        const btn = contactForm.querySelector('.btn-submit');
        btn.style.opacity = '0.6';
        btn.disabled = true;

        setTimeout(() => {
          formSuccess.classList.add('show');
          contactForm.reset();
          btn.style.opacity = '1';
          btn.disabled = false;

          setTimeout(() => formSuccess.classList.remove('show'), 4000);
        }, 1200);
      }
    });
  }

  /* ================= STORY ANIMATION ================= */
  const storySection = document.querySelector('#story');

  const storyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelector('.story-animate')?.classList.add('in');
        document.querySelector('.story-timeline')?.classList.add('in');
      }
    });
  }, { threshold: 0.3 });

  if (storySection) storyObserver.observe(storySection);
  /* ================= AWARDS STACK ================= */

const cards = document.querySelectorAll('.award-card');
const nextBtn = document.querySelector('.aw-nav.next');
const prevBtn = document.querySelector('.aw-nav.prev');

let index = 0;

function updateAwards() {
  cards.forEach((card, i) => {
    card.className = 'award-card';

    if (i === index) {
      card.classList.add('active');
    } 
    else if (i === (index + 1) % cards.length) {
      card.classList.add('next');
    } 
    else if (i === (index - 1 + cards.length) % cards.length) {
      card.classList.add('prev');
    } 
    else if (i === (index + 2) % cards.length) {
      card.classList.add('next2');
    } 
    else if (i === (index - 2 + cards.length) % cards.length) {
      card.classList.add('prev2');
    }
  });
}

/* ARROWS */
nextBtn.addEventListener('click', () => {
  index = (index + 1) % cards.length;
  updateAwards();
});

prevBtn.addEventListener('click', () => {
  index = (index - 1 + cards.length) % cards.length;
  updateAwards();
});

/* AUTO ANIMATION */
setInterval(() => {
  index = (index + 1) % cards.length;
  updateAwards();
}, 4000);

/* INIT */
updateAwards();

});

