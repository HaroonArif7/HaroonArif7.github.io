/* ─── Year ─── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ─── Nav toggle ─── */
const toggle  = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');

toggle.addEventListener('click', () => {
  const open = navList.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
navList.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navList.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

/* ─── prefers-reduced-motion ─── */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─── Hero SVG animation ─── */
const heroLine = document.getElementById('hero-line');
const heroArea = document.getElementById('hero-area');
const heroDots = document.getElementById('hero-dots');
const heroTip  = document.getElementById('hero-tip');

if (prefersReduced) {
  heroLine.style.strokeDashoffset = '0';
  heroArea.style.opacity = '.35';
  heroDots.style.opacity = '1';
  heroTip.style.opacity  = '1';
} else {
  requestAnimationFrame(() => {
    heroLine.style.transition = 'stroke-dashoffset 1.9s cubic-bezier(.4,0,.2,1)';
    heroLine.style.strokeDashoffset = '0';
    heroArea.style.transition = 'opacity 1.4s ease 0.7s';
    heroArea.style.opacity = '.35';
    heroDots.style.transition = 'opacity .45s ease 1.6s';
    heroDots.style.opacity = '1';
    heroTip.style.transition = 'opacity .4s ease 2s';
    heroTip.style.opacity = '1';
  });
}

/* ─── Scroll-reveal + Skill bars ─── */
const revealEls = document.querySelectorAll('.reveal');
const skillBars = document.querySelectorAll('.skill-bar');
let barsAnimated = false;

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

// Skill bars — observe the skills section
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  const barsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateBars();
      barsObserver.unobserve(skillsSection);
    }
  }, { threshold: 0.1 });
  barsObserver.observe(skillsSection);
}

function animateBars() {
  if (barsAnimated) return;
  barsAnimated = true;
  skillBars.forEach((bar, i) => {
    const w = bar.dataset.width;
    if (prefersReduced) {
      bar.style.width = w + '%';
    } else {
      setTimeout(() => { bar.style.width = w + '%'; }, i * 65);
    }
  });
}

/* ─── Certificate Lightbox ─── */
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

function openLightboxFor(thumb) {
  const src = thumb.dataset.full || thumb.querySelector('img').src;
  lightboxImg.src = src;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  lightboxClose.focus();
  document.body.style.overflow = 'hidden';
}

document.querySelectorAll('.cert-thumb').forEach(thumb => {
  thumb.addEventListener('click', () => openLightboxFor(thumb));
  thumb.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightboxFor(thumb);
    }
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImg.src = '';
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox(); });

/* ─── Contact form (mailto fallback) ─── */
const form   = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', e => {
  e.preventDefault();
  const name    = form.elements['name'].value.trim();
  const email   = form.elements['email'].value.trim();
  const subject = form.elements['subject'].value.trim() || 'Portfolio Enquiry';
  const message = form.elements['message'].value.trim();

  if (!name || !email || !message) {
    status.className = 'form-message error';
    status.textContent = 'Please fill in your name, email, and message.';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    status.className = 'form-message error';
    status.textContent = 'Please enter a valid email address.';
    return;
  }

  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href =
    `mailto:hafizharoonarif@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

  status.className = 'form-message success';
  status.textContent = '✓ Opening your email client… Thanks for reaching out!';
  form.reset();
});
