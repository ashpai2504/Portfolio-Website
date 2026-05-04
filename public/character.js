/* ============================================
   3D CHARACTER — real human GLTF model
   Inspired by github.com/akashrmalhotra/3d-portfolio
   - Loads ManLongSleeves.glb (Quaternius, CC0) — has Man_Sitting animation
   - Desk / chair / laptop props
   - Headphones (Nick Slough) parented to head
   - Mouse look: quaternion offset on head bone after mixer (skin follows bone, not child pivots)
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

  const camera = new THREE.PerspectiveCamera(24, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 0.72, 7.35);
  camera.lookAt(0, 0.14, 0);

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

  /** Reused temp objects for head look (avoid GC each frame) */
  const headAnimQuat = new THREE.Quaternion();
  const headLookQuat = new THREE.Quaternion();
  const headLookEuler = new THREE.Euler(0, 0, 0, 'YXZ');
  let headLookYaw = 0;
  let headLookPitch = 0;

  /* ---------- Load seated character (author animation — no manual bones) ---------- */
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
    'models/ManLongSleeves.glb',
    (gltf) => {
      character = gltf.scene;
      character.traverse(tuneMaterial);

      character.traverse((obj) => {
        if (headBone) return;
        const isBone = obj.isBone === true || obj.type === 'Bone';
        if (!isBone) return;
        const n = (obj.name || '').toLowerCase().replace(/[^a-z]/g, '');
        if (n === 'head' || (n.endsWith('head') && !n.includes('fore'))) {
          headBone = obj;
        }
      });

      if (!headBone) {
        console.warn('[character] No head bone found; mouse look disabled');
      }

      const SIT_CLIP = 'HumanArmature|Man_Sitting';
      if (gltf.animations && gltf.animations.length) {
        const clip =
          gltf.animations.find(c => c.name === SIT_CLIP) ||
          gltf.animations.find(c => /sitting/i.test(c.name));
        if (clip) {
          mixer = new THREE.AnimationMixer(character);
          const action = mixer.clipAction(clip);
          action.reset();
          action.setLoop(THREE.LoopRepeat, 9999);
          action.clampWhenFinished = false;
          action.enabled = true;
          action.weight = 1;
          action.timeScale = 0.78;
          action.play();
          mixer.update(0.05);
        } else {
          console.warn('[character] No sitting clip on model');
        }
      }

      // Sit pose vs separate props: scale down + lower Y until seat meets chair (rig root ≠ butt height).
      const charScale = 0.28;
      character.scale.setScalar(charScale);
      character.position.set(0, -0.63, -0.04);
      character.rotation.y = 0;

      characterGroup.add(character);

      /* ---- Headphones, parented to the head bone ---- */
      if (headBone) {
        loader.load('models/Headphones.glb', (hp) => {
          const headphones = hp.scene;
          headphones.traverse(tuneMaterial);
          headphones.scale.setScalar(0.0085 * (charScale / 0.42));
          headphones.position.set(0, 0.08, 0.0);
          headphones.rotation.set(-0.05, 0, 0);
          headBone.add(headphones);
        }, undefined, (err) => console.error('Headphones load error', err));
      }
    },
    undefined,
    (err) => { console.error('Character GLB load error', err); }
  );

  /* ---- Office chair, behind the character ---- */
  loader.load('models/OfficeChair.glb', (gltf) => {
    const chair = gltf.scene;
    chair.traverse(tuneMaterial);
    chair.scale.setScalar(0.5);
    chair.position.set(0, -0.5, -0.42);
    chair.rotation.y = 0;
    characterGroup.add(chair);
  }, undefined, (err) => console.error('Chair load error', err));

  /* ---- Desk in front of the character ---- */
  loader.load('models/Desk.glb', (gltf) => {
    const desk = gltf.scene;
    desk.traverse(tuneMaterial);
    desk.scale.setScalar(0.52);
    desk.position.set(0, -0.5, 0.34);
    desk.rotation.y = 0;
    characterGroup.add(desk);
  }, undefined, (err) => console.error('Desk load error', err));

  /* ---- Laptop on top of the desk, screen facing the camera ---- */
  loader.load('models/Laptop.glb', (gltf) => {
    const laptop = gltf.scene;
    laptop.traverse(tuneMaterial);
    laptop.scale.setScalar(0.1);
    laptop.position.set(0, -0.02, 0.48);
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
  function setPointerFromClient(clientX, clientY) {
    mouseX = (clientX / window.innerWidth) * 2 - 1;
    mouseY = -(clientY / window.innerHeight) * 2 + 1;
  }

  document.addEventListener('mousemove', (e) => {
    setPointerFromClient(e.clientX, e.clientY);
  }, { passive: true });

  window.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'mouse') return;
    setPointerFromClient(e.clientX, e.clientY);
  }, { passive: true });

  document.addEventListener('touchstart', (e) => {
    if (!e.touches[0]) return;
    setPointerFromClient(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (!e.touches[0]) return;
    setPointerFromClient(e.touches[0].clientX, e.touches[0].clientY);
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
    /* Clock.getElapsedTime() internally calls getDelta() — never call getDelta()
       again in the same frame or the mixer's delta is ~0 and animations freeze. */
    const delta = clock.getDelta();
    const t = clock.elapsedTime;

    if (mixer) mixer.update(delta);

    cursorX = lerp(cursorX, mouseX, 0.12);
    cursorY = lerp(cursorY, mouseY, 0.12);

    /* Skinned head/eyes use the bone matrix — look is a local quat after the sitting clip. */
    if (headBone) {
      const activeLook = window.scrollY < window.innerHeight * 0.7;
      const maxYaw = 0.48;
      const maxPitch = 0.36;
      const tgtYaw = activeLook ? cursorX * maxYaw : 0;
      const tgtPitch = activeLook ? -cursorY * maxPitch : 0;
      headLookYaw = lerp(headLookYaw, tgtYaw, 0.16);
      headLookPitch = lerp(headLookPitch, tgtPitch, 0.16);

      headAnimQuat.copy(headBone.quaternion);
      headLookEuler.set(headLookPitch, headLookYaw, 0, 'YXZ');
      headLookQuat.setFromEuler(headLookEuler);
      headBone.quaternion.multiplyQuaternions(headAnimQuat, headLookQuat);
    }

    // Whole-body subtle parallax + scroll drift (apply to wrapper so model keeps its 180° face-forward rotation)
    if (character) {
      characterGroup.rotation.y = lerp(characterGroup.rotation.y, cursorX * 0.06 + scrollOffset * 0.5, 0.04);
      characterGroup.position.x = lerp(characterGroup.position.x, cursorX * 0.05 - scrollOffset * 0.3, 0.04);
      // Tiny Y bob only so seated pose still reads grounded (large bob felt like levitation).
      characterGroup.position.y = Math.sin(t * 0.9) * 0.012 + scrollOffset * -0.4;
    }

    // Orbit particles
    orbit.rotation.y = t * 0.18;
    particles.forEach(p => {
      p.position.y = 1.2 + Math.sin(t * p.userData.ySpeed + p.userData.yPhase) * 0.35;
      p.material.opacity = 0.55 + Math.sin(t * 2 + p.userData.yPhase) * 0.35;
    });

    // Camera scroll zoom
    camera.position.z = lerp(camera.position.z, 7.35 + scrollOffset * 1.6, 0.05);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}
