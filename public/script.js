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
  {
    title: 'AI Salon Booking System',
    bullets: [
      'Collaborated to build dual-interface booking platform using GPT-4 customer agents (Twilio Voice/SMS + web chat) for natural language appointments with speech-to-text, and autonomous owner agent for schedule/promotion management via conversational AI.',
      'Engineered real-time scheduling with promotion system (combo promos, trigger-based eligibility), async backend managing multi-stylist availability, preferred style options, automated confirmations, schedule calendar and time zone aware slot collision prevention.'
    ],
    tags: ['React','Next.js','Tailwind','FastAPI','PostgreSQL','Docker','GPT-4o mini','Twilio'],
    img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80'
  },
  {
    title: 'Gamebloc — Live Sports Social Platform',
    bullets: [
      'Built a real-time sports social platform where fans can join live match chats for 100+ concurrent games across Soccer, NFL, NCAA Football, Basketball, etc. with messages persisting even after the match ends so users can still read and respond to game-time reactions.',
      'Designed a full user profile system with personalized favorite teams, auto-tracked team live statistics, and a direct messaging feature so fans can connect and keep sharing their opinions during and after the match. The only platform combining per-game live chat, persistent history, and social profiles across multiple sports.'
    ],
    tags: ['Next.js','React','Node.js','MongoDB','Socket.IO','ESPN API'],
    img: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=800&q=80'
  },
  {
    title: 'J Miller Custom Cues 3D Modeling Software',
    subtitle: 'Capstone Project',
    bullets: [
      'Developed an interactive Three.js application enabling real-time 360° visualization and customization of pool cues with 50+ wood options, seamlessly integrating with an e-commerce platform to enhance customer purchasing experience.',
      'Implemented advanced camera controls and texture mapping systems allowing customers to visualize customized pool cue designs from any angle and viewing breakdown of components, increasing conversion rates and reducing product returns.'
    ],
    tags: ['Three.js','React','HTML/CSS','Blender'],
    img: 'https://images.unsplash.com/photo-1615722550622-955b714ed31d?w=800&q=80'
  },
  {
    title: 'UNLEARN-BENCH: Bias Unlearning Benchmark',
    bullets: [
      'Evaluated five approximate unlearning methods (Task Vector Negation, PCGU, Gradient Ascent, LoRA, NPO) across 7 diverse demographic datasets on models Phi-3.5, Qwen2.5, Mamba.',
      'Demonstrated substantial bias score reductions across multiple demographic categories with some techniques achieving over 40% improvement and identified trade-offs between bias mitigation and model fluency using contrastive loss and regularization techniques.'
    ],
    tags: ['Python','PyTorch','HuggingFace','NumPy','Pandas','Scikit-learn'],
    img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80'
  },
  {
    title: 'Scalable Real-Time Graph Analytics System',
    bullets: [
      'Mapped and analyzed NYC taxi trip data through a graph processing system using Neo4j, running PageRank and BFS algorithms to identify important pickup/drop-off hubs and find optimal travel routes.',
      'Scaled the system with Apache Spark and Kubernetes into a distributed pipeline processing 1100+ messages per second through Kafka, enabling real-time graph analytics and showing how microservices can keep the system fast, reliable and fault tolerant.'
    ],
    tags: ['Python','Neo4j','Apache Spark','Kubernetes','Kafka','Docker'],
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80'
  }
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

  const STAR_COUNT = 280;
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
    const farColors  = [[255,255,250],[240,240,255],[255,245,230]];
    const midColors  = [[245,200,66],[255,180,100],[200,170,255]];
    const nearColors = [[155,109,255],[255,140,66],[100,180,255]];

    for (let i = 0; i < STAR_COUNT * 0.6; i++) {
      const col = farColors[Math.floor(Math.random() * farColors.length)];
      stars.push({ x: Math.random() * w, y: Math.random() * h * 4, r: Math.random() * 0.7 + 0.15, speed: Math.random() * 0.02 + 0.005, col, alpha: Math.random() * 0.5 + 0.2, twinkleSpeed: Math.random() * 0.01 + 0.002, twinklePhase: Math.random() * 6.28 });
    }
    for (let i = 0; i < STAR_COUNT * 0.3; i++) {
      const col = midColors[Math.floor(Math.random() * midColors.length)];
      stars.push({ x: Math.random() * w, y: Math.random() * h * 4, r: Math.random() * 1.2 + 0.4, speed: Math.random() * 0.05 + 0.02, col, alpha: Math.random() * 0.6 + 0.3, twinkleSpeed: Math.random() * 0.015 + 0.004, twinklePhase: Math.random() * 6.28 });
    }
    for (let i = 0; i < STAR_COUNT * 0.1; i++) {
      const col = nearColors[Math.floor(Math.random() * nearColors.length)];
      stars.push({ x: Math.random() * w, y: Math.random() * h * 4, r: Math.random() * 1.8 + 0.8, speed: Math.random() * 0.1 + 0.04, col, alpha: Math.random() * 0.7 + 0.3, twinkleSpeed: Math.random() * 0.02 + 0.005, twinklePhase: Math.random() * 6.28 });
    }
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, w, h);
    frame++;

    for (const s of stars) {
      const rawY = (s.y - scrollY * s.speed * 2) % (h * 4);
      const drawY = rawY < 0 ? rawY + h * 4 : rawY;
      if (drawY < -3 || drawY > h + 3) continue;

      const tw = Math.sin(frame * s.twinkleSpeed + s.twinklePhase) * 0.3 + 0.7;
      const a = s.alpha * tw;
      const [r, g, b] = s.col;

      ctx.beginPath();
      ctx.arc(s.x, drawY, s.r, 0, 6.28);
      ctx.fillStyle = `rgba(${r},${g},${b},${a.toFixed(2)})`;
      ctx.fill();

      if (s.r > 1.5) {
        const glow = ctx.createRadialGradient(s.x, drawY, 0, s.x, drawY, s.r * 4);
        glow.addColorStop(0, `rgba(${r},${g},${b},${(a * 0.12).toFixed(3)})`);
        glow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(s.x, drawY, s.r * 4, 0, 6.28);
        ctx.fillStyle = glow;
        ctx.fill();
      }
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
const modalLinks = projectModal.querySelector('.project-modal-links');
const modalTags = projectModal.querySelector('.project-modal-tags');

function openProjectModal(idx) {
  const p = PROJECTS_DATA[idx];
  if (!p) return;

  modalImg.src = p.img;
  modalTitle.textContent = p.title;

  let descHTML = '';
  if (p.subtitle) descHTML += `<p style="color:var(--accent);font-size:.75rem;font-family:var(--font-mono);margin-bottom:.5rem">${p.subtitle}</p>`;
  if (p.bullets && p.bullets.length) {
    descHTML += '<ul>' + p.bullets.map(b => `<li>${b}</li>`).join('') + '</ul>';
  }
  modalDesc.innerHTML = descHTML;

  modalLinks.innerHTML = '';
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
