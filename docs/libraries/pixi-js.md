# PixiJS

> Fast, lightweight 2D WebGL and WebGPU rendering engine for interactive graphics and games

**Version:** 8.14.3
**Category:** graphics-rendering
**Bundle Size:** 222 KB (gzipped)
**Dependencies:** 11 dependencies

---

## What It Does

PixiJS is a high-performance 2D rendering library that uses WebGL/WebGPU to render graphics on the HTML5 Canvas. It provides a scene graph for organizing display objects and handles rendering optimizations automatically through sprite batching. Unlike game frameworks, PixiJS focuses purely on rendering, giving you full control over game logic, physics, and architecture.

**Best for:**
- Interactive web graphics and data visualizations
- 2D games requiring custom logic and high performance
- Banner ads and rich media content
- Creative coding and generative art
- Applications needing pixel-perfect 2D rendering

**Not suitable for:**
- Simple static graphics (use Canvas 2D API or SVG)
- 3D rendering (use Three.js or Babylon.js)
- Beginners wanting built-in game features (use Phaser instead)

---

## Installation

### CDN (Recommended)

```html
<!-- PixiJS v8 (WebGL 2.0 required) -->
<script src="https://cdn.jsdelivr.net/npm/pixi.js@8.14.3/dist/pixi.min.mjs"></script>

<!-- For older browsers with WebGL 1.0 fallback -->
<script src="https://cdn.jsdelivr.net/npm/pixi.js-legacy@7.x/dist/pixi-legacy.min.js"></script>
```

### npm

```bash
npm install pixi.js

# For legacy browser support (WebGL 1.0 + Canvas 2D fallback)
npm install pixi.js-legacy
```

```javascript
// Import everything (tree-shakeable in v8+)
import * as PIXI from 'pixi.js';

// Or import specific items
import { Application, Sprite, Assets } from 'pixi.js';
```

---

## Quick Start

### Basic Setup

```javascript
// Create application with default canvas
const app = new PIXI.Application();
await app.init({ width: 800, height: 600 });

// Add canvas to DOM
document.body.appendChild(app.canvas);

// Load texture and create sprite
const texture = await PIXI.Assets.load('https://pixijs.com/assets/bunny.png');
const bunny = new PIXI.Sprite(texture);

// Position sprite at center
bunny.anchor.set(0.5);
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

// Add to stage
app.stage.addChild(bunny);

// Animate with ticker
app.ticker.add((time) => {
  bunny.rotation += 0.01 * time.deltaTime;
});
```

### Expected Output

A rotating bunny sprite centered on an 800x600 canvas. The ticker runs at ~60fps, with rotation speed adjusted for frame delta time.

---

## Common Patterns

### Pattern 1: Application Initialization with Options

```javascript
const app = new PIXI.Application();
await app.init({
  width: 800,
  height: 600,
  backgroundColor: 0x1099bb, // Hex color
  resolution: window.devicePixelRatio || 1, // Retina support
  autoDensity: true, // Auto-adjust CSS size
  antialias: false, // Disable for better mobile performance
  useContextAlpha: false // Opaque canvas for performance
});

document.body.appendChild(app.canvas);
```

**When to use:** Every PixiJS project. Configure resolution for retina displays and disable antialias/alpha for mobile performance.

### Pattern 2: Sprites and Containers

```javascript
// Create container for grouping
const container = new PIXI.Container();
container.x = 100;
container.y = 100;
app.stage.addChild(container);

// Add multiple sprites to container
for (let i = 0; i < 10; i++) {
  const sprite = PIXI.Sprite.from('sprite.png');
  sprite.x = i * 50;
  container.addChild(sprite); // Inherits container transforms
}

// Transform entire group
container.scale.set(2); // 2x scale
container.rotation = Math.PI / 4; // 45 degrees
```

**When to use:** Grouping related objects, applying transforms to multiple sprites, organizing scene hierarchy for rendering order.

### Pattern 3: Asset Loading and Preloading

```javascript
// Load single asset
const texture = await PIXI.Assets.load('sprite.png');

// Preload multiple assets
await PIXI.Assets.load([
  'background.png',
  'character.png',
  'spritesheet.json'
]);

// Load with progress callback
PIXI.Assets.load('large-image.png', (progress) => {
  console.log(`Loading: ${progress * 100}%`);
});

// Use loaded texture
const sprite = PIXI.Sprite.from('sprite.png'); // Cached
```

**When to use:** Load assets before rendering. Use batch loading with progress tracking for loading screens.

### Pattern 4: Animation Loop with Ticker

```javascript
// Add to shared ticker
app.ticker.add((time) => {
  // time.deltaTime: Frame time multiplier (1.0 = 60fps)
  // time.deltaMS: Milliseconds since last frame

  sprite.x += 2 * time.deltaTime; // Frame-rate independent
  sprite.rotation += 0.05 * time.deltaTime;

  // Wrap around screen
  if (sprite.x > app.screen.width) {
    sprite.x = 0;
  }
});

// Control ticker speed
app.ticker.speed = 0.5; // Half speed
app.ticker.stop(); // Pause
app.ticker.start(); // Resume
```

**When to use:** All animations and game loops. Always multiply movement by deltaTime for frame-rate independence.

### Pattern 5: Sprite Sheets and Animated Sprites

```javascript
// Load spritesheet JSON
await PIXI.Assets.load('spritesheet.json');

// Create animated sprite from frames
const frames = [];
for (let i = 0; i < 10; i++) {
  frames.push(PIXI.Texture.from(`frame-${i}.png`));
}

const animatedSprite = new PIXI.AnimatedSprite(frames);
animatedSprite.animationSpeed = 0.1666; // ~10fps
animatedSprite.play();
app.stage.addChild(animatedSprite);
```

**When to use:** Character animations, sprite-based effects. Use TexturePacker to create spritesheets for optimal loading.

### Pattern 6: Interactive Events

```javascript
// Enable interaction
sprite.eventMode = 'static'; // 'static' for non-moving, 'dynamic' for moving
sprite.cursor = 'pointer';

// Pointer events (works for mouse AND touch)
sprite.on('pointerdown', (event) => {
  console.log('Clicked at:', event.global.x, event.global.y);
  sprite.alpha = 0.5;
});

sprite.on('pointerup', () => {
  sprite.alpha = 1.0;
});

sprite.on('pointerover', () => {
  sprite.scale.set(1.1);
});

// Disable interaction for children (performance)
container.eventMode = 'static';
container.interactiveChildren = false;
```

**When to use:** Buttons, draggable objects, interactive elements. Use pointer events for cross-platform compatibility.

---

## Mobile Considerations

### Touch Support
- Native touch events supported, normalized to pointer events
- Use `pointerdown`, `pointermove`, `pointerup` for cross-platform compatibility
- Multi-touch requires separate `touchstart`, `touchmove`, `touchend` events
- Older Android browsers may duplicate touch events with ~100ms delay

### Responsive Behavior
```javascript
// Retina display support
const app = new PIXI.Application();
await app.init({
  resolution: window.devicePixelRatio || 1,
  autoDensity: true // Auto-adjust CSS size
});

// Resize handler
window.addEventListener('resize', () => {
  app.renderer.resize(window.innerWidth, window.innerHeight);
});
```

### iOS/Android Gotchas
- **iOS touchend bug**: Sliding finger during touch may not fire `touchend`. Use `touchmove` to detect drag-end.
- **Retina blurriness**: Always set `resolution: window.devicePixelRatio` and `autoDensity: true`
- **Performance**: Disable `antialias` and `useContextAlpha` for older devices
- **Android duplicates**: Some older devices fire both mouse and touch events simultaneously

---

## Common Gotchas

### Issue 1: WebGL Unsupported Error
**Problem:** "WebGL unsupported in this browser, use 'pixi.js-legacy' for fallback canvas2d support"
**Solution:** PixiJS v8 requires WebGL 2.0. For older browsers or devices without WebGL 2.0:
```javascript
// Use legacy version with Canvas 2D fallback
import * as PIXI from 'pixi.js-legacy';

// OR ignore performance caveat (may be slow)
PIXI.settings.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = false;
```

### Issue 2: Context Loss in SPAs
**Problem:** Multiple renderer creation/destruction causes "context lost" error
**Solution:** Create one renderer instance and reuse it:
```javascript
// Store globally or in app state
const renderer = await PIXI.autoDetectRenderer({
  width: 800,
  height: 600
});

// Reuse across page transitions instead of creating new instances
```

### Issue 3: Blurry Graphics on Retina
**Problem:** Sprites appear blurry on high-DPI displays
**Solution:** Set resolution and autoDensity:
```javascript
await app.init({
  resolution: window.devicePixelRatio || 1,
  autoDensity: true
});
```

### Issue 4: Poor Filter Performance
**Problem:** Filters cause lag and memory issues
**Solution:** Use filters sparingly and set filterArea:
```javascript
container.filters = [new PIXI.BlurFilter()];
container.filterArea = new PIXI.Rectangle(0, 0, 200, 200); // Skip measurement
```

### Issue 5: Texture Memory Leaks
**Problem:** Memory grows over time with dynamic texture loading
**Solution:** Destroy unused textures:
```javascript
sprite.destroy({ texture: true, baseTexture: true });
PIXI.Assets.unload('sprite.png'); // Remove from cache
```

---

## Pro Tips

- **Sprite Batching**: Group sprites with same texture and blend mode to minimize draw calls. Up to 16 textures can batch together (hardware dependent).
- **Use Spritesheets**: Pack multiple images into spritesheets with tools like TexturePacker to reduce HTTP requests and enable batching.
- **Object Pooling**: Reuse destroyed objects instead of creating new ones for frequently spawned items (bullets, particles).
- **Cull Off-Screen Objects**: Set `sprite.renderable = false` for objects outside viewport to skip rendering.
- **Avoid Overusing Containers**: Containers are cheap, but deep nesting (10+ levels) impacts transform calculations.
- **Test on Real Devices**: Mobile performance varies significantly. Always test on target devices, especially older Android phones.

---

## Resources

- [Official Documentation](https://pixijs.com/8.x/guides)
- [GitHub Repository](https://github.com/pixijs/pixijs)
- [npm Package](https://www.npmjs.com/package/pixi.js)
- [Examples & Demos](https://pixijs.com/8.x/examples)
- [API Reference](https://pixijs.download/v8.14.3/docs/index.html)
- [PixiJS Discord Community](https://discord.gg/pixijs)

---

## Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 90+ | Full WebGL 2.0 support |
| Firefox | 88+ | Full WebGL 2.0 support |
| Safari | 15+ | WebGL 2.0 supported |
| Edge | 90+ | Full WebGL 2.0 support |
| iOS Safari | 15+ | WebGL 2.0 required for v8 |
| Android Chrome | 90+ | Some older devices have WebGL issues |

**Note:** PixiJS v8 requires WebGL 2.0. For WebGL 1.0 or Canvas 2D fallback, use `pixi.js-legacy` v7.x.

---

## Alternatives

When to consider other libraries:
- **Phaser**: Full game framework with physics, audio, tilemaps, and built-in collision detection. Choose if you want out-of-the-box game features (~2x larger bundle).
- **Canvas 2D API**: Native browser API for simple 2D graphics. Better for static content, no WebGL dependency, but much slower for many objects.
- **Three.js**: For 3D rendering or 2D/3D hybrid projects. More complex but handles 3D transforms and lighting.
- **Babylon.js**: Game engine with 2D/3D support, physics, and advanced features. Larger bundle but more comprehensive than Phaser.

---

## Breaking Changes

### v7.0.0 → v8.0.0
- **WebGL 2.0 required**: No WebGL 1.0 fallback. Use `pixi.js-legacy` for older browsers.
- **Container replaces DisplayObject**: All scene objects extend Container now.
- **Event system changes**: `globalpointermove`/`globalmousemove` events replace old always-firing move events.
- **onRender callback**: Replaces `updateTransform` override pattern from v7.
- **Import structure**: Simplified to single `pixi.js` import root with better tree-shaking.

### v6.0.0 → v7.0.0
- **Event mode system**: New `eventMode` property replaces `interactive` and `interactiveChildren`.
- **Assets API**: New `PIXI.Assets` replaces old Loader system.
- **TypeScript rewrite**: Full TypeScript support with improved type definitions.

---

**Last Updated:** 2025-12-19
**Verified Version:** 8.14.3
