/* ============================================
   DATA
   ============================================ */
const TYPING_STRINGS = [
  'Computer Science @ ASU',
  'AI & Machine Learning Engineer',
  'Full-Stack Developer',
  'Data Science Enthusiast',
  'echo "Building the future"'
];

const SKILLS_DATA = [
  {
    title: 'Programming\nLanguages',
    items: ['Python','Java','C/C++','C#','R','JavaScript','Swift','Go','MATLAB','HTML/CSS']
  },
  {
    title: 'ML & Data\nScience',
    items: ['PyTorch','Scikit-learn','vLLM','TensorFlow','Pandas','GeoPandas','NumPy','PySpark','Matplotlib','Seaborn','ArcPy']
  },
  {
    title: 'Cloud &\nDistributed',
    items: ['AWS','Redis','Apache Spark','Hadoop','Docker','Kubernetes','Kafka']
  },
  {
    title: 'Databases',
    items: ['SQL','PostgreSQL','MongoDB','Neo4j']
  },
  {
    title: 'Frameworks\n& Tools',
    items: ['Flask','Django','React','Node.js','ROS','REST APIs','GitHub','Linux','ArcGIS Pro','Tableau','Power BI']
  }
];

const PROJECT_IMAGES = [
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=700&q=80',
  'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=700&q=80',
  'https://images.unsplash.com/photo-1615722550622-955b714ed31d?w=700&q=80',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=700&q=80',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=80'
];

const PROJECTS_DATA = [
  {
    title: 'AI Salon Booking System',
    techLine: 'React · Next.js · Tailwind · FastAPI · PostgreSQL · Docker · GPT-4o mini · Twilio',
    bullets: [
      'Built dual-interface booking platform using GPT-4 customer agents (Twilio Voice/SMS + web chat) for natural language appointments with speech-to-text, and autonomous owner agent for schedule/promotion management.',
      'Engineered real-time scheduling with promotion system, async backend managing multi-stylist availability, preferred style options, automated confirmations, and time-zone-aware slot collision prevention.'
    ],
    tags: ['React','Next.js','Tailwind','FastAPI','PostgreSQL','Docker','GPT-4o mini','Twilio']
  },
  {
    title: 'Gamebloc – Live Sports Social Platform',
    techLine: 'Next.js · React · Node.js · MongoDB · Socket.IO · ESPN API',
    bullets: [
      'Built a real-time sports social platform where fans join live match chats for 100+ concurrent games across Soccer, NFL, NCAA Football, Basketball, with persistent message history.',
      'Designed full user profile system with personalized favorite teams, auto-tracked team stats, and direct messaging — the only platform combining per-game live chat, persistent history, and social profiles across multiple sports.'
    ],
    tags: ['Next.js','React','Node.js','MongoDB','Socket.IO','ESPN API']
  },
  {
    title: 'J Miller Custom Cues 3D',
    techLine: 'Three.js · React · HTML/CSS · Blender',
    bullets: [
      'Developed interactive Three.js application enabling real-time 360° visualization and customization of pool cues with 50+ wood options, integrating with an e-commerce platform.',
      'Implemented advanced camera controls and texture mapping for customers to visualize customized designs from any angle, increasing conversion rates and reducing returns.'
    ],
    tags: ['Three.js','React','HTML/CSS','Blender','3D Modeling'],
    has3D: true
  },
  {
    title: 'UNLEARN-BENCH: Bias Unlearning Benchmark',
    techLine: 'Python · PyTorch · HuggingFace · NumPy · Pandas · Scikit-learn',
    bullets: [
      'Evaluated five approximate unlearning methods (Task Vector Negation, PCGU, Gradient Ascent, LoRA, NPO) across 7 diverse demographic datasets on Phi-3.5, Qwen2.5, Mamba.',
      'Demonstrated substantial bias score reductions with some techniques achieving over 40% improvement, identifying trade-offs between bias mitigation and model fluency.'
    ],
    tags: ['Python','PyTorch','HuggingFace','NumPy','Pandas','Scikit-learn']
  },
  {
    title: 'Scalable Real-Time Graph Analytics',
    techLine: 'Python · Neo4j · Apache Spark · Kubernetes · Kafka · Docker',
    bullets: [
      'Mapped and analyzed NYC taxi trip data through a graph processing system using Neo4j, running PageRank and BFS to identify important pickup/drop-off hubs and optimal routes.',
      'Scaled to a distributed pipeline processing 1100+ messages/sec through Kafka, enabling real-time graph analytics with microservices for speed, reliability, and fault tolerance.'
    ],
    tags: ['Python','Neo4j','Apache Spark','Kubernetes','Kafka','Docker']
  }
];

/* Skill wheels: red + blue (site palette: maroon + cyan) */
const WHEEL_RED = '#8C1D40';
const WHEEL_RED_DARK = '#5c1428';
const WHEEL_RED_LIGHT = '#b82e60';
const WHEEL_BLUE = '#0284c7';
const WHEEL_BLUE_DARK = '#075985';
const WHEEL_BLUE_LIGHT = '#38bdf8';

/* ============================================
   PRELOADER
   ============================================ */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('preloader').classList.add('hidden'), 800);
});

/* ============================================
   CUSTOM CURSOR
   ============================================ */
const cursorDot = document.getElementById('cursor-dot');
const cursorGlow = document.getElementById('cursor-glow');
let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
}, { passive: true });

function animateCursor() {
  glowX += (mouseX - glowX) * 0.1;
  glowY += (mouseY - glowY) * 0.1;
  cursorGlow.style.left = glowX + 'px';
  cursorGlow.style.top = glowY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

const hoverTargets = 'a, button, .project-card, .timeline-card, .edu-card, .skill-wheel-container, .coursework-list span, .magnetic, [data-tilt], .header-profile';
document.addEventListener('mouseover', e => {
  if (e.target.closest(hoverTargets)) cursorDot.classList.add('hovering');
});
document.addEventListener('mouseout', e => {
  if (e.target.closest(hoverTargets)) cursorDot.classList.remove('hovering');
});

/* ============================================
   PROFILE LIGHTBOX
   ============================================ */
const profileLightbox = document.getElementById('profile-lightbox');
document.getElementById('header-profile').addEventListener('click', () => {
  profileLightbox.classList.add('open');
});
profileLightbox.addEventListener('click', () => {
  profileLightbox.classList.remove('open');
});

/* ============================================
   MAGNETIC EFFECT
   ============================================ */
document.querySelectorAll('.magnetic').forEach(el => {
  const strength = parseFloat(el.dataset.strength) || 15;
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
  });
});

/* ============================================
   TILT EFFECT
   ============================================ */
document.querySelectorAll('[data-tilt]').forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const scale = el.dataset.tiltScale || 1;
    el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(${scale})`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
    el.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
    setTimeout(() => el.style.transition = '', 500);
  });
});

/* ============================================
   HEADER
   ============================================ */
const header = document.getElementById('header');
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  nav.classList.toggle('open');
});
navLinks.forEach(l => l.addEventListener('click', () => {
  menuToggle.classList.remove('open');
  nav.classList.remove('open');
}));

const sections = document.querySelectorAll('section[id]');
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const a = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
      if (a) a.classList.add('active');
    }
  });
}, { threshold: 0.25, rootMargin: '-70px 0px -30% 0px' });
sections.forEach(s => navObserver.observe(s));

/* ============================================
   HERO PARTICLE CANVAS
   ============================================ */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  let w, h, particles;
  const mouse = { x: null, y: null };

  canvas.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  canvas.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; }, { passive: true });

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    const count = Math.min(Math.floor((w * h) / 7000), 180);
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 0.4,
        type: Math.random()
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      const color = p.type > 0.6 ? '255,198,39' : p.type > 0.3 ? '140,29,64' : '0,212,255';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color},0.6)`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x, dy = p.y - p2.y;
        const dist = dx * dx + dy * dy;
        if (dist < 18000) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${color},${(1 - dist / 18000) * 0.12})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      if (mouse.x !== null) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255,198,39,${(1 - dist / 180) * 0.35})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          p.x += dx * 0.012;
          p.y += dy * 0.012;
        }
      }
    }
    requestAnimationFrame(draw);
  }

  resize(); createParticles(); draw();
  let rt;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { resize(); createParticles(); }, 200); });
}
initHeroCanvas();

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
      if (ci < 0) { del = false; si = (si + 1) % TYPING_STRINGS.length; setTimeout(tick, 350); return; }
      setTimeout(tick, 25);
    } else {
      el.textContent = s.substring(0, ci++);
      if (ci > s.length) { del = true; setTimeout(tick, 2200); return; }
      setTimeout(tick, 55);
    }
  }
  setTimeout(tick, 1400);
})();

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseFloat(entry.target.dataset.delay) || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay * 1000);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.anim-up').forEach(el => observer.observe(el));
}
initScrollAnimations();

/* ============================================
   CODE RAIN (subtle background effect)
   ============================================ */
function initCodeRain(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const chars = '01{}[]<>/=;:const let var function async await import export class return if else for while def lambda print self None True False'.split('');
  let cols, drops;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    cols = Math.floor(canvas.width / 18);
    drops = new Array(cols).fill(0).map(() => Math.random() * canvas.height / 18);
  }

  function draw() {
    ctx.fillStyle = 'rgba(5, 5, 5, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '14px JetBrains Mono, monospace';
    for (let i = 0; i < cols; i++) {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      const x = i * 18;
      const y = drops[i] * 18;
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,198,39,0.3)' : 'rgba(0,212,255,0.25)';
      ctx.fillText(ch, x, y);
      if (y > canvas.height && Math.random() > 0.98) drops[i] = 0;
      drops[i] += 0.4;
    }
  }

  resize();
  setInterval(draw, 80);
  window.addEventListener('resize', resize);
}
initCodeRain('code-rain-edu');
initCodeRain('code-rain-skills');

/* ============================================
   COURSEWORK TOGGLE
   ============================================ */
document.querySelectorAll('.coursework-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    btn.nextElementSibling.classList.toggle('open');
  });
});

/* ============================================
   EXPERIENCE EXPAND
   ============================================ */
document.querySelectorAll('.timeline-card').forEach(card => {
  card.addEventListener('click', e => {
    if (e.target.closest('.modal') || e.target.closest('.modal-content')) return;
    card.classList.toggle('expanded');
  });
});

/* ============================================
   PROJECT MODAL
   ============================================ */
const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');

function openProjectModal(idx) {
  const p = PROJECTS_DATA[idx];
  let html = `<div class="modal-body-inner">
    <h3>${p.title}</h3>
    <p class="modal-subtitle">${p.techLine}</p>
    <img src="${PROJECT_IMAGES[idx]}" alt="${p.title}" class="modal-hero-img" loading="lazy" />`;

  if (p.has3D) {
    html += `<div class="threejs-viewer" id="cue-viewer-container">
      <div class="viewer-hint">Drag to rotate · Scroll to zoom</div>
    </div>`;
  }

  p.bullets.forEach(b => { html += `<p>${b}</p>`; });
  html += `<div class="modal-tags">`;
  p.tags.forEach(t => { html += `<span>${t}</span>`; });
  html += `</div></div>`;

  modalBody.innerHTML = html;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  if (p.has3D) setTimeout(initPoolCueViewer, 100);
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelector('.modal-close').addEventListener('click', closeModal);
document.querySelector('.modal-backdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    closeSkillZoom();
    profileLightbox.classList.remove('open');
  }
});

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => openProjectModal(parseInt(card.dataset.project)));
});

/* ============================================
   THREE.JS POOL CUE VIEWER
   ============================================ */
function initPoolCueViewer() {
  const container = document.getElementById('cue-viewer-container');
  if (!container || typeof THREE === 'undefined') return;

  const w = container.clientWidth;
  const h = container.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
  camera.position.set(0, 0, 3.5);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.insertBefore(renderer.domElement, container.firstChild);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
  dirLight.position.set(3, 5, 4);
  scene.add(dirLight);
  const pointLight = new THREE.PointLight(0xFFC627, 0.6, 10);
  pointLight.position.set(-2, 1, 3);
  scene.add(pointLight);

  const cueGroup = new THREE.Group();

  const segments = [
    { rTop: 0.012, rBot: 0.016, len: 0.04, color: 0x1a1a2e, name: 'tip' },
    { rTop: 0.016, rBot: 0.018, len: 0.05, color: 0xf5f0e8, name: 'ferrule' },
    { rTop: 0.018, rBot: 0.028, len: 0.9,  color: 0xd4a04a, name: 'shaft' },
    { rTop: 0.030, rBot: 0.030, len: 0.04, color: 0xc0c0c0, name: 'joint' },
    { rTop: 0.028, rBot: 0.034, len: 0.45, color: 0x6b3a2a, name: 'forearm' },
    { rTop: 0.034, rBot: 0.034, len: 0.08, color: 0xFFC627, name: 'ring1' },
    { rTop: 0.034, rBot: 0.035, len: 0.28, color: 0x1a1a1a, name: 'wrap' },
    { rTop: 0.035, rBot: 0.035, len: 0.08, color: 0xFFC627, name: 'ring2' },
    { rTop: 0.035, rBot: 0.032, len: 0.35, color: 0x4a2a1a, name: 'butt' },
    { rTop: 0.032, rBot: 0.028, len: 0.04, color: 0x222222, name: 'bumper' }
  ];

  let yPos = 0;
  const totalLen = segments.reduce((s, seg) => s + seg.len, 0);

  segments.forEach(seg => {
    const geo = new THREE.CylinderGeometry(seg.rTop, seg.rBot, seg.len, 24);
    const mat = new THREE.MeshStandardMaterial({
      color: seg.color,
      roughness: seg.name === 'joint' || seg.name.startsWith('ring') ? 0.2 : 0.6,
      metalness: seg.name === 'joint' || seg.name.startsWith('ring') ? 0.8 : 0.1
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.y = yPos + seg.len / 2;
    yPos += seg.len;
    cueGroup.add(mesh);
  });

  cueGroup.position.y = -totalLen / 2;
  cueGroup.rotation.x = Math.PI / 2;
  cueGroup.rotation.z = -Math.PI / 8;
  scene.add(cueGroup);

  let isDragging = false, prevX = 0, prevY = 0;
  let autoRotate = true;
  let rotY = 0, rotZ = -Math.PI / 8;

  container.addEventListener('pointerdown', e => {
    isDragging = true; autoRotate = false;
    prevX = e.clientX; prevY = e.clientY;
    container.setPointerCapture(e.pointerId);
  });
  container.addEventListener('pointermove', e => {
    if (!isDragging) return;
    rotY += (e.clientX - prevX) * 0.008;
    rotZ += (e.clientY - prevY) * 0.005;
    rotZ = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotZ));
    prevX = e.clientX; prevY = e.clientY;
    cueGroup.rotation.y = rotY;
    cueGroup.rotation.z = rotZ;
  });
  container.addEventListener('pointerup', e => {
    isDragging = false; autoRotate = true;
    container.releasePointerCapture(e.pointerId);
  });
  container.addEventListener('wheel', e => {
    e.preventDefault();
    camera.position.z = Math.max(2, Math.min(7, camera.position.z + e.deltaY * 0.005));
  }, { passive: false });

  function animate() {
    if (!document.getElementById('cue-viewer-container')) return;
    requestAnimationFrame(animate);
    if (autoRotate) {
      cueGroup.rotation.y += 0.008;
    }
    renderer.render(scene, camera);
  }
  animate();
}

/* ============================================
   SKILLS SPINNING WHEELS (Canvas)
   ============================================ */
function initSkillWheels() {
  const container = document.getElementById('skills-wheels');
  const tooltip = document.createElement('div');
  tooltip.className = 'skill-tooltip';
  document.body.appendChild(tooltip);

  SKILLS_DATA.forEach((cat, catIdx) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'skill-wheel-container anim-up';
    wrapper.dataset.delay = String(catIdx * 0.1);
    wrapper.dataset.catIdx = catIdx;

    const wheelWrapper = document.createElement('div');
    wheelWrapper.className = 'skill-wheel-wrapper';

    const dpr = window.devicePixelRatio || 1;
    const canvasSize = 270;
    const canvas = document.createElement('canvas');
    canvas.className = 'skill-wheel-canvas';
    canvas.width = canvasSize * dpr;
    canvas.height = canvasSize * dpr;
    canvas.style.width = canvasSize + 'px';
    canvas.style.height = canvasSize + 'px';

    const label = document.createElement('div');
    label.className = 'skill-wheel-label';
    label.innerHTML = `<h4>${cat.title.replace(/\n/g, '<br>')}</h4><span>hover a slice</span>`;

    const hint = document.createElement('div');
    hint.className = 'skill-click-hint';
    hint.textContent = '[ click to explore ]';

    wheelWrapper.appendChild(canvas);
    wheelWrapper.appendChild(label);
    wrapper.appendChild(wheelWrapper);
    wrapper.appendChild(hint);
    container.appendChild(wrapper);

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    const cx = canvasSize / 2, cy = canvasSize / 2;
    const outerR = canvasSize / 2 - 8, innerR = outerR * 0.32;
    const n = cat.items.length;
    const sliceAngle = (Math.PI * 2) / n;
    let rotation = Math.random() * Math.PI * 2;
    let hoveredSlice = -1;
    let isHovering = false;
    const speed = 0.003 + catIdx * 0.0006;

    function drawSlicedWheel(c, _cx, _cy, _oR, _iR, hov, scaledDpr) {
      c.save();
      if (scaledDpr) c.scale(scaledDpr, scaledDpr);
      c.clearRect(0, 0, c.canvas.width, c.canvas.height);

      for (let i = 0; i < n; i++) {
        const startAngle = rotation + i * sliceAngle;
        const endAngle = startAngle + sliceAngle;
        const isRedSlice = i % 2 === 0;
        const isHov = i === hov;
        const r = isHov ? _oR + 5 : _oR;

        c.beginPath();
        c.arc(_cx, _cy, r, startAngle, endAngle);
        c.arc(_cx, _cy, _iR, endAngle, startAngle, true);
        c.closePath();

        const grad = c.createLinearGradient(
          _cx + Math.cos(startAngle) * r, _cy + Math.sin(startAngle) * r,
          _cx + Math.cos(endAngle) * _iR, _cy + Math.sin(endAngle) * _iR
        );
        if (isRedSlice) {
          grad.addColorStop(0, isHov ? WHEEL_RED_LIGHT : WHEEL_RED);
          grad.addColorStop(1, isHov ? WHEEL_RED : WHEEL_RED_DARK);
        } else {
          grad.addColorStop(0, isHov ? WHEEL_BLUE_LIGHT : WHEEL_BLUE);
          grad.addColorStop(1, isHov ? WHEEL_BLUE : WHEEL_BLUE_DARK);
        }
        c.fillStyle = grad;
        c.fill();

        c.strokeStyle = 'rgba(0,0,0,0.25)';
        c.lineWidth = 1;
        c.stroke();

        if (isHov) {
          c.save();
          c.globalAlpha = 0.15;
          c.fillStyle = '#fff';
          c.fill();
          c.restore();
        }

        const midAngle = startAngle + sliceAngle / 2;
        const textR = (_iR + r) / 2;
        const tx = _cx + Math.cos(midAngle) * textR;
        const ty = _cy + Math.sin(midAngle) * textR;

        c.save();
        c.translate(tx, ty);
        let textAngle = midAngle;
        const norm = ((midAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        if (norm > Math.PI / 2 && norm < Math.PI * 1.5) textAngle += Math.PI;
        c.rotate(textAngle);

        const fontSize = _oR > 160 ? 13 : (n > 8 ? 10 : 12);
        c.fillStyle = '#ffffff';
        c.font = `${isHov ? 700 : 600} ${fontSize}px Inter, sans-serif`;
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.shadowColor = isRedSlice ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.45)';
        c.shadowBlur = 3;
        c.fillText(cat.items[i], 0, 0);
        c.restore();
      }

      c.beginPath();
      c.arc(_cx, _cy, _iR, 0, Math.PI * 2);
      c.fillStyle = '#0a0a0a';
      c.fill();
      c.strokeStyle = 'rgba(0,212,255,0.22)';
      c.lineWidth = 1.5;
      c.stroke();

      c.beginPath();
      c.arc(_cx, _cy, _oR + 1, 0, Math.PI * 2);
      c.strokeStyle = 'rgba(255,255,255,0.05)';
      c.lineWidth = 1;
      c.stroke();

      c.restore();
    }

    function animate() {
      if (!isHovering) rotation += speed;
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawSlicedWheel(ctx, cx, cy, outerR, innerR, hoveredSlice, null);
      ctx.restore();
      requestAnimationFrame(animate);
    }
    animate();

    function getSliceAtPoint(mx, my) {
      const rect = canvas.getBoundingClientRect();
      const x = (mx - rect.left) / rect.width * canvasSize;
      const y = (my - rect.top) / rect.height * canvasSize;
      const dx = x - cx, dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < innerR || dist > outerR + 8) return -1;
      let angle = Math.atan2(dy, dx) - rotation;
      angle = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      return Math.floor(angle / sliceAngle);
    }

    canvas.addEventListener('mousemove', e => {
      const idx = getSliceAtPoint(e.clientX, e.clientY);
      hoveredSlice = idx;
      isHovering = idx >= 0;
      if (idx >= 0) {
        tooltip.textContent = cat.items[idx];
        tooltip.classList.add('show');
        tooltip.style.left = e.clientX + 15 + 'px';
        tooltip.style.top = e.clientY - 10 + 'px';
        label.querySelector('span').textContent = cat.items[idx];
      } else {
        tooltip.classList.remove('show');
        label.querySelector('span').textContent = 'hover a slice';
      }
    }, { passive: true });

    canvas.addEventListener('mouseleave', () => {
      hoveredSlice = -1; isHovering = false;
      tooltip.classList.remove('show');
      label.querySelector('span').textContent = 'hover a slice';
    });

    wrapper.addEventListener('click', () => openSkillZoom(catIdx, rotation));
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const d = parseFloat(entry.target.dataset.delay) || 0;
        setTimeout(() => entry.target.classList.add('visible'), d * 1000);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.skill-wheel-container').forEach(c => obs.observe(c));
}
initSkillWheels();

/* ============================================
   SKILL ZOOM OVERLAY
   ============================================ */
const skillZoomOverlay = document.getElementById('skill-zoom-overlay');
const skillZoomCanvas = document.getElementById('skill-zoom-canvas');
const skillZoomLabel = document.querySelector('.skill-zoom-label');
const skillZoomList = document.querySelector('.skill-zoom-list');
let zoomAnimId = null;

function openSkillZoom(catIdx, startRotation) {
  const cat = SKILLS_DATA[catIdx];
  skillZoomOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  const displaySize = Math.min(window.innerWidth * 0.8, 380);
  const dpr = window.devicePixelRatio || 1;
  skillZoomCanvas.width = displaySize * dpr;
  skillZoomCanvas.height = displaySize * dpr;
  skillZoomCanvas.style.width = displaySize + 'px';
  skillZoomCanvas.style.height = displaySize + 'px';

  skillZoomLabel.textContent = cat.title.replace(/\n/g, ' ');

  skillZoomList.innerHTML = '';
  cat.items.forEach((item, i) => {
    const chip = document.createElement('span');
    chip.className = 'skill-chip';
    chip.textContent = item;
    skillZoomList.appendChild(chip);
    setTimeout(() => chip.classList.add('show'), 300 + i * 50);
  });

  const ctx = skillZoomCanvas.getContext('2d');
  const logicalCx = displaySize / 2;
  const logicalCy = displaySize / 2;
  const logicalOuterR = displaySize / 2 - 6;
  const logicalInnerR = logicalOuterR * 0.30;
  const n = cat.items.length;
  const sliceAngle = (Math.PI * 2) / n;
  let rotation = startRotation || 0;

  function drawZoom() {
    rotation += 0.002;
    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, displaySize, displaySize);

    for (let i = 0; i < n; i++) {
      const startAngle = rotation + i * sliceAngle;
      const endAngle = startAngle + sliceAngle;
      const isRedSlice = i % 2 === 0;

      ctx.beginPath();
      ctx.arc(logicalCx, logicalCy, logicalOuterR, startAngle, endAngle);
      ctx.arc(logicalCx, logicalCy, logicalInnerR, endAngle, startAngle, true);
      ctx.closePath();
      const grad = ctx.createLinearGradient(
        logicalCx + Math.cos(startAngle) * logicalOuterR,
        logicalCy + Math.sin(startAngle) * logicalOuterR,
        logicalCx + Math.cos(endAngle) * logicalInnerR,
        logicalCy + Math.sin(endAngle) * logicalInnerR
      );
      if (isRedSlice) {
        grad.addColorStop(0, WHEEL_RED_LIGHT);
        grad.addColorStop(1, WHEEL_RED_DARK);
      } else {
        grad.addColorStop(0, WHEEL_BLUE_LIGHT);
        grad.addColorStop(1, WHEEL_BLUE_DARK);
      }
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();

      const midAngle = startAngle + sliceAngle / 2;
      const textR = (logicalInnerR + logicalOuterR) / 2;
      const tx = logicalCx + Math.cos(midAngle) * textR;
      const ty = logicalCy + Math.sin(midAngle) * textR;
      ctx.save();
      ctx.translate(tx, ty);
      let tA = midAngle;
      const normA = ((tA % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      if (normA > Math.PI / 2 && normA < Math.PI * 1.5) tA += Math.PI;
      ctx.rotate(tA);
      ctx.fillStyle = '#ffffff';
      ctx.font = `700 ${logicalOuterR > 160 ? 14 : 12}px Inter, sans-serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.shadowColor = isRedSlice ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.45)';
      ctx.shadowBlur = 3;
      ctx.fillText(cat.items[i], 0, 0);
      ctx.restore();
    }

    ctx.beginPath();
    ctx.arc(logicalCx, logicalCy, logicalInnerR, 0, Math.PI * 2);
    ctx.fillStyle = '#0c0c0c';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,212,255,0.22)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.fillStyle = '#00d4ff';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const titleLines = cat.title.split('\n');
    titleLines.forEach((line, li) => {
      ctx.fillText(line, logicalCx, logicalCy + (li - (titleLines.length - 1) / 2) * 16);
    });

    ctx.restore();
    zoomAnimId = requestAnimationFrame(drawZoom);
  }
  drawZoom();
}

function closeSkillZoom() {
  skillZoomOverlay.classList.remove('open');
  document.body.style.overflow = '';
  if (zoomAnimId) cancelAnimationFrame(zoomAnimId);
}

document.querySelector('.skill-zoom-close').addEventListener('click', closeSkillZoom);
skillZoomOverlay.addEventListener('click', e => {
  if (e.target === skillZoomOverlay) closeSkillZoom();
});

/* ============================================
   SMOOTH SCROLL
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    }
  });
});

/* ============================================
   PARALLAX ON SCROLL
   ============================================ */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const hero = document.querySelector('.hero-content');
  if (hero && scrollY < window.innerHeight) {
    hero.style.transform = `translateY(${scrollY * 0.15}px)`;
    hero.style.opacity = 1 - scrollY / (window.innerHeight * 0.8);
  }
}, { passive: true });

/* ============================================
   TEXT SCRAMBLE EFFECT ON SECTION HEADERS
   ============================================ */
function scrambleText(el) {
  const original = el.textContent;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';
  let iteration = 0;
  const interval = setInterval(() => {
    el.textContent = original.split('').map((char, i) => {
      if (i < iteration) return original[i];
      return chars[Math.floor(Math.random() * chars.length)];
    }).join('');
    iteration += 1 / 2;
    if (iteration >= original.length) {
      el.textContent = original;
      clearInterval(interval);
    }
  }, 30);
}

const headerObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const h2 = entry.target.querySelector('h2');
      if (h2) scrambleText(h2);
      headerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.section-header').forEach(h => headerObserver.observe(h));
