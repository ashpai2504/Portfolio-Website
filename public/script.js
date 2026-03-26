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
    img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
    website: 'https://www.convoaiservices.com',
    github: 'https://github.com/aryan3002/Convo.git'
  },
  {
    title: 'Gamebloc - Live Sports Social Platform',
    bullets: [
      'Built a real-time sports social platform where fans can join live match chats for 100+ concurrent games across Soccer, NFL, NCAA Football, Basketball, etc. with messages persisting even after the match ends so users can still read and respond to game-time reactions.',
      'Designed a full user profile system with personalized favorite teams, auto-tracked team live statistics, and a direct messaging feature so fans can connect and keep sharing their opinions during and after the match.'
    ],
    tags: ['Next.js','React','Node.js','MongoDB','Socket.IO','ESPN API'],
    img: 'Images/Gamebloc img.png',
    github: 'https://github.com/ashpai2504/Gamebloc'
  },
  {
    title: 'J Miller Custom Cues 3D Modeling Software',
    subtitle: 'Capstone Project',
    bullets: [
      'Developed an interactive Three.js application enabling real-time 360° visualization and customization of pool cues with 50+ wood options, seamlessly integrating with an e-commerce platform to enhance customer purchasing experience.',
      'Implemented advanced camera controls and texture mapping systems allowing customers to visualize customized pool cue designs from any angle and viewing breakdown of components, increasing conversion rates and reducing product returns.'
    ],
    tags: ['Three.js','React','HTML/CSS','Blender'],
    img: 'Images/J Miller Image.png',
    website: 'https://www.jmillercustomcues.com'
  },
  {
    title: 'UNLEARN-BENCH: Bias Unlearning Benchmark',
    bullets: [
      'Evaluated five approximate unlearning methods (Task Vector Negation, PCGU, Gradient Ascent, LoRA, NPO) across 7 diverse demographic datasets on models Phi-3.5, Qwen2.5, Mamba.',
      'Demonstrated substantial bias score reductions across multiple demographic categories with some techniques achieving over 40% improvement and identified trade-offs between bias mitigation and model fluency using contrastive loss and regularization techniques.'
    ],
    tags: ['Python','PyTorch','HuggingFace','NumPy','Pandas','Scikit-learn'],
    img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
    github: 'https://github.com/sanskarsri26/UNLEARN-BENCH.git'
  },
  {
    title: 'Scalable Real-Time Graph Analytics System',
    bullets: [
      'Mapped and analyzed NYC taxi trip data through a graph processing system using Neo4j, running PageRank and BFS algorithms to identify important pickup/drop-off hubs and find optimal travel routes.',
      'Scaled the system with Apache Spark and Kubernetes into a distributed pipeline processing 1100+ messages per second through Kafka, enabling real-time graph analytics and showing how microservices can keep the system fast, reliable and fault tolerant.'
    ],
    tags: ['Python','Neo4j','Apache Spark','Kubernetes','Kafka','Docker'],
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80'
  },
  {
    title: 'Axel R8 - Neighborhood Market Trend Analyzer',
    subtitle: 'Listings, maps & market insights',
    bullets: [
      'Developed a full-stack iOS application for neighborhood and market trend analysis using SwiftUI, with persistent cloud data storage in Firebase (Firestore) and secure user authentication via Firebase Auth.',
      'Implemented an end-to-end property listing workflow with photo upload to Firebase Storage, real-time listing sync, and map-based search and geocoding via MapKit and Core Location for location-aware exploration and detailed property views, with REST API integration.'
    ],
    tags: ['SwiftUI','Firebase','MapKit','Core Location','REST API'],
    img: 'Images/axelr8.png',
    imgFit: 'contain',
    github: 'https://github.com/ashpai2504/Neighborhood-Market-Trend-Analyzer.git'
  },
  {
    title: 'Email Thread Summarizer',
    subtitle: 'AI tool for analyzing email threads',
    bullets: [
      'Built a Flask web application that summarizes email threads from text, PDFs, and images using AWS Bedrock Claude models, automatically extracting key decisions, stakeholders, and task statuses into structured one-page briefs.',
      'Implemented multimodal input processing supporting three file formats with automated content extraction, integrating Claude 3.5 Sonnet through the Bedrock API for real-time AI-powered summarization and downloadable outputs.'
    ],
    tags: ['Python','Flask','AWS Bedrock','PyPDF2','Claude 3.5 Sonnet'],
    img: 'Images/project-email-thread-summarizer.jpg',
    github: 'https://github.com/ashpai2504/Email-Thread-Summarizer.git'
  },
  {
    title: 'red. — Cross-Site Product Research',
    subtitle: 'Chrome extension (MV3)',
    bullets: [
      'Built a Chrome extension that works on major retail sites; users change the URL with a simple red. prefix and get a floating panel that pulls together what people are saying online—including Reddit threads, Google reviews, and other public sources in one place.',
      'The panel delivers a clear score and summary, surfaces common praise and complaints, suggests similar or alternative products, and helps compare sentiment so it is easier to decide what to buy.'
    ],
    tags: ['JavaScript','Chrome Extension (MV3)','OpenAI API'],
    img: 'Images/red. Image.png',
    github: 'https://github.com/ashpai2504/Red.-Extension-for-Product-reviews.git'
  }
];

/* ============================================
   LENIS SMOOTH SCROLL
   ============================================ */
const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), touchMultiplier: 2 });
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

  const STAR_COUNT = 220;
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
    const midColors  = [[200,170,255],[255,180,100],[180,160,255]];
    const nearColors = [[155,109,255],[255,140,66],[100,180,255]];

    const addGroup = (count, palette, rMin, rMax, sMin, sMax, aMin, aMax) => {
      for (let i = 0; i < count; i++) {
        const col = palette[Math.floor(Math.random() * palette.length)];
        const r = rMin + Math.random() * (rMax - rMin);
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h * 4,
          r,
          speed: sMin + Math.random() * (sMax - sMin),
          solidColor: `rgb(${col[0]},${col[1]},${col[2]})`,
          alpha: aMin + Math.random() * (aMax - aMin),
          twinkleSpeed: 0.002 + Math.random() * 0.01,
          twinklePhase: Math.random() * 6.28,
          hasGlow: r > 1.5
        });
      }
    };

    addGroup(Math.floor(STAR_COUNT * 0.6), farColors,  0.15, 0.85, 0.005, 0.025, 0.2, 0.7);
    addGroup(Math.floor(STAR_COUNT * 0.3), midColors,  0.4,  1.6,  0.02,  0.07,  0.3, 0.9);
    addGroup(Math.floor(STAR_COUNT * 0.1), nearColors, 0.8,  2.6,  0.04,  0.14,  0.3, 1.0);
  }

  let frame = 0;
  const FRAME_INTERVAL = 1000 / 45;
  let lastDrawTime = 0;

  function draw(now) {
    requestAnimationFrame(draw);
    if (now - lastDrawTime < FRAME_INTERVAL) return;
    lastDrawTime = now;

    ctx.clearRect(0, 0, w, h);
    frame++;

    for (const s of stars) {
      const rawY = (s.y - scrollY * s.speed * 2) % (h * 4);
      const drawY = rawY < 0 ? rawY + h * 4 : rawY;
      if (drawY < -3 || drawY > h + 3) continue;

      const tw = Math.sin(frame * s.twinkleSpeed + s.twinklePhase) * 0.3 + 0.7;
      const a = s.alpha * tw;

      ctx.globalAlpha = a;
      ctx.fillStyle = s.solidColor;
      ctx.beginPath();
      ctx.arc(s.x, drawY, s.r, 0, 6.28);
      ctx.fill();

      if (s.hasGlow) {
        ctx.globalAlpha = a * 0.12;
        ctx.beginPath();
        ctx.arc(s.x, drawY, s.r * 4, 0, 6.28);
        ctx.fill();
      }
    }

    ctx.globalAlpha = 1;
  }

  resize(); createStars(); requestAnimationFrame(draw);
  window.addEventListener('resize', () => { resize(); createStars(); }, { passive: true });
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
function setActiveNav(id) {
  navLinks.forEach(l => l.classList.remove('active'));
  const a = document.querySelector(`.nav-link[data-section="${id}"]`);
  if (a) a.classList.add('active');
}
function updateActiveNav() {
  const refLine = window.innerHeight * 0.35;
  let bestId = '';
  sectionEls.forEach(sec => {
    const r = sec.getBoundingClientRect();
    if (r.top <= refLine && r.bottom > refLine) bestId = sec.id;
  });
  if (!bestId) {
    let minDist = Infinity;
    sectionEls.forEach(sec => {
      const d = Math.abs(sec.getBoundingClientRect().top - refLine);
      if (d < minDist) { minDist = d; bestId = sec.id; }
    });
  }
  if (bestId) setActiveNav(bestId);
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

/* Nav scroll: detect section padding so label appears just below the header */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      const pt = parseInt(window.getComputedStyle(target).paddingTop) || 0;
      lenis.scrollTo(target, { offset: pt - 90 });
    }
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
  const text = contactH.textContent.trim();
  const words = text.split(/\s+/);
  contactH.innerHTML = '';
  words.forEach((word, wi) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'contact-word';
    for (let i = 0; i < word.length; i++) {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = word[i] === ' ' ? '\u00A0' : word[i];
      wordSpan.appendChild(span);
    }
    contactH.appendChild(wordSpan);
    if (wi < words.length - 1) contactH.appendChild(document.createTextNode('\u00A0'));
  });
}

/* ============================================
   HERO ANIMATIONS
   ============================================ */
const heroTl = gsap.timeline({ delay: 0.3 });
heroTl.to('.hero-badge', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.2);
heroTl.to('.hero-name .char', { opacity: 1, y: 0, rotateX: 0, stagger: 0.03, duration: 0.9, ease: 'power3.out' }, 0.5);
heroTl.to('.hero-title-wrapper', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 1.1);
heroTl.to('.hero-summary', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 1.3);
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
    scrollTrigger: { trigger: '#projects', start: 'top top', end: () => '+=' + totalScroll(), scrub: 1.5, pin: true, anticipatePin: 1, invalidateOnRefresh: true }
  });

  track.querySelectorAll('.project-slide').forEach((slide, i) => {
    gsap.fromTo(slide,
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out', immediateRender: false,
        scrollTrigger: { trigger: slide, containerAnimation: horizontalScroll, start: 'left 95%', toggleActions: 'play none none reverse' }
      }
    );
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
  modalImg.style.objectFit = p.imgFit || 'cover';
  modalImg.style.objectPosition = p.imgFit === 'contain' ? 'center top' : 'center';
  modalTitle.textContent = p.title;

  let descHTML = '';
  if (p.subtitle) descHTML += `<p style="color:var(--accent);font-size:.75rem;font-family:var(--font-mono);margin-bottom:.5rem">${p.subtitle}</p>`;
  if (p.bullets && p.bullets.length) {
    descHTML += '<ul>' + p.bullets.map(b => `<li>${b}</li>`).join('') + '</ul>';
  }
  modalDesc.innerHTML = descHTML;

  const links = [];
  if (p.website) links.push(`<a href="${p.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>`);
  if (p.github) links.push(`<a href="${p.github}" target="_blank" rel="noopener noreferrer">View on GitHub</a>`);
  modalLinks.innerHTML = links.join('');
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

imacOverlay.addEventListener('click', e => {
  const dot = e.target.closest('.term-dots span:first-child');
  if (dot) closeImacOverlay();
});

/* ============================================
   CONTACT ANIMATIONS
   ============================================ */
gsap.fromTo('.contact-sub',
  { opacity: 0, y: 25 },
  { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', immediateRender: false,
    scrollTrigger: { trigger: '#contact', start: 'top 80%', once: true } }
);
gsap.fromTo(['.contact-top-actions .contact-card', '.contact-links .contact-card'],
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out', immediateRender: false,
    scrollTrigger: { trigger: '#contact', start: 'top 75%', once: true } }
);

/* ============================================
   COURSEWORK TOGGLE
   ============================================ */
document.querySelectorAll('.coursework-toggle').forEach(btn => {
  btn.addEventListener('click', e => { e.stopPropagation(); btn.classList.toggle('open'); btn.nextElementSibling.classList.toggle('open'); });
});

/* Make entire education cards toggle coursework */
document.querySelectorAll('.edu-card').forEach(card => {
  card.addEventListener('click', () => {
    const btn = card.querySelector('.coursework-toggle');
    const list = card.querySelector('.coursework-list');
    if (!btn || !list) return;
    btn.classList.toggle('open');
    list.classList.toggle('open');
  });
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
    gsap.to(planet, { x, y, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
  }, { passive: true });
}
