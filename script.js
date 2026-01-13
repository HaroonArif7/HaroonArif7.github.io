function toggleTheme() {
  document.body.classList.toggle('light');
}

function toggleMenu() {
  const menu = document.getElementById('menu');
  const isOpen = getComputedStyle(menu).display !== 'none';
  menu.style.display = isOpen ? 'none' : 'flex';
}

// Simple reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add('reveal');
  });
});
document.querySelectorAll('.section, .card, figure').forEach(el => observer.observe(el));

