# Three.js

> 3D graphics library using WebGL

**Version:** 0.182.0
**Category:** 3d-graphics
**Bundle Size:** 600 kb (minified) / 150 kb (gzipped)
**Dependencies:** None

---

## 🎯 What It Does

Three.js is the most popular JavaScript library for creating 3D graphics in the browser using WebGL. It abstracts complex WebGL APIs into an intuitive scene graph with cameras, lights, geometries, and materials.

**Best for:**
- Interactive 3D product viewers
- Data visualizations in 3D
- Games and immersive experiences
- Animated 3D backgrounds
- VR/AR web applications

**Not suitable for:**
- 2D graphics (use PixiJS or Canvas)
- Simple UI animations (use GSAP or CSS)
- Large-scale game development (use Babylon.js or Unity)

---

## 📦 Installation

### CDN (ES Modules)

```html
<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.182.0/build/three.module.js"
  }
}
</script>
<script type="module">
  import * as THREE from 'three';
</script>
```

### npm

```bash
npm install three@0.182.0
```

```javascript
import * as THREE from 'three';
```

---

## ⚡ Quick Start

### Basic Scene with Rotating Cube

```html
<!DOCTYPE html>
<html>
<head>
  <style>body { margin: 0; } canvas { display: block; }</style>
</head>
<body>
<script type="module">
  import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.182.0/build/three.module.js';

  // Create scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create cube
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();
</script>
</body>
</html>
```

---

## 🔧 Common Patterns

### Pattern 1: Scene with Lighting

```javascript
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

// Camera
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

// Lighting (required for MeshStandardMaterial)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Mesh with standard material
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
```

**When to use:** Realistic rendering, product showcases

### Pattern 2: Load 3D Model (GLTF)

```javascript
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
loader.load('/model.glb', (gltf) => {
  scene.add(gltf.scene);
}, undefined, (error) => {
  console.error('Error loading model:', error);
});
```

**When to use:** Loading pre-made 3D models, characters, products

### Pattern 3: OrbitControls (Mouse/Touch Interaction)

```javascript
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Required for damping
  renderer.render(scene, camera);
}
```

**When to use:** Product viewers, interactive 3D exploration

### Pattern 4: Handle Window Resize

```javascript
window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
});
```

**When to use:** Always - prevents distortion on resize

---

## 📱 Mobile Considerations

### Touch Support
- ✅ WebGL supported on iOS 8+ and Android 5+
- ✅ OrbitControls handles touch automatically
- ⚠️ Performance varies widely by device

### Performance Optimization

```javascript
// Limit pixel ratio for mobile
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Use lower polygon counts
const geometry = new THREE.SphereGeometry(1, 16, 16); // Less segments

// Dispose resources when done
geometry.dispose();
material.dispose();
renderer.dispose();
```

### iOS/Android Gotchas
- **WebGL context lost**: Handle with `renderer.domElement.addEventListener('webglcontextlost', ...)`
- **Memory limits**: Dispose textures and geometries aggressively
- **Battery drain**: Use `renderer.setAnimationLoop()` and pause when hidden

---

## 🐛 Common Gotchas

### Issue 1: Black Screen (No Lights)
```javascript
// ❌ Wrong - MeshStandardMaterial needs light
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });

// ✅ Correct - Add lights OR use MeshBasicMaterial
scene.add(new THREE.AmbientLight(0xffffff));
// OR
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
```

### Issue 2: Objects Not Visible
```javascript
// Check: Camera position vs object position
camera.position.z = 5; // Camera at z=5
cube.position.z = 0;   // Object at origin

// Check: Object inside camera frustum
// near/far: 0.1 to 1000 means objects must be between those distances
```

### Issue 3: Memory Leaks
```javascript
// ❌ Wrong - Never disposed
scene.remove(mesh);

// ✅ Correct - Dispose geometry and material
scene.remove(mesh);
mesh.geometry.dispose();
mesh.material.dispose();
if (mesh.material.map) mesh.material.map.dispose();
```

### Issue 4: Distorted on Resize
```javascript
// Must update camera aspect AND projection matrix
camera.aspect = innerWidth / innerHeight;
camera.updateProjectionMatrix(); // Don't forget this!
renderer.setSize(innerWidth, innerHeight);
```

---

## 💡 Pro Tips

- **Use BufferGeometry** for all custom geometry (faster than legacy Geometry)
- **Merge geometries** when possible to reduce draw calls
- **Use InstancedMesh** for many identical objects
- **Enable shadows carefully** - expensive on mobile
- **Use requestAnimationFrame** through `renderer.setAnimationLoop()`
- **Texture size** should be power of 2 (256, 512, 1024)
- **Compress textures** with Basis Universal or KTX2

---

## 🔗 Resources

- [Official Documentation](https://threejs.org/docs/)
- [GitHub Repository](https://github.com/mrdoob/three.js)
- [npm Package](https://www.npmjs.com/package/three)
- [Examples Gallery](https://threejs.org/examples/)
- [Three.js Journey Course](https://threejs-journey.com/)

---

## 📊 Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 90+ | Full WebGL 2.0 |
| Firefox | 88+ | Full WebGL 2.0 |
| Safari | 14+ | WebGL 2.0 from Safari 15 |
| Edge | 90+ | Full WebGL 2.0 |
| iOS Safari | 14+ | WebGL 2.0 from iOS 15 |
| Android Chrome | 90+ | Full support |

**Requires:** WebGL 1.0 minimum (WebGL 2.0 recommended)

---

## 🆚 Alternatives

- **Babylon.js**: More game-focused, better documentation, larger bundle
- **A-Frame**: HTML-based, built on Three.js, easier for VR
- **PlayCanvas**: Full game engine with visual editor
- **Spline**: No-code 3D design tool with export to Three.js

---

## ⚠️ Breaking Changes

### r150+ → r160
- WebGPU renderer introduced (experimental)
- Some material properties renamed
- Loader APIs standardized

### r125 → r150
- `Geometry` class removed (use `BufferGeometry`)
- `Face3` removed
- Many examples moved to `/examples/jsm/`

---

**Last Updated:** 2024-12-19
**Verified Version:** 0.160.0
