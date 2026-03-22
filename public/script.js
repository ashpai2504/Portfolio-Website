/* ============================================
   DATA
   ============================================ */
const TYPING_STRINGS = [
  'Computer Science @ ASU',
  'AI & Machine Learning Engineer',
  'Full-Stack Developer',
  'Data Science Enthusiast',
  'Building the Future with Code'
];

const SKILLS_DATA = [
  { icon: '⚡', title: 'Programming Languages', items: ['Python','Java','C/C++','C#','R','JavaScript','Swift','Go','MATLAB','HTML/CSS'] },
  { icon: '🧠', title: 'ML & Data Science', items: ['PyTorch','Scikit-learn','vLLM','TensorFlow','Pandas','GeoPandas','NumPy','PySpark','Matplotlib','Seaborn','ArcPy'] },
  { icon: '☁️', title: 'Cloud & Distributed', items: ['AWS','Redis','Apache Spark','Hadoop','Docker','Kubernetes','Kafka'] },
  { icon: '🗄️', title: 'Databases', items: ['SQL','PostgreSQL','MongoDB','Neo4j'] },
  { icon: '🛠️', title: 'Frameworks & Tools', items: ['Flask','Django','React','Node.js','ROS','REST APIs','GitHub','Linux','ArcGIS Pro','Tableau','Power BI'] }
];

/* ============================================
   LENIS SMOOTH SCROLL
   ============================================ */
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  touchMultiplier: 2
});
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

gsap.registerPlugin(ScrollTrigger);

/* ============================================
   GALAXY CANVAS (warm gold/amber theme)
   ============================================ */
(function initGalaxy() {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let w, h;
  let scrollY = 0;
  let mouseX = 0, mouseY = 0;

  /* Star layers: warm palette */
  const LAYERS = [
    { count: 350, speed: 0.01,  maxR: 0.7,  colors: [[255,255,240],[255,248,220],[255,255,255]] },
    { count: 150, speed: 0.03,  maxR: 1.1,  colors: [[245,200,66],[255,180,50],[255,220,120]] },
    { count: 60,  speed: 0.07,  maxR: 1.6,  colors: [[155,109,255],[180,130,255],[200,160,255]] },
    { count: 25,  speed: 0.12,  maxR: 2.2,  colors: [[255,140,66],[255,100,50],[255,160,80]] }
  ];

  /* Galaxy arm star clusters */
  const CLUSTERS = [];

  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });
  window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; }, { passive: true });

  function resize() {
    const dpr = Math.min(window.devicePixelRatio, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  let stars = [];
  function createStars() {
    stars = [];
    LAYERS.forEach(layer => {
      for (let i = 0; i < layer.count; i++) {
        const col = layer.colors[Math.floor(Math.random() * layer.colors.length)];
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h * 5,
          r: Math.random() * layer.maxR + 0.15,
          speed: layer.speed * (0.7 + Math.random() * 0.6),
          col,
          alpha: Math.random() * 0.7 + 0.3,
          twinkleSpeed: Math.random() * 0.018 + 0.004,
          twinklePhase: Math.random() * Math.PI * 2
        });
      }
    });
  }

  /* Draw a glowing galactic nebula cloud in the background */
  function drawGalacticCore() {
    /* Warm galactic center glow — top-right area */
    const gx = w * 0.72, gy = h * 0.3;
    const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, 350);
    grad.addColorStop(0, 'rgba(245,180,60,0.045)');
    grad.addColorStop(0.3, 'rgba(220,140,40,0.025)');
    grad.addColorStop(0.7, 'rgba(155,109,255,0.015)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    /* Secondary purple nebula — left side */
    const gx2 = w * 0.2, gy2 = h * 0.6;
    const grad2 = ctx.createRadialGradient(gx2, gy2, 0, gx2, gy2, 280);
    grad2.addColorStop(0, 'rgba(155,109,255,0.04)');
    grad2.addColorStop(0.5, 'rgba(100,70,200,0.02)');
    grad2.addColorStop(1, 'transparent');
    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, w, h);
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, w, h);
    frame++;

    drawGalacticCore();

    const mxN = (mouseX / (w || 1) - 0.5) * 2;
    const myN = (mouseY / (h || 1) - 0.5) * 2;

    for (const s of stars) {
      const rawY = (s.y - scrollY * s.speed * 2.5) % (h * 5);
      const drawY = rawY < 0 ? rawY + h * 5 : rawY;
      if (drawY < -5 || drawY > h + 5) continue;

      const parallaxX = s.x + mxN * s.speed * 18;
      const parallaxY = drawY + myN * s.speed * 18;

      const tw = Math.sin(frame * s.twinkleSpeed + s.twinklePhase) * 0.32 + 0.68;
      const a = s.alpha * tw;
      const [r, g, b] = s.col;

      ctx.beginPath();
      ctx.arc(parallaxX, parallaxY, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${a.toFixed(2)})`;
      ctx.fill();

      /* Glow halo for brighter stars */
      if (s.r > 1.0) {
        const halo = ctx.createRadialGradient(parallaxX, parallaxY, 0, parallaxX, parallaxY, s.r * 5);
        halo.addColorStop(0, `rgba(${r},${g},${b},${(a * 0.18).toFixed(3)})`);
        halo.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(parallaxX, parallaxY, s.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();
      }

      /* Cross diffraction spike for very bright stars */
      if (s.r > 1.8) {
        const spikeA = a * 0.25;
        ctx.strokeStyle = `rgba(${r},${g},${b},${spikeA.toFixed(2)})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(parallaxX - s.r * 6, parallaxY);
        ctx.lineTo(parallaxX + s.r * 6, parallaxY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(parallaxX, parallaxY - s.r * 6);
        ctx.lineTo(parallaxX, parallaxY + s.r * 6);
        ctx.stroke();
      }
    }

    requestAnimationFrame(draw);
  }

  resize(); createStars(); draw();
  window.addEventListener('resize', () => { resize(); createStars(); });
})();

/* ============================================
   CURSOR TRAIL CANVAS
   ============================================ */
(function initCursorTrail() {
  const canvas = document.getElementById('cursor-trail');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h;
  const particles = [];
  let mx = 0, my = 0;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });

  function tick() {
    ctx.clearRect(0, 0, w, h);

    if (Math.random() < 0.5) {
      particles.push({
        x: mx + (Math.random() - 0.5) * 8,
        y: my + (Math.random() - 0.5) * 8,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6 - 0.3,
        life: 1,
        decay: Math.random() * 0.015 + 0.01,
        r: Math.random() * 2.5 + 0.5,
        hue: Math.random() > 0.5 ? 45 : 35  /* gold tones */
      });
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      p.life -= p.decay;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue},80%,65%,${p.life * 0.35})`;
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }

  resize(); tick();
  window.addEventListener('resize', resize);
})();

/* ============================================
   CUSTOM CURSOR
   ============================================ */
const cursorDot = document.getElementById('cursor-dot');
const cursorGlow = document.getElementById('cursor-glow');
let mx = 0, my = 0, gx = 0, gy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursorDot.style.left = mx + 'px';
  cursorDot.style.top = my + 'px';
}, { passive: true });

(function animGlow() {
  gx += (mx - gx) * 0.08;
  gy += (my - gy) * 0.08;
  cursorGlow.style.left = gx + 'px';
  cursorGlow.style.top = gy + 'px';
  requestAnimationFrame(animGlow);
})();

const hoverEls = 'a, button, .project-slide, .timeline-card, .edu-card, .skill-pill, .magnetic, .header-profile, .contact-card, .tilt-card';
document.addEventListener('mouseover', e => { if (e.target.closest(hoverEls)) cursorDot.classList.add('hover'); });
document.addEventListener('mouseout', e => { if (e.target.closest(hoverEls)) cursorDot.classList.remove('hover'); });

/* ============================================
   MAGNETIC EFFECT
   ============================================ */
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const dy = (e.clientY - rect.top - rect.height / 2) / rect.height;
    gsap.to(el, { x: dx * 14, y: dy * 14, duration: 0.3, ease: 'power2.out' });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.3)' });
  });
});

/* ============================================
   3D TILT EFFECT ON CARDS
   ============================================ */
document.querySelectorAll('.tilt-card').forEach(card => {
  const glowEl = card.querySelector('.edu-card-glow');

  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * 10;
    const rotateY = (x - 0.5) * 10;

    gsap.to(card, {
      rotateX, rotateY,
      transformPerspective: 800,
      duration: 0.4, ease: 'power2.out'
    });

    if (glowEl) {
      glowEl.style.background = `radial-gradient(ellipse at ${x * 100}% ${y * 100}%, rgba(245,200,66,0.07), transparent 60%)`;
    }

    card.style.setProperty('--mouse-x', (x * 100) + '%');
    card.style.setProperty('--mouse-y', (y * 100) + '%');
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' });
  });
});

/* ============================================
   PROFILE LIGHTBOX
   ============================================ */
const profileLightbox = document.getElementById('profile-lightbox');
document.getElementById('header-profile').addEventListener('click', () => profileLightbox.classList.add('open'));
profileLightbox.addEventListener('click', () => profileLightbox.classList.remove('open'));
document.addEventListener('keydown', e => { if (e.key === 'Escape') profileLightbox.classList.remove('open'); });

/* ============================================
   HEADER
   ============================================ */
const header = document.getElementById('header');
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 60), { passive: true });
menuToggle.addEventListener('click', () => { menuToggle.classList.toggle('open'); nav.classList.toggle('open'); });
document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => { menuToggle.classList.remove('open'); nav.classList.remove('open'); }));

const sectionEls = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
sectionEls.forEach(sec => {
  ScrollTrigger.create({
    trigger: sec, start: 'top center', end: 'bottom center',
    onEnter: () => setActiveNav(sec.id),
    onEnterBack: () => setActiveNav(sec.id)
  });
});
function setActiveNav(id) {
  navLinks.forEach(l => l.classList.remove('active'));
  const a = document.querySelector(`.nav-link[data-section="${id}"]`);
  if (a) a.classList.add('active');
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) lenis.scrollTo(target, { offset: -70 });
  });
});

/* ============================================
   TEXT SCRAMBLE EFFECT (on nav hover)
   ============================================ */
const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#________';
document.querySelectorAll('.nav-link span[data-text]').forEach(el => {
  const original = el.getAttribute('data-text');
  let interval;

  el.closest('.nav-link').addEventListener('mouseenter', () => {
    let iteration = 0;
    clearInterval(interval);
    interval = setInterval(() => {
      el.textContent = original.split('').map((char, i) => {
        if (i < iteration) return original[i];
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }).join('');
      if (iteration >= original.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 30);
  });

  el.closest('.nav-link').addEventListener('mouseleave', () => {
    clearInterval(interval);
    el.textContent = original;
  });
});

/* ============================================
   SPLIT TEXT INTO CHARS (excluding contact heading)
   ============================================ */
document.querySelectorAll('[data-split-text]').forEach(el => {
  const text = el.textContent;
  el.innerHTML = '';
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span');
    span.className = 'char';
    span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
    el.appendChild(span);
  }
});

/* Contact heading handled separately (uses data-split-contact) */
const contactH = document.querySelector('[data-split-contact]');
if (contactH) {
  const text = contactH.textContent;
  contactH.innerHTML = '';
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span');
    span.className = 'char';
    span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
    contactH.appendChild(span);
  }
}

/* ============================================
   HERO ANIMATIONS
   ============================================ */
const heroTl = gsap.timeline({ delay: 0.3 });

heroTl.to('.hero-badge', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.2);

heroTl.to('.hero-name .char', {
  opacity: 1, y: 0, rotateX: 0,
  stagger: 0.03, duration: 0.9, ease: 'power3.out'
}, 0.5);

heroTl.to('.hero-title-wrapper', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 1.1);

heroTl.from('.hero-btn', {
  opacity: 0, y: 25, stagger: 0.12, duration: 0.7, ease: 'power3.out'
}, 1.3);

heroTl.from('.scroll-cta', { opacity: 0, y: 15, duration: 0.6, ease: 'power3.out' }, 1.7);

/* Hero parallax on scroll */
gsap.to('.hero-content', {
  yPercent: 40, opacity: 0,
  scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 0.5 }
});
gsap.to('.hero-depth-layer', {
  yPercent: -25,
  scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 0.8 }
});

/* Planet parallax */
gsap.to('.planet', {
  y: -200, opacity: 0.1,
  scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 }
});

/* ============================================
   TYPING EFFECT
   ============================================ */
(function initTyping() {
  const el = document.getElementById('typed-text');
  let si = 0, ci = 0, del = false;
  function tick() {
    const s = TYPING_STRINGS[si];
    if (del) {
      el.textContent = s.substring(0, ci--);
      if (ci < 0) { del = false; si = (si + 1) % TYPING_STRINGS.length; setTimeout(tick, 400); return; }
      setTimeout(tick, 25);
    } else {
      el.textContent = s.substring(0, ci++);
      if (ci > s.length) { del = true; setTimeout(tick, 2200); return; }
      setTimeout(tick, 55);
    }
  }
  setTimeout(tick, 1800);
})();

/* ============================================
   SECTION ANIMATIONS
   ============================================ */
document.querySelectorAll('.section-title').forEach(title => {
  gsap.to(title.querySelectorAll('.char'), {
    opacity: 1, y: 0,
    stagger: 0.025, duration: 0.7, ease: 'power3.out',
    scrollTrigger: { trigger: title, start: 'top 85%' }
  });
});

if (contactH) {
  gsap.to(contactH.querySelectorAll('.char'), {
    opacity: 1, y: 0,
    stagger: 0.02, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: contactH, start: 'top 85%' }
  });
}

gsap.utils.toArray('.section-label').forEach(label => {
  gsap.from(label, {
    opacity: 0, x: -30, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: label, start: 'top 90%' }
  });
});

/* ============================================
   EDUCATION
   ============================================ */
gsap.from('.edu-hero', {
  scale: 0.92, opacity: 0, duration: 1.2, ease: 'power3.out',
  scrollTrigger: { trigger: '.edu-hero', start: 'top 85%' }
});

/* Image parallax */
gsap.to('.asu-campus-img', {
  yPercent: 15,
  scrollTrigger: { trigger: '.edu-hero', start: 'top bottom', end: 'bottom top', scrub: 0.5 }
});

gsap.from('.edu-cards .edu-card:first-child', {
  x: -80, opacity: 0, rotateY: 5, duration: 0.9, ease: 'power3.out',
  scrollTrigger: { trigger: '.edu-cards', start: 'top 85%' }
});
gsap.from('.edu-cards .edu-card:last-child', {
  x: 80, opacity: 0, rotateY: -5, duration: 0.9, ease: 'power3.out',
  scrollTrigger: { trigger: '.edu-cards', start: 'top 85%' }
});

/* ============================================
   EXPERIENCE: TIMELINE
   ============================================ */
gsap.from('.timeline-line', {
  scaleY: 0, transformOrigin: 'top',
  scrollTrigger: { trigger: '.timeline', start: 'top 80%', end: 'bottom 60%', scrub: 0.5 }
});

gsap.utils.toArray('.timeline-item').forEach((item, i) => {
  gsap.from(item, {
    opacity: 0, x: -50, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: item, start: 'top 85%' },
    delay: i * 0.15
  });
  gsap.from(item.querySelector('.timeline-dot'), {
    scale: 0, duration: 0.5, ease: 'back.out(3)',
    scrollTrigger: { trigger: item, start: 'top 85%' },
    delay: i * 0.15 + 0.2
  });
});

/* ============================================
   PROJECTS: HORIZONTAL SCROLL
   ============================================ */
const track = document.getElementById('projects-track');
if (track) {
  const totalScroll = () => track.scrollWidth - window.innerWidth;

  const horizontalScroll = gsap.to(track, {
    x: () => -totalScroll(),
    ease: 'none',
    scrollTrigger: {
      trigger: '#projects',
      start: 'top top',
      end: () => '+=' + totalScroll(),
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });

  track.querySelectorAll('.project-slide').forEach((slide, i) => {
    gsap.from(slide, {
      opacity: 0, scale: 0.9,
      duration: 0.8, ease: 'power3.out',
      scrollTrigger: {
        trigger: slide,
        containerAnimation: horizontalScroll,
        start: 'left 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });
}

/* ============================================
   SKILLS: ACCORDION BUILD & ANIMATE
   ============================================ */
(function initSkills() {
  const grid = document.getElementById('skills-grid');

  SKILLS_DATA.forEach((cat, idx) => {
    const card = document.createElement('div');
    card.className = 'skill-category';
    card.innerHTML = `
      <div class="skill-cat-header">
        <div class="skill-cat-left">
          <span class="skill-cat-icon">${cat.icon}</span>
          <div class="skill-cat-title">${cat.title}</div>
        </div>
        <div style="display:flex;align-items:center;gap:.75rem">
          <span class="skill-cat-count">${cat.items.length} skills</span>
          <div class="skill-cat-arrow">
            <svg viewBox="0 0 12 12" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 4l4 4 4-4"/>
            </svg>
          </div>
        </div>
      </div>
      <div class="skill-items">${cat.items.map((item, i) => `<span class="skill-pill" style="transition-delay:${i * 0.03}s">${item}</span>`).join('')}</div>`;
    grid.appendChild(card);

    /* Mouse glow effect */
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      card.style.setProperty('--mouse-x', (x * 100) + '%');
      card.style.setProperty('--mouse-y', (y * 100) + '%');
    });

    /* Accordion click */
    card.addEventListener('click', () => {
      const wasActive = card.classList.contains('active');
      /* Close all */
      grid.querySelectorAll('.skill-category.active').forEach(c => c.classList.remove('active'));
      /* Open clicked if it wasn't active */
      if (!wasActive) {
        card.classList.add('active');
        /* Stagger pills in */
        const pills = card.querySelectorAll('.skill-pill');
        pills.forEach((pill, i) => {
          pill.style.transitionDelay = (i * 0.025) + 's';
        });
      }
    });
  });

  /* Animate the whole skill list container in on scroll */
  gsap.from('#skills-grid', {
    opacity: 0, y: 50, duration: 0.9, ease: 'power3.out',
    scrollTrigger: { trigger: '#skills-grid', start: 'top 88%' }
  });

  /* Stagger each row in */
  gsap.utils.toArray('.skill-category').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0, x: -30, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: '#skills-grid', start: 'top 85%' },
      delay: i * 0.08
    });
  });

  /* Auto-open the first category */
  setTimeout(() => {
    const first = grid.querySelector('.skill-category');
    if (first) first.click();
  }, 100);
})();

/* ============================================
   CONTACT ANIMATIONS
   ============================================ */
gsap.from('.contact-sub', {
  opacity: 0, y: 25, duration: 0.8, ease: 'power3.out',
  scrollTrigger: { trigger: '.contact-sub', start: 'top 90%' }
});
gsap.from('.contact-card', {
  opacity: 0, y: 30, stagger: 0.12, duration: 0.7, ease: 'power3.out',
  scrollTrigger: { trigger: '.contact-links', start: 'top 90%' }
});

/* ============================================
   COURSEWORK TOGGLE
   ============================================ */
document.querySelectorAll('.coursework-toggle').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    btn.classList.toggle('open');
    btn.nextElementSibling.classList.toggle('open');
  });
});

/* ============================================
   EXPERIENCE EXPAND
   ============================================ */
document.querySelectorAll('.timeline-card').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('expanded'));
});

/* ============================================
   NEBULA GLOWS PER SECTION (warm gold/amber)
   ============================================ */
const sectionGlows = {
  education:  'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245,200,66,0.05) 0%, transparent 70%)',
  experience: 'radial-gradient(ellipse 60% 60% at 20% 50%, rgba(155,109,255,0.04) 0%, transparent 70%)',
  skills:     'radial-gradient(ellipse 60% 60% at 80% 50%, rgba(245,200,66,0.04) 0%, transparent 70%)',
  contact:    'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(255,140,66,0.05) 0%, transparent 70%)'
};

Object.entries(sectionGlows).forEach(([id, bg]) => {
  const sec = document.getElementById(id);
  if (!sec) return;
  const glow = document.createElement('div');
  glow.style.cssText = `position:absolute;inset:-20%;background:${bg};pointer-events:none;z-index:0;opacity:0;transition:opacity 1.2s`;
  sec.style.position = 'relative';
  sec.prepend(glow);

  ScrollTrigger.create({
    trigger: sec, start: 'top 80%', end: 'bottom 20%',
    onEnter:     () => { glow.style.opacity = '1'; },
    onLeave:     () => { glow.style.opacity = '0'; },
    onEnterBack: () => { glow.style.opacity = '1'; },
    onLeaveBack: () => { glow.style.opacity = '0'; }
  });
});

/* ============================================
   PLANET SCROLL PARALLAX (move with page depth)
   ============================================ */
const planet = document.getElementById('planet');
if (planet) {
  window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    planet.style.transform = `translate(${x}px, ${y}px)`;
  }, { passive: true });
}
