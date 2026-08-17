/**
 * HAROON ARIF — PORTFOLIO INTERACTIVE & ANIMATION CONTROLLER
 * 
 * Features:
 * - HTML5 Canvas AI Data Node Network (Interactive mouse attraction/repulsion)
 * - Performance optimized (Pauses canvas when hero is off-screen)
 * - Sticky Navigation & ScrollSpy link highlighting
 * - Mobile drawer toggle
 * - Category filters for Skills & Projects
 * - Certificate Lightbox viewer modal
 * - Client-side form handling & validation
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Canvas Background Visual
  initHeroCanvas();

  // Initialize Navigation Behavior
  initNavigation();

  // Initialize Category Filters
  initFilters();

  // Initialize Certificate Lightbox Modal
  initCertificateModal();

  // Initialize Contact Form
  initContactForm();
});

/* ==========================================================================
   1. Canvas Hero Visual (AI Node & Data Network)
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let animationFrameId;
  let isCanvasVisible = true;

  // Particle configuration
  const particleCount = window.innerWidth < 768 ? 45 : 85;
  const particles = [];
  const maxDistance = 140;
  const mouse = { x: null, y: null, radius: 160 };

  // Adjust canvas size for retina displays
  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }

  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });

  // Track mouse
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 2 + 1;
      this.baseAlpha = Math.random() * 0.5 + 0.3;
      this.pulseSpeed = Math.random() * 0.02 + 0.005;
      this.pulseFactor = 0;
    }

    update() {
      // Movement
      this.x += this.vx;
      this.y += this.vy;

      // Bounce at borders
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse repulsion/interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 2;
          this.y -= Math.sin(angle) * force * 2;
        }
      }

      // Subtle glowing pulse
      this.pulseFactor += this.pulseSpeed;
    }

    draw() {
      const alpha = this.baseAlpha + Math.sin(this.pulseFactor) * 0.2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#38bdf8';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Connect to mouse
      if (mouse.x !== null && mouse.y !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.4;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    if (!isCanvasVisible) return;

    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    connectParticles();
    animationFrameId = requestAnimationFrame(animate);
  }

  resize();
  initParticles();
  animate();

  // Performance Optimization: Pause canvas when hero section is not visible
  const heroSection = document.querySelector('.hero-section');
  if (heroSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isCanvasVisible = true;
          animate();
        } else {
          isCanvasVisible = false;
          cancelAnimationFrame(animationFrameId);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(heroSection);
  }
}

/* ==========================================================================
   2. Sticky Header & Navigation ScrollSpy
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Header Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = navMenu.classList.contains('active');
      navMenu.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = isExpanded ? 'bx bx-menu' : 'bx bx-x';
      }
    });

    // Close menu when link clicked
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'bx bx-menu';
      });
    });
  }

  // ScrollSpy Active Navigation Observer
  if ('IntersectionObserver' in window) {
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { threshold: 0.35 });

    sections.forEach((sec) => spyObserver.observe(sec));
  }
}

/* ==========================================================================
   3. Category Filters (Skills & Projects)
   ========================================================================== */
function initFilters() {
  // Generic filter function
  function setupCategoryFilter(buttonSelector, itemSelector, dataAttr) {
    const buttons = document.querySelectorAll(buttonSelector);
    const items = document.querySelectorAll(itemSelector);

    if (!buttons.length || !items.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filterVal = btn.getAttribute('data-filter');

        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        items.forEach((item) => {
          const category = item.getAttribute(dataAttr);
          if (filterVal === 'all' || category === filterVal || (category && category.includes(filterVal))) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 200);
          }
        });
      });
    });
  }

  // Skills filter setup
  setupCategoryFilter('.skills-filter .filter-btn', '.skill-category-card', 'data-category');

  // Projects filter setup
  setupCategoryFilter('.projects-filter .filter-btn', '.project-card', 'data-category');
}

/* ==========================================================================
   4. Certificate Lightbox Modal
   ========================================================================== */
function initCertificateModal() {
  const certCards = document.querySelectorAll('.cert-card');
  const modal = document.getElementById('cert-modal');
  if (!modal) return;

  const modalImg = document.getElementById('modal-cert-img');
  const modalTitle = document.getElementById('modal-cert-title');
  const modalDesc = document.getElementById('modal-cert-desc');
  const closeBtn = modal.querySelector('.modal-close-btn');

  certCards.forEach((card) => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const title = card.querySelector('.cert-title');
      const desc = card.querySelector('.cert-desc');

      if (img && modalImg) modalImg.src = img.src;
      if (title && modalTitle) modalTitle.textContent = title.textContent;
      if (desc && modalDesc) modalDesc.textContent = desc.textContent;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. Contact Form Handler
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('form-alert');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const subject = form.querySelector('[name="subject"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      showAlert('Please fill in all required fields (Name, Email, Message).', 'error');
      return;
    }

    if (!validateEmail(email)) {
      showAlert('Please enter a valid email address.', 'error');
      return;
    }

    // Submit feedback
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';

    // Simulate clean form submission
    setTimeout(() => {
      showAlert('Thank you! Your message has been sent successfully. I will get back to you shortly.', 'success');
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }, 1200);
  });

  function showAlert(msg, type) {
    if (!alertBox) return;
    alertBox.textContent = msg;
    alertBox.className = `form-alert ${type}`;
    alertBox.style.display = 'block';

    setTimeout(() => {
      alertBox.style.display = 'none';
    }, 6000);
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
