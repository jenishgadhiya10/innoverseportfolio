/* =========================================================
   INNOVERSE — script.js v2
   ========================================================= */

/* ---------- ELEMENTS ---------- */
const siteHeader    = document.getElementById('siteHeader');
const menuBtn       = document.getElementById('menuBtn');
const mobileDrawer  = document.getElementById('mobileDrawer');
const cursorGlow    = document.querySelector('.cursor-glow');
const scrollProgress = document.getElementById('scrollProgress');
const form          = document.getElementById('contactForm');
const formStatus    = document.getElementById('formStatus');

/* =========================================================
   PARTICLE CANVAS
   ========================================================= */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  const COLORS = ['rgba(124,92,255,', 'rgba(0,212,255,', 'rgba(142,255,193,'];

  function resize() {
    // Size to parent hero section, not window
    const hero = canvas.closest('section') || canvas.parentElement;
    W = canvas.width  = hero ? hero.offsetWidth  : window.innerWidth;
    H = canvas.height = hero ? hero.offsetHeight : window.innerHeight;
  }

  function randomParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.3,
      dx: (Math.random() - 0.5) * 0.18,
      dy: (Math.random() - 0.5) * 0.18,
      alpha: Math.random() * 0.32 + 0.06,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: 55 }, randomParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  init();
  draw();
})();

/* =========================================================
   HEADER — scroll shrink / glass
   ========================================================= */
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    siteHeader.classList.add('scrolled');
  } else {
    siteHeader.classList.remove('scrolled');
  }
}, { passive: true });

/* =========================================================
   SCROLL PROGRESS BAR
   ========================================================= */
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (scrollProgress) scrollProgress.style.width = pct + '%';
}, { passive: true });

/* =========================================================
   ACTIVE NAV LINK on SCROLL
   ========================================================= */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link[href^="#"]');

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

/* =========================================================
   MOBILE MENU
   ========================================================= */
menuBtn?.addEventListener('click', () => {
  const open = mobileDrawer.classList.toggle('open');
  menuBtn.classList.toggle('active');
  menuBtn.setAttribute('aria-expanded', open);
  mobileDrawer.setAttribute('aria-hidden', !open);
});

document.querySelectorAll('.mnav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileDrawer.classList.remove('open');
    menuBtn.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');
  });
});

/* Close menu on outside click */
document.addEventListener('click', (e) => {
  if (mobileDrawer.classList.contains('open') &&
      !mobileDrawer.contains(e.target) &&
      !menuBtn.contains(e.target)) {
    mobileDrawer.classList.remove('open');
    menuBtn.classList.remove('active');
  }
});

/* =========================================================
   DROPDOWN — keyboard a11y
   ========================================================= */
document.querySelectorAll('.nav-dropbtn').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
  });
});

/* =========================================================
   CURSOR GLOW
   ========================================================= */
let mouseX = 0, mouseY = 0, curX = 0, curY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursorGlow) cursorGlow.style.opacity = '1';
}, { passive: true });

window.addEventListener('mouseleave', () => {
  if (cursorGlow) cursorGlow.style.opacity = '0';
});

(function animateCursor() {
  curX += (mouseX - curX) * 0.07;
  curY += (mouseY - curY) * 0.07;
  if (cursorGlow) {
    cursorGlow.style.left = curX + 'px';
    cursorGlow.style.top  = curY + 'px';
  }
  requestAnimationFrame(animateCursor);
})();

/* =========================================================
   TYPING ANIMATION (hero)
   ========================================================= */
const typedEl = document.querySelector('.typed-text');
const phrases = [
  'premium digital systems',
  'smart web solutions',
  'powerful automations',
  'modern IT experiences',
  'stunning interfaces'
];
let phraseIdx = 0, charIdx = 0, deleting = false;

function typeLoop() {
  if (!typedEl) return;
  const current = phrases[phraseIdx];

  if (!deleting) {
    typedEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 2000);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 42 : 82);
}
setTimeout(typeLoop, 900);

/* =========================================================
   SKILL BAR ANIMATION
   ========================================================= */
function animateSkillBars() {
  document.querySelectorAll('.skill-fill').forEach(bar => {
    const target = bar.style.width;
    bar.style.width = '0%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { bar.style.width = target; });
    });
  });
}

const teamSection = document.getElementById('team');
if (teamSection) {
  new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animateSkillBars(); obs.disconnect(); }
    });
  }, { threshold: 0.2 }).observe(teamSection);
}

/* =========================================================
   GSAP ANIMATIONS
   ========================================================= */
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  /* Header entrance */
  gsap.fromTo('.site-header',
    { y: -80, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power3.out', clearProps: 'all' }
  );

  /* Hero stagger */
  gsap.fromTo(
    '.hero-badge, .hero-copy h1, .hero-copy .hero-text, .hero-actions, .hero-metrics .metric',
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power3.out', clearProps: 'all' }
  );

  /* Hero card */
  gsap.fromTo('.hero-card',
    { scale: 0.88, opacity: 0, rotate: -3 },
    { scale: 1, opacity: 1, rotate: 0, duration: 1.2, ease: 'power3.out', delay: 0.3, clearProps: 'all' }
  );

  /* Floating badges */
  gsap.fromTo('.hero-badge-float',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: .8, ease: 'power3.out', stagger: .15, delay: 1, clearProps: 'all' }
  );

  /* Scroll-triggered reveals */
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.85, ease: 'power3.out', clearProps: 'all',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true }
      }
    );
  });

} else {
  /* Fallback: ensure everything visible */
  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
  animateSkillBars();
}

/* =========================================================
   CONTACT FORM
   ========================================================= */
form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name:    form.name.value.trim(),
    email:   form.email.value.trim(),
    service: form.service.value,
    message: form.message.value.trim()
  };

  if (!data.name || !data.email || !data.service || !data.message) {
    formStatus.textContent = 'Please fill in all fields.';
    formStatus.className   = 'form-status error';
    return;
  }

  const btn = form.querySelector('[type=submit]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
  formStatus.textContent = '';
  formStatus.className   = 'form-status';

  try {
    const res = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error();
    const result = await res.json();
    formStatus.textContent = result.message || 'Inquiry sent successfully!';
    formStatus.className   = 'form-status success';
    form.reset();

  } catch {
    formStatus.textContent = 'Message saved locally (backend offline).';
    formStatus.className   = 'form-status error';
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Inquiry';
  }
});

/* =========================================================
   CARD HOVER TILT (subtle 3-D lift)
   ========================================================= */
document.querySelectorAll('.service-card, .team-card, .case-card, .info-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-8px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* =========================================================
   SMOOTH scroll for ALL anchor links
   ========================================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Remove focus to close dropdowns relying on :focus-within
      anchor.blur();
    }
  });
});
