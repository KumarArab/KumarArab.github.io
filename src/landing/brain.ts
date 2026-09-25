import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/**
 * A procedural brain made of two hemispheres:
 * left (code) is a point cloud with a faint wireframe, right (content) is glossy and iridescent.
 * `activity` goes from -1 (content side took over) to 1 (code side took over).
 */
export interface Brain {
  setColors(codeColor: string, contentColor: string): void;
  update(opts: { activity: number; px: number; py: number; t: number }): void;
  resize(w: number, h: number, size: number, portrait: boolean): void;
  dive(side: 'code' | 'content'): void;
}

// Brain-like folds: ridges from interfering sine fields, pushed along the surface normal.
function fold(x: number, y: number, z: number) {
  const a = Math.sin(11 * z + 3.2 * Math.sin(4.3 * y + 1.7 * x));
  const b = Math.sin(10 * y + 3.6 * Math.cos(5.1 * z - 1.3 * x));
  const c = Math.sin(9 * x + 2.8 * Math.sin(6.2 * z + 2.1 * y));
  return 1 - Math.abs(a * 0.55 + b * 0.35 + c * 0.25);
}

function hemisphere(side: -1 | 1, wSeg: number, hSeg: number) {
  const g = new THREE.SphereGeometry(1, wSeg, hSeg);
  const pos = g.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    // fold the sphere onto one side, leaving a flat inner wall along the midline
    const ax = Math.abs(v.x);
    let x = side * (0.045 + ax * 0.78);
    let y = v.y * 0.8 + (v.y > 0 ? 0 : v.y * 0.12);
    let z = v.z * 1.12 * (1 - 0.12 * Math.max(0, -v.y));
    // temporal-lobe bulge low and to the side
    y -= 0.12 * Math.exp(-((v.y + 0.35) ** 2) * 8) * ax;
    const d = 0.075 * (fold(v.x, v.y, v.z) - 0.55) * Math.min(1, ax * 3 + 0.25);
    const n = new THREE.Vector3(x, y, z).normalize();
    x += n.x * d; y += n.y * d; z += n.z * d;
    pos.setXYZ(i, x, y, z);
  }
  g.computeVertexNormals();
  return g;
}

export function createBrain(canvas: HTMLCanvasElement): Brain {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.set(0, 0, 5.2);

  const root = new THREE.Group();      // screen orientation (rotated on phones)
  const brain = new THREE.Group();     // tilt + sway
  root.add(brain);
  scene.add(root);

  // Left: code
  const codeGroup = new THREE.Group();
  const pointsMat = new THREE.PointsMaterial({ size: 0.016, transparent: true, opacity: 1, depthWrite: false, sizeAttenuation: true });
  const points = new THREE.Points(hemisphere(-1, 150, 110), pointsMat);
  const wireMat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.18 });
  const wire = new THREE.LineSegments(new THREE.WireframeGeometry(hemisphere(-1, 44, 32)), wireMat);
  codeGroup.add(points, wire);

  // Right: content
  const glossMat = new THREE.MeshPhysicalMaterial({
    roughness: 0.22, metalness: 0.15, clearcoat: 1, clearcoatRoughness: 0.12,
    iridescence: 1, iridescenceIOR: 1.35, iridescenceThicknessRange: [180, 620], transparent: true,
  });
  const gloss = new THREE.Mesh(hemisphere(1, 180, 140), glossMat);

  brain.add(codeGroup, gloss);
  brain.rotation.x = 0.95;

  const key = new THREE.DirectionalLight(0xffffff, 1.4);
  key.position.set(2, 3, 4);
  scene.add(key, new THREE.AmbientLight(0xffffff, 0.35));

  let diving: 'code' | 'content' | null = null;
  let diveStart = 0;
  let baseScale = 1;

  return {
    setColors(codeColor, contentColor) {
      pointsMat.color.set(codeColor);
      wireMat.color.set(codeColor);
      glossMat.color.set(contentColor);
    },
    resize(w, h, size, portrait) {
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      // scale so the brain's width on screen is roughly `size` pixels
      const visibleH = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      baseScale = (size / h) * visibleH / 2.1;
      root.rotation.z = portrait ? -Math.PI / 2 : 0;   // on phones: code on top, content below
    },
    dive(side) { diving = side; diveStart = performance.now(); },
    update({ activity, px, py, t }) {
      const codeOn = Math.max(0, activity), contentOn = Math.max(0, -activity);
      // whichever half is "thinking" swells and brightens, the other dims
      codeGroup.scale.setScalar(1 + 0.07 * codeOn - 0.03 * contentOn);
      gloss.scale.setScalar(1 + 0.07 * contentOn - 0.03 * codeOn);
      pointsMat.opacity = 1 - 0.75 * contentOn;
      wireMat.opacity = 0.18 * (1 - 0.8 * contentOn) + 0.12 * codeOn;
      glossMat.opacity = 1 - 0.7 * codeOn;

      brain.rotation.y = Math.sin(t * 0.35) * 0.18 + px * 0.5;
      brain.rotation.x = 0.95 + py * 0.25 + Math.sin(t * 0.5) * 0.04;
      root.scale.setScalar(baseScale * (1 + Math.sin(t * 1.3) * 0.01));

      if (diving) {
        const k = Math.min(1, (performance.now() - diveStart) / 900);
        const e = k * k * (3 - 2 * k);
        const dir = diving === 'code' ? -1 : 1;
        const local = new THREE.Vector3(dir * 0.5, 0, 0).applyEuler(root.rotation);
        camera.position.set(local.x * baseScale * e, local.y * baseScale * e, 5.2 - 4.4 * e);
      }
      renderer.render(scene, camera);
    },
  };
}
