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
  { icon: '⚡', title: 'Programming Languages', slug: 'Programming-Languages', items: ['Python','Java','C/C++','C#','R','JavaScript','Swift','Go','MATLAB','HTML/CSS'] },
  { icon: '🧠', title: 'ML & Data Science', slug: 'ML-Data-Science', items: ['PyTorch','Scikit-learn','vLLM','TensorFlow','Pandas','GeoPandas','NumPy','PySpark','Matplotlib','Seaborn','ArcPy'] },
  { icon: '☁️', title: 'Cloud & Distributed', slug: 'Cloud-Distributed', items: ['AWS','Redis','Apache Spark','Hadoop','Docker','Kubernetes','Kafka'] },
  { icon: '🗄️', title: 'Databases', slug: 'Databases', items: ['SQL','PostgreSQL','MongoDB','Neo4j'] },
  { icon: '🛠️', title: 'Frameworks & Tools', slug: 'Frameworks-Tools', items: ['Flask','Django','React','Node.js','ROS','REST APIs','GitHub','Linux','ArcGIS Pro','Tableau','Power BI'] }
];

const PROJECTS_DATA = [
  { title: 'AI Salon Booking System', desc: 'GPT-4 powered dual-interface booking with voice, SMS & web chat. Real-time scheduling with multi-stylist availability.', tags: ['React','Next.js','FastAPI','GPT-4o','Twilio'], img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80' },
  { title: 'Gamebloc', desc: 'Real-time sports social platform with live match chats for 100+ concurrent games. Per-game chat, persistent history, and social profiles.', tags: ['Next.js','React','MongoDB','Socket.IO'], img: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=800&q=80' },
  { title: 'J Miller Custom Cues 3D', desc: 'Interactive Three.js application for real-time 360° visualization of pool cues with 50+ wood options and e-commerce integration.', tags: ['Three.js','React','Blender','3D'], img: 'https://images.unsplash.com/photo-1615722550622-955b714ed31d?w=800&q=80', cueProject: true },
  { title: 'UNLEARN-BENCH', desc: 'Bias unlearning benchmark evaluating five methods across 7 demographic datasets on Phi-3.5, Qwen2.5, Mamba — achieving over 40% bias reduction.', tags: ['PyTorch','HuggingFace','Python'], img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80' },
  { title: 'Real-Time Graph Analytics', desc: 'Distributed graph processing of NYC taxi data with Neo4j + PageRank, scaled to 1100+ msgs/sec through Kafka and Kubernetes.', tags: ['Neo4j','Spark','Kafka','K8s','Docker'], img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80' }
];

/* ============================================
   LENIS SMOOTH SCROLL
   ============================================ */
const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), touchMultiplier: 2 });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
gsap.registerPlugin(ScrollTrigger);

/* ============================================
   OPTIMIZED GALAXY CANVAS
   ============================================ */
(function initGalaxy() {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let w, h, scrollY = 0, dpr = 1;

  const STAR_COUNT = 200;
  let stars = [];

  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

  function resize() {
    dpr = Math.min(window.devicePixelRatio, 1.5);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createStars() {
    stars = [];
    const colors = [[255,255,240],[245,200,66],[155,109,255],[255,140,66]];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h * 4,
        r: Math.random() * 1.4 + 0.2,
        speed: Math.random() * 0.08 + 0.01,
        col: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.3,
        twinkleSpeed: Math.random() * 0.015 + 0.003,
        twinklePhase: Math.random() * 6.28
      });
    }
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, w, h);
    frame++;

    for (const s of stars) {
      const rawY = (s.y - scrollY * s.speed * 2) % (h * 4);
      const drawY = rawY < 0 ? rawY + h * 4 : rawY;
      if (drawY < -2 || drawY > h + 2) continue;

      const tw = Math.sin(frame * s.twinkleSpeed + s.twinklePhase) * 0.3 + 0.7;
      const a = s.alpha * tw;
      const [r, g, b] = s.col;

      ctx.beginPath();
      ctx.arc(s.x, drawY, s.r, 0, 6.28);
      ctx.fillStyle = `rgba(${r},${g},${b},${a.toFixed(2)})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  resize(); createStars(); draw();
  window.addEventListener('resize', () => { resize(); createStars(); });
})();

/* ============================================
   MAGNETIC EFFECT
   ============================================ */
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const dy = (e.clientY - rect.top - rect.height / 2) / rect.height;
    gsap.to(el, { x: dx * 10, y: dy * 10, duration: 0.3, ease: 'power2.out' });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.3)' });
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
   TEXT SCRAMBLE (nav hover)
   ============================================ */
const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#________';
document.querySelectorAll('.nav-link span[data-text]').forEach(el => {
  const original = el.getAttribute('data-text');
  let interval;
  el.closest('.nav-link').addEventListener('mouseenter', () => {
    let iteration = 0;
    clearInterval(interval);
    interval = setInterval(() => {
      el.textContent = original.split('').map((c, i) =>
        i < iteration ? original[i] : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
      ).join('');
      if (iteration >= original.length) clearInterval(interval);
      iteration += 0.5;
    }, 30);
  });
  el.closest('.nav-link').addEventListener('mouseleave', () => { clearInterval(interval); el.textContent = original; });
});

/* ============================================
   SPLIT TEXT INTO CHARS
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
heroTl.to('.hero-name .char', { opacity: 1, y: 0, rotateX: 0, stagger: 0.03, duration: 0.9, ease: 'power3.out' }, 0.5);
heroTl.to('.hero-title-wrapper', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 1.1);
heroTl.from('.hero-btn', { opacity: 0, y: 25, stagger: 0.12, duration: 0.7, ease: 'power3.out' }, 1.3);
heroTl.from('.scroll-cta', { opacity: 0, y: 15, duration: 0.6, ease: 'power3.out' }, 1.7);

gsap.to('.hero-content', {
  yPercent: 40, opacity: 0,
  scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 0.5 }
});

gsap.to('.planet', {
  y: -150, opacity: 0.05,
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
    opacity: 1, y: 0, stagger: 0.025, duration: 0.7, ease: 'power3.out',
    scrollTrigger: { trigger: title, start: 'top 85%' }
  });
});

if (contactH) {
  gsap.to(contactH.querySelectorAll('.char'), {
    opacity: 1, y: 0, stagger: 0.02, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: contactH, start: 'top 85%' }
  });
}

gsap.utils.toArray('.section-label').forEach(label => {
  gsap.from(label, { opacity: 0, x: -30, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: label, start: 'top 90%' } });
});

/* ============================================
   EDUCATION
   ============================================ */
gsap.from('.edu-hero', {
  scale: 0.95, opacity: 0, duration: 1, ease: 'power3.out',
  scrollTrigger: { trigger: '.edu-hero', start: 'top 85%' }
});

gsap.from('.edu-cards .edu-card:first-child', {
  x: -60, opacity: 0, duration: 0.9, ease: 'power3.out',
  scrollTrigger: { trigger: '.edu-cards', start: 'top 85%' }
});
gsap.from('.edu-cards .edu-card:last-child', {
  x: 60, opacity: 0, duration: 0.9, ease: 'power3.out',
  scrollTrigger: { trigger: '.edu-cards', start: 'top 85%' }
});

/* ============================================
   EXPERIENCE TIMELINE
   ============================================ */
gsap.from('.timeline-line', {
  scaleY: 0, transformOrigin: 'top',
  scrollTrigger: { trigger: '.timeline', start: 'top 80%', end: 'bottom 60%', scrub: 0.5 }
});

gsap.utils.toArray('.timeline-item').forEach((item, i) => {
  gsap.from(item, { opacity: 0, x: -40, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: item, start: 'top 85%' }, delay: i * 0.15 });
  gsap.from(item.querySelector('.timeline-dot'), { scale: 0, duration: 0.5, ease: 'back.out(3)',
    scrollTrigger: { trigger: item, start: 'top 85%' }, delay: i * 0.15 + 0.2 });
});

/* ============================================
   PROJECTS: HORIZONTAL SCROLL + CLICK MODAL
   ============================================ */
const track = document.getElementById('projects-track');
if (track) {
  const totalScroll = () => track.scrollWidth - window.innerWidth;
  const horizontalScroll = gsap.to(track, {
    x: () => -totalScroll(), ease: 'none',
    scrollTrigger: { trigger: '#projects', start: 'top top', end: () => '+=' + totalScroll(), scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true }
  });

  track.querySelectorAll('.project-slide').forEach((slide, i) => {
    gsap.from(slide, {
      opacity: 0, scale: 0.92, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: slide, containerAnimation: horizontalScroll, start: 'left 85%', toggleActions: 'play none none reverse' }
    });

    slide.addEventListener('click', () => openProjectModal(i));
  });
}

/* Project Modal Logic */
const projectModal = document.getElementById('project-modal');
const modalImg = projectModal.querySelector('.project-modal-img');
const modalTitle = projectModal.querySelector('.project-modal-title');
const modalDesc = projectModal.querySelector('.project-modal-desc');
const modalTags = projectModal.querySelector('.project-modal-tags');

function openProjectModal(idx) {
  const p = PROJECTS_DATA[idx];
  if (!p) return;

  if (p.cueProject) {
    modalImg.src = 'https://images.unsplash.com/photo-1615722550622-955b714ed31d?w=800&q=80';
  } else {
    modalImg.src = p.img;
  }
  modalTitle.textContent = p.title;
  modalDesc.textContent = p.desc;
  modalTags.innerHTML = p.tags.map(t => `<span>${t}</span>`).join('');
  projectModal.classList.add('open');
}

projectModal.querySelector('.project-modal-close').addEventListener('click', e => {
  e.stopPropagation();
  projectModal.classList.remove('open');
});
projectModal.querySelector('.project-modal-backdrop').addEventListener('click', () => projectModal.classList.remove('open'));
document.addEventListener('keydown', e => { if (e.key === 'Escape') projectModal.classList.remove('open'); });

/* ============================================
   SKILLS: iMAC MONITORS
   ============================================ */
(function initSkills() {
  const grid = document.getElementById('skills-grid');

  SKILLS_DATA.forEach((cat, idx) => {
    const mon = document.createElement('div');
    mon.className = 'imac-monitor';
    mon.innerHTML = `
      <div class="imac-bezel">
        <div class="imac-camera"></div>
        <div class="imac-screen">
          <span class="m-icon">${cat.icon}</span>
          <span class="m-title">${cat.title}</span>
          <span class="m-count">${cat.items.length} skills</span>
        </div>
      </div>
      <div class="imac-chin"><div class="imac-chin-logo"></div></div>
      <div class="imac-stand"><div class="imac-stand-neck"></div><div class="imac-stand-base"></div></div>`;

    if (idx < 3) {
      grid.appendChild(mon);
    } else {
      let bottomRow = grid.querySelector('.imac-row-bottom');
      if (!bottomRow) { bottomRow = document.createElement('div'); bottomRow.className = 'imac-row-bottom'; grid.appendChild(bottomRow); }
      bottomRow.appendChild(mon);
    }

    mon.addEventListener('click', () => openImacOverlay(cat));
  });

  gsap.utils.toArray('.imac-monitor').forEach((mon, i) => {
    gsap.from(mon, {
      opacity: 0, y: 50, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '#skills-grid', start: 'top 85%' },
      delay: i * 0.1
    });
  });
})();

/* iMac Zoom Overlay */
const imacOverlay = document.getElementById('imac-overlay');
const imacZoomedScreen = document.getElementById('imac-zoomed-screen');

function openImacOverlay(cat) {
  const slug = cat.slug || cat.title.replace(/ & /g,'-').replace(/ /g,'-');
  imacZoomedScreen.innerHTML = `
    <div class="term-header">
      <div class="term-dots"><span></span><span></span><span></span></div>
      <span class="term-title">${slug.toLowerCase()}.sh</span>
    </div>
    <div class="term-prompt">$ ls ./skills/${slug}</div>
    <div class="term-skills">
      ${cat.items.map(item => `<span class="term-skill">${item}</span>`).join('')}
    </div>`;
  imacOverlay.classList.add('open');

  const skills = imacZoomedScreen.querySelectorAll('.term-skill');
  skills.forEach((s, i) => {
    s.style.opacity = '0';
    s.style.transform = 'translateY(8px)';
    setTimeout(() => { s.style.transition = 'all .35s cubic-bezier(.16,1,.3,1)'; s.style.opacity = '1'; s.style.transform = 'translateY(0)'; }, 100 + i * 50);
  });
}

function closeImacOverlay() { imacOverlay.classList.remove('open'); }

imacOverlay.querySelector('.imac-overlay-backdrop').addEventListener('click', closeImacOverlay);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && imacOverlay.classList.contains('open')) closeImacOverlay(); });

/* Close on red dot click */
imacOverlay.addEventListener('click', e => {
  const dot = e.target.closest('.term-dots span:first-child');
  if (dot) closeImacOverlay();
});

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
  btn.addEventListener('click', e => { e.stopPropagation(); btn.classList.toggle('open'); btn.nextElementSibling.classList.toggle('open'); });
});

/* ============================================
   EXPERIENCE EXPAND
   ============================================ */
document.querySelectorAll('.timeline-card').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('expanded'));
});

/* ============================================
   PLANET MOUSE PARALLAX
   ============================================ */
const planet = document.getElementById('planet');
if (planet) {
  window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 15;
    const y = (e.clientY / window.innerHeight - 0.5) * 15;
    planet.style.transform = `translate(${x}px, ${y}px)`;
  }, { passive: true });
}
