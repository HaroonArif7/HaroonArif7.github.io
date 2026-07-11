// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Nav scroll state
const nav = document.getElementById('nav');
const scanProgress = document.getElementById('scanProgress');

function onScroll(){
  nav.classList.toggle('scrolled', window.scrollY > 40);
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  scanProgress.style.width = scrolled + '%';
}
document.addEventListener('scroll', onScroll);
onScroll();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle?.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal, .reveal-line');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if(entry.isIntersecting){
      setTimeout(() => entry.target.classList.add('in-view'), i * 40);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Reveal hero immediately on load (it's above the fold)
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .reveal, .hero .reveal-line').forEach((el, i) => {
    setTimeout(() => el.classList.add('in-view'), 150 + i * 120);
  });
});

// Contact form -> mailto
const form = document.getElementById('contactForm');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get('name');
  const email = data.get('email');
  const message = data.get('message');
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  // Replace the address below with your real email
  window.location.href = `mailto:youremail@example.com?subject=${subject}&body=${body}`;
});
