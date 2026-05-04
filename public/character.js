/* ============================================
   3D CHARACTER — real human GLTF model
   Inspired by github.com/akashrmalhotra/3d-portfolio
   - Loads HoodieGuy.glb (Quaternius "Hoodie Character", CC0)
   - Idle animation from the GLB (no manual bone edits — those broke skinning)
   - Desk.glb, OfficeChair.glb, Laptop.glb props, staged for “at the desk”
   - Headphones.glb (Nick Slough) parented to head
   - Head bone tracks the mouse (applied after mixer each frame)
   - Scroll-driven motion
   ============================================ */
import * as THREE from 'three';
import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

const container = document.getElementById('character-model');
if (container && window.WebGLRenderingContext) {
  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  // Slightly less contrasty than ACES so low-poly PBR stays readable on dark bg
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.55;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  // Show the canvas immediately so partial scene (desk/chair/laptop) is
  // visible even if the character GLB takes a moment or its onload errors.
  // The CSS opacity transition still gives a smooth 1.2s fade-in.
  container.classList.add('character-loaded');

  const camera = new THREE.PerspectiveCamera(28, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 1.0, 6.5);
  camera.lookAt(0, 0.55, 0);

  /* ---------- LIGHTING (always-on, evenly lit) ---------- */
  // Strong ambient so the character is fully visible everywhere
  scene.add(new THREE.AmbientLight(0xffffff, 2.15));

  // Hemisphere bounce light for natural skin
  const hemi = new THREE.HemisphereLight(0xffffff, 0x444466, 1.0);
  hemi.position.set(0, 6, 0);
  scene.add(hemi);

  // Key light from above-front
  const keyLight = new THREE.DirectionalLight(0xfff5d6, 1.6);
  keyLight.position.set(2.5, 4, 4);
  scene.add(keyLight);

  // Front fill so the face is always lit
  const frontFill = new THREE.DirectionalLight(0xffffff, 1.35);
  frontFill.position.set(0, 2, 6);
  scene.add(frontFill);
  const faceFill = new THREE.DirectionalLight(0xffeedd, 0.9);
  faceFill.position.set(0, 1.2, 8);
  scene.add(faceFill);

  // Purple rim from behind-left
  const rimLight = new THREE.PointLight(0x9b6dff, 5, 14, 1.6);
  rimLight.position.set(-3, 3, -2);
  scene.add(rimLight);

  // Gold accent from behind-right
  const accentLight = new THREE.PointLight(0xf5c842, 4.5, 11, 1.8);
  accentLight.position.set(3, 1, -1.5);
  scene.add(accentLight);

  // Cyan low-fill so shadows aren't pitch black
  const lowFill = new THREE.PointLight(0x5cb8ff, 2.0, 8, 2);
  lowFill.position.set(0, -1, 3);
  scene.add(lowFill);

  /* ---------- Group containers ---------- */
  const characterGroup = new THREE.Group();
  scene.add(characterGroup);

  let character = null;
  let headBone = null;
  let mixer = null;

  /* ---------- Load HoodieGuy + desk scene ---------- */
  const loader = new GLTFLoader();

  // Helper: tweak any material to read well under our bright stage lighting
  const tuneMaterial = (node) => {
    if (node.isMesh && node.material) {
      node.material.envMapIntensity = 1.0;
      node.castShadow = false;
      node.receiveShadow = false;
      if (node.material.metalness !== undefined) {
        node.material.metalness = Math.min(node.material.metalness ?? 0, 0.2);
      }
      if (node.material.roughness !== undefined) {
        node.material.roughness = Math.max(node.material.roughness ?? 0.6, 0.55);
      }
      // Tiny emissive fill on PBR mats only (avoid washing out albedo on low-poly)
      if (node.material.emissive && node.material.emissiveIntensity !== undefined) {
        node.material.emissive.setHex(0x1a2230);
        node.material.emissiveIntensity = 0.06;
      }
      node.material.needsUpdate = true;
    }
  };

  loader.load(
    'models/HoodieGuy.glb',
    (gltf) => {
      character = gltf.scene;
      character.traverse(tuneMaterial);

      // Find head bone for mouse-tracking + headphones attachment
      character.traverse((obj) => {
        if (!headBone) {
          const n = (obj.name || '').toLowerCase().replace(/[^a-z]/g, '');
          if (n === 'head') headBone = obj;
        }
      });
      // Idle clip drives the skinned mesh correctly; manual leg poses stretched verts.
      if (gltf.animations && gltf.animations.length) {
        mixer = new THREE.AnimationMixer(character);
        const clip =
          gltf.animations.find(c => /idle_neutral/i.test(c.name)) ||
          gltf.animations.find(c => /\|idle$/i.test(c.name)) ||
          gltf.animations.find(c => /idle/i.test(c.name)) ||
          gltf.animations[0];
        const action = mixer.clipAction(clip);
        action.timeScale = 0.75;
        action.play();
      }

      character.scale.setScalar(0.78);
      character.position.set(0, -0.4, -0.06);
      character.rotation.y = 0;

      characterGroup.add(character);

      /* ---- Headphones, parented to the head bone ---- */
      if (headBone) {
        loader.load('models/Headphones.glb', (hp) => {
          const headphones = hp.scene;
          headphones.traverse(tuneMaterial);
          headphones.scale.setScalar(0.0085);
          headphones.position.set(0, 0.08, 0.0);
          headphones.rotation.set(-0.05, 0, 0);
          headBone.add(headphones);
        }, undefined, (err) => console.error('Headphones load error', err));
      }
    },
    undefined,
    (err) => { console.error('Hoodie load error', err); }
  );

  /* ---- Office chair, behind the character ---- */
  loader.load('models/OfficeChair.glb', (gltf) => {
    const chair = gltf.scene;
    chair.traverse(tuneMaterial);
    chair.scale.setScalar(0.68);
    chair.position.set(0, -0.68, -0.38);
    chair.rotation.y = 0;
    characterGroup.add(chair);
  }, undefined, (err) => console.error('Chair load error', err));

  /* ---- Desk in front of the character ---- */
  loader.load('models/Desk.glb', (gltf) => {
    const desk = gltf.scene;
    desk.traverse(tuneMaterial);
    desk.scale.setScalar(0.72);
    desk.position.set(0, -0.68, 0.48);
    desk.rotation.y = 0;
    characterGroup.add(desk);
  }, undefined, (err) => console.error('Desk load error', err));

  /* ---- Laptop on top of the desk, screen facing the camera ---- */
  loader.load('models/Laptop.glb', (gltf) => {
    const laptop = gltf.scene;
    laptop.traverse(tuneMaterial);
    laptop.scale.setScalar(0.15);
    laptop.position.set(0, 0.02, 0.62);
    laptop.rotation.y = Math.PI;
    characterGroup.add(laptop);
  }, undefined, (err) => console.error('Laptop load error', err));

  /* ---------- Floating accent particles (kept from earlier) ---------- */
  const orbit = new THREE.Group();
  scene.add(orbit);
  const particleCount = 14;
  const particles = [];
  for (let i = 0; i < particleCount; i++) {
    const p = new THREE.Mesh(
      new THREE.SphereGeometry(0.025 + Math.random() * 0.02, 8, 8),
      new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0xf5c842 : (i % 3 === 1 ? 0x9b6dff : 0x5cb8ff),
        transparent: true,
        opacity: 0.85
      })
    );
    const angle = (i / particleCount) * Math.PI * 2;
    const radius = 1.8 + Math.random() * 0.6;
    p.userData = { angle, radius, ySpeed: 0.4 + Math.random() * 0.5, yPhase: Math.random() * 6.28 };
    p.position.set(Math.cos(angle) * radius, 1.2 + Math.sin(angle) * 0.3, Math.sin(angle) * radius);
    orbit.add(p);
    particles.push(p);
  }

  /* ---------- Mouse tracking ---------- */
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (!e.touches[0]) return;
    mouseX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
  }, { passive: true });

  /* ---------- Resize ---------- */
  function onResize() {
    const w = container.clientWidth, h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', onResize, { passive: true });

  /* ---------- Animation loop ---------- */
  const clock = new THREE.Clock();
  let scrollOffset = 0;

  const hero = document.getElementById('hero');
  function updateScroll() {
    if (!hero) return;
    const r = hero.getBoundingClientRect();
    const total = r.height;
    const scrolled = Math.min(Math.max(-r.top, 0), total);
    scrollOffset = total ? scrolled / total : 0;
  }
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animate() {
    const t = clock.getElapsedTime();
    const delta = clock.getDelta();

    // Animation mixer (idle clip)
    if (mixer) mixer.update(delta);

    cursorX = lerp(cursorX, mouseX, 0.07);
    cursorY = lerp(cursorY, mouseY, 0.07);

    // Head bone rotation tracking the mouse (mirrors reference handleHeadRotation)
    if (headBone) {
      if (window.scrollY < window.innerHeight * 0.7) {
        const maxYaw = Math.PI / 6;
        const maxPitch = Math.PI / 9;
        headBone.rotation.y = lerp(headBone.rotation.y, cursorX * maxYaw, 0.1);
        headBone.rotation.x = lerp(headBone.rotation.x, -cursorY * maxPitch, 0.1);
      } else {
        headBone.rotation.y = lerp(headBone.rotation.y, 0, 0.04);
        headBone.rotation.x = lerp(headBone.rotation.x, 0, 0.04);
      }
    }

    // Whole-body subtle parallax + scroll drift (apply to wrapper so model keeps its 180° face-forward rotation)
    if (character) {
      characterGroup.rotation.y = lerp(characterGroup.rotation.y, cursorX * 0.18 + scrollOffset * 0.5, 0.04);
      characterGroup.position.x = lerp(characterGroup.position.x, cursorX * 0.08 - scrollOffset * 0.3, 0.04);
      // Floating bob (very subtle)
      characterGroup.position.y = Math.sin(t * 1.0) * 0.05 + scrollOffset * -0.4;
    }

    // Orbit particles
    orbit.rotation.y = t * 0.18;
    particles.forEach(p => {
      p.position.y = 1.2 + Math.sin(t * p.userData.ySpeed + p.userData.yPhase) * 0.35;
      p.material.opacity = 0.55 + Math.sin(t * 2 + p.userData.yPhase) * 0.35;
    });

    // Camera scroll zoom
    camera.position.z = lerp(camera.position.z, 6.5 + scrollOffset * 1.6, 0.05);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}
