# Babylon.js

> Powerful WebGL-based 3D engine for creating browser-based games and interactive 3D experiences

**Version:** 8.42.0
**Category:** 3d-graphics
**Bundle Size:** 1.57 MB (minified + gzipped)
**Dependencies:** None (optional: physics engines like Cannon.js, Ammo.js)

---

## What It Does

Babylon.js is a complete JavaScript framework for building 3D games and experiences with WebGL. Unlike basic rendering libraries, it provides a full game development ecosystem including physics, animations, materials, cameras, lighting, and native VR/XR support. Written in TypeScript, it offers comprehensive type safety and built-in scene inspection tools.

**Best for:**
- Browser-based 3D games with physics and collision detection
- Interactive 3D visualizations and product configurators
- WebXR experiences (VR/AR applications)
- Cross-platform 3D applications requiring TypeScript support

**Not suitable for:**
- Simple 2D graphics or lightweight visualizations
- Projects requiring minimal bundle sizes (<500KB)
- Static 3D model display without interactivity

---

## Installation

### CDN (Quick Prototyping)

```html
<!-- Core library -->
<script src="https://cdn.babylonjs.com/babylon.js"></script>

<!-- Optional: Model loaders (glTF, OBJ, etc.) -->
<script src="https://cdn.babylonjs.com/loaders/babylonjs.loaders.min.js"></script>

<!-- Optional: Physics engine -->
<script src="https://cdn.babylonjs.com/cannon.js"></script>
```

### npm (Production Recommended)

```bash
npm install @babylonjs/core @babylonjs/loaders
```

**Important:** Use `@babylonjs/core` (ES6 modules) instead of `babylonjs` package for tree-shaking benefits and smaller bundle sizes.

---

## Quick Start

### Basic 3D Scene

```html
<!DOCTYPE html>
<html>
<head>
    <title>Babylon.js Basic Scene</title>
    <script src="https://cdn.babylonjs.com/babylon.js"></script>
    <style>
        body, #renderCanvas {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }
    </style>
</head>
<body>
    <canvas id="renderCanvas"></canvas>
    <script>
        const canvas = document.getElementById("renderCanvas");
        const engine = new BABYLON.Engine(canvas, true);

        const createScene = function() {
            const scene = new BABYLON.Scene(engine);

            // Camera: orbit around center
            const camera = new BABYLON.ArcRotateCamera(
                "camera",
                Math.PI / 4,
                Math.PI / 3,
                8,
                BABYLON.Vector3.Zero(),
                scene
            );
            camera.attachControl(canvas, true);

            // Light
            const light = new BABYLON.HemisphericLight(
                "light",
                new BABYLON.Vector3(1, 1, 0),
                scene
            );

            // Create a box
            const box = BABYLON.MeshBuilder.CreateBox("box", {size: 2}, scene);
            box.position.y = 1;

            return scene;
        };

        const scene = createScene();

        // Render loop
        engine.runRenderLoop(() => {
            scene.render();
        });
    </script>
</body>
</html>
```

### ES6 Module Usage

```javascript
import { Engine, Scene, ArcRotateCamera, HemisphericLight, Vector3, MeshBuilder } from '@babylonjs/core';

const canvas = document.getElementById("renderCanvas");
const engine = new Engine(canvas, true);
const scene = new Scene(engine);

const camera = new ArcRotateCamera("camera", Math.PI / 4, Math.PI / 3, 8, Vector3.Zero(), scene);
camera.attachControl(canvas, true);

const light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);
const box = MeshBuilder.CreateBox("box", {size: 2}, scene);

engine.runRenderLoop(() => scene.render());
```

### Expected Output

A 3D rotating box centered in the viewport with orbit camera controls (drag to rotate, scroll to zoom).

---

## Common Patterns

### Pattern 1: Creating Meshes with Materials

```javascript
const createScene = function() {
    const scene = new BABYLON.Scene(engine);

    // Create sphere with material
    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2}, scene);
    const material = new BABYLON.StandardMaterial("material", scene);
    material.diffuseColor = new BABYLON.Color3(0.4, 0.7, 1.0);
    material.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    sphere.material = material;

    return scene;
};
```

**When to use:** Applying textures, colors, and visual properties to 3D objects.

### Pattern 2: Physics Integration

```javascript
import { PhysicsAggregate } from '@babylonjs/core';
import * as CANNON from 'cannon';

// Enable physics
scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin(true, 10, CANNON));

// Create ground
const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 10, height: 10}, scene);
const groundAggregate = new BABYLON.PhysicsAggregate(
    ground,
    BABYLON.PhysicsShapeType.BOX,
    { mass: 0, restitution: 0.7 },
    scene
);

// Create falling sphere
const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 1}, scene);
sphere.position.y = 5;
const sphereAggregate = new BABYLON.PhysicsAggregate(
    sphere,
    BABYLON.PhysicsShapeType.SPHERE,
    { mass: 1, restitution: 0.9 },
    scene
);
```

**When to use:** Adding gravity, collisions, and realistic physics to objects.

### Pattern 3: Camera Types

```javascript
// Free Camera (first-person)
const freeCamera = new BABYLON.FreeCamera("freeCamera", new BABYLON.Vector3(0, 5, -10), scene);
freeCamera.setTarget(BABYLON.Vector3.Zero());
freeCamera.attachControl(canvas, true);

// Arc Rotate Camera (orbit around target)
const arcCamera = new BABYLON.ArcRotateCamera("arcCamera", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
arcCamera.setPosition(new BABYLON.Vector3(0, 5, -10));

// Follow Camera (tracks moving object)
const followCamera = new BABYLON.FollowCamera("followCamera", new BABYLON.Vector3(0, 5, -10), scene);
followCamera.radius = 10;
followCamera.heightOffset = 5;
followCamera.lockedTarget = targetMesh;

// Touch Camera (mobile-optimized)
const touchCamera = new BABYLON.TouchCamera("touchCamera", new BABYLON.Vector3(0, 5, -10), scene);
```

**When to use:** Choose based on interaction style - FPS games (FreeCamera), product viewers (ArcRotateCamera), racing games (FollowCamera), mobile apps (TouchCamera).

### Pattern 4: Lighting Setup

```javascript
// Hemispheric light (ambient, soft)
const hemiLight = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), scene);
hemiLight.intensity = 0.7;

// Directional light (sun, shadows)
const dirLight = new BABYLON.DirectionalLight("dirLight", new BABYLON.Vector3(-1, -2, -1), scene);
dirLight.position = new BABYLON.Vector3(20, 40, 20);
dirLight.intensity = 1.0;

// Point light (lamp, omnidirectional)
const pointLight = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 10, 0), scene);
pointLight.intensity = 0.5;

// Spot light (flashlight, cone)
const spotLight = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(0, 10, 0), new BABYLON.Vector3(0, -1, 0), Math.PI / 3, 2, scene);
```

**When to use:** Hemispheric for outdoor scenes, directional for sun/moon, point for lamps, spot for focused beams.

---

## Mobile Considerations

### Touch Support
- Native touch event support via UniversalCamera and TouchCamera
- Pointer Events specification handles mouse, touch, and stylus uniformly
- Built-in multi-touch gestures for pinch-zoom and rotation

### Responsive Behavior
```javascript
// Handle window resize
window.addEventListener('resize', () => {
    engine.resize();
});

// Optimize for mobile performance
scene.skipPointerMovePicking = true; // Disable pointer move picking
engine.loadingUIBackgroundColor = "#000000";
```

### Performance Optimization
- Minimize draw calls by merging meshes
- Use Level of Detail (LOD) for distant objects
- Compress textures and reduce resolution
- Simplify collision meshes
- Test on actual devices - Android/iOS performance varies significantly

### iOS/Android Gotchas
- iOS Safari may disable WebGL under memory pressure - monitor console
- Some Android devices default to WebGL 1.0 instead of 2.0
- Video textures may not autoplay on mobile without user interaction
- Request fullscreen only from user gesture handlers

---

## Common Gotchas

### Issue 1: WebGL Not Supported Error
**Problem:** Browser shows "WebGL not supported" despite modern browser
**Solution:** Check if WebGL is disabled in browser settings or blocked by GPU blacklist
```javascript
if (!engine.webGLVersion) {
    console.error("WebGL not available");
    // Show fallback UI
}
```

### Issue 2: Scene Not Rendering
**Problem:** Blank canvas despite no errors
**Solution:** Ensure render loop is running and canvas has dimensions
```javascript
// Canvas must have explicit dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Must call render loop
engine.runRenderLoop(() => {
    scene.render();
});
```

### Issue 3: Multiple WebGL Contexts
**Problem:** Using Babylon.js with other WebGL libraries (Pixi, Three.js) causes conflicts
**Solution:** Create contexts sequentially and share contexts when possible - avoid creating multiple renderers simultaneously

### Issue 4: Large Bundle Size
**Problem:** Production bundle exceeds 3MB
**Solution:** Use `@babylonjs/core` with selective imports for tree-shaking
```javascript
// Instead of:
import * as BABYLON from '@babylonjs/core';

// Use selective imports:
import { Scene } from '@babylonjs/core/scene';
import { Engine } from '@babylonjs/core/Engines/engine';
```

---

## Pro Tips

- Use the official Playground (babylonjs.com/playground) to prototype and share examples
- Enable scene inspector for debugging: `scene.debugLayer.show()`
- Use Spector.js browser extension for WebGL debugging and performance profiling
- Implement LOD (Level of Detail) for complex scenes with many objects
- Cache mesh calculations with `mesh.freezeWorldMatrix()` for static objects
- Use AssetManager for loading multiple resources with progress tracking

---

## Resources

- [Official Documentation](https://doc.babylonjs.com/)
- [GitHub Repository](https://github.com/BabylonJS/Babylon.js)
- [npm Package (@babylonjs/core)](https://www.npmjs.com/package/@babylonjs/core)
- [Interactive Playground](https://playground.babylonjs.com/)
- [Forum & Community](https://forum.babylonjs.com/)

---

## Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 90+ | Full WebGL 2.0 support |
| Firefox | 88+ | Full WebGL 2.0 support |
| Safari | 14+ | WebGL 2.0 support, iOS may limit under memory pressure |
| Edge | 90+ | Full WebGL 2.0 support |
| iOS Safari | 14+ | Touch optimized, WebGL 1.0/2.0 based on device |
| Android Chrome | 90+ | WebGL 2.0 support varies by device |

**Note:** WebGL 2.0 recommended but falls back to WebGL 1.0 automatically. IE11+ supports WebGL 1.0 only.

---

## Alternatives

When to consider other libraries:
- **Three.js**: Better if you need the largest community, more npm packages, or React integration (react-three-fiber)
- **PlayCanvas**: Better if you need visual editor with real-time team collaboration and cloud hosting
- **Unity WebGL**: Better for complex games with extensive Unity assets, but much larger bundle sizes (10MB+)

**Why choose Babylon.js:**
- Native TypeScript support (not external typings)
- Complete game engine features (physics, audio, input manager)
- Excellent documentation and official playground
- Smaller bundle than Unity, more features than Three.js

---

**Last Updated:** 2025-12-19
**Verified Version:** 8.42.0
