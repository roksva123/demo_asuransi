import * as THREE from 'three';

const palette = { ivory: 0xfbf7f2, white: 0xffffff, ink: 0x1a1614, red: 0xe5412d, yellow: 0xffb627, blush: 0xffe3da, warm: 0xe4ddd3 };
const isTouch = matchMedia('(hover: none)').matches;
const isSmall = matchMedia('(max-width: 767px)').matches;

function makeShield() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 1.65); shape.lineTo(1.1, 1.1); shape.lineTo(0.93, -0.35); shape.quadraticCurveTo(0.68, -1.25, 0, -1.65); shape.quadraticCurveTo(-0.68, -1.25, -0.93, -0.35); shape.lineTo(-1.1, 1.1); shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: 0.32, bevelEnabled: true, bevelSegments: isSmall ? 2 : 3, bevelSize: 0.08, bevelThickness: 0.08 });
  geometry.center();
  return new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: palette.ivory, roughness: 0.22, metalness: 0.05 }));
}

function addOrbitObjects(group) {
  const objects = [];
  const count = isSmall ? 4 : 8;
  const mats = [new THREE.MeshStandardMaterial({ color: palette.red, roughness: 0.3 }), new THREE.MeshStandardMaterial({ color: palette.yellow, roughness: 0.3 }), new THREE.MeshStandardMaterial({ color: palette.white, roughness: 0.28 })];
  for (let i = 0; i < count; i++) {
    const holder = new THREE.Group();
    const shape = i % 3 === 0 ? new THREE.BoxGeometry(0.33, 0.52, 0.25) : i % 3 === 1 ? new THREE.CylinderGeometry(0.16, 0.16, 0.09, isSmall ? 10 : 16) : new THREE.OctahedronGeometry(0.18, 0);
    const mesh = new THREE.Mesh(shape, mats[i % mats.length]);
    mesh.rotation.set(Math.random(), Math.random(), Math.random()); holder.add(mesh);
    const angle = (i / count) * Math.PI * 2; const radius = isSmall ? 1.9 : 2.1 + (i % 2) * 0.35;
    holder.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.62, (i % 3 - 1) * 0.3);
    holder.userData = { angle, radius, speed: 0.18 + i * 0.012, yScale: 0.62 };
    group.add(holder); objects.push(holder);
  }
  return objects;
}

function setupScene(canvas, compact = false) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100); camera.position.set(0, 0.15, compact ? 7 : 7.4);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !isSmall });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.5 : 2)); renderer.outputColorSpace = THREE.SRGBColorSpace;
  const root = new THREE.Group(); scene.add(root);
  const shield = makeShield(); root.add(shield);
  const inner = makeShield(); inner.scale.setScalar(0.72); inner.position.z = 0.2; inner.material = new THREE.MeshStandardMaterial({ color: palette.red, roughness: 0.25 }); root.add(inner);
  const orbit = new THREE.Group(); root.add(orbit); const floating = addOrbitObjects(orbit);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(2.13, 0.012, 8, isSmall ? 48 : 96), new THREE.MeshBasicMaterial({ color: palette.warm, transparent: true, opacity: 0.8 })); ring.rotation.x = Math.PI / 2.18; root.add(ring);
  scene.add(new THREE.HemisphereLight(0xffffff, palette.blush, 2.2)); const key = new THREE.DirectionalLight(0xffffff, 3.2); key.position.set(3, 5, 6); scene.add(key); const fill = new THREE.PointLight(palette.yellow, 2.2, 8); fill.position.set(-3, 1, 3); scene.add(fill);
  let pointer = { x: 0, y: 0 }, target = { x: 0, y: 0 }, scrollProgress = 0, visible = false, frame = 0;
  const resize = () => { const rect = canvas.parentElement.getBoundingClientRect(); const width = Math.max(rect.width, 1), height = Math.max(rect.height, 1); renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix(); };
  const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(canvas.parentElement); resize();
  const updatePointer = (x, y) => { pointer.x = x; pointer.y = y; };
  addEventListener('pointermove', (e) => { if (!isTouch) updatePointer((e.clientX / innerWidth - 0.5) * 2, (e.clientY / innerHeight - 0.5) * 2); }, { passive: true });
  canvas.addEventListener('touchmove', (e) => { const touch = e.touches[0]; updatePointer((touch.clientX / innerWidth - 0.5) * 2, (touch.clientY / innerHeight - 0.5) * 2); }, { passive: true });
  const onScroll = () => { scrollProgress = Math.min(1, Math.max(0, (scrollY - window.innerHeight * 0.25) / (window.innerHeight * 1.35))); }; addEventListener('scroll', onScroll, { passive: true });
  const tick = (time = 0) => { if (!visible) return; target.x += (pointer.x - target.x) * 0.045; target.y += (pointer.y - target.y) * 0.045; root.rotation.y = target.x * 0.22 + scrollProgress * Math.PI * 0.42; root.rotation.x = -target.y * 0.12; root.position.y = Math.sin(time * 0.0007) * 0.06 - scrollProgress * 0.18; root.scale.setScalar((compact ? 0.86 : 1) + scrollProgress * 0.13); floating.forEach((item) => { item.userData.angle += item.userData.speed * 0.006; item.position.x = Math.cos(item.userData.angle) * item.userData.radius; item.position.y = Math.sin(item.userData.angle) * item.userData.radius * item.userData.yScale; item.rotation.y += 0.004; }); ring.rotation.z += 0.0015; renderer.render(scene, camera); frame = requestAnimationFrame(tick); };
  const start = () => { if (!visible) { visible = true; frame = requestAnimationFrame(tick); } };
  const stop = () => { visible = false; cancelAnimationFrame(frame); };
  const observer = new IntersectionObserver(([entry]) => entry.isIntersecting ? start() : stop(), { threshold: 0.01 }); observer.observe(canvas);
  return { setValue(value) { const scale = 0.72 + value * 0.5; inner.scale.setScalar(scale); }, dispose() { stop(); observer.disconnect(); resizeObserver.disconnect(); renderer.dispose(); } };
}

export function initScenes() {
  const hero = document.querySelector('#hero-canvas'); const mini = document.querySelector('#mini-canvas'); const calc = document.querySelector('#calc-canvas');
  return { hero: hero ? setupScene(hero) : null, mini: mini ? setupScene(mini, true) : null, calc: calc ? setupScene(calc, true) : null };
}
