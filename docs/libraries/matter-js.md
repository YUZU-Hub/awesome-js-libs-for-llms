# Matter.js

> A 2D rigid body physics engine for the web

**Version:** 0.20.0
**Category:** physics-engine
**Bundle Size:** 87 kb (minified) / ~28 kb (gzipped)
**Dependencies:** None

---

## 🎯 What It Does

Matter.js is a JavaScript 2D rigid body physics engine that brings real-world physics simulation to the browser. It handles collision detection, gravity, friction, constraints, and sleeping bodies with a simple API. Perfect for games, interactive visualizations, and physics-based animations without requiring complex setup.

**Best for:**
- 2D physics games and simulations
- Interactive visualizations with realistic physics
- Collision detection and rigid body dynamics
- Gravity-based animations and falling objects

**Not suitable for:**
- 3D physics simulations (use Ammo.js or Cannon.js)
- Extremely large-scale simulations (50,000+ active bodies)
- Soft body physics (requires advanced workarounds)

---

## 📦 Installation

### CDN (Recommended)

```html
<!-- jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/matter-js@0.20.0/build/matter.min.js"></script>

<!-- or unpkg -->
<script src="https://unpkg.com/matter-js@0.20.0/build/matter.min.js"></script>

<!-- or cdnjs -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.20.0/matter.min.js"></script>
```

### npm

```bash
npm install matter-js
```

---

## ⚡ Quick Start

### Basic Falling Objects

```javascript
// Module aliases
const { Engine, Render, Runner, Bodies, Composite } = Matter;

// Create engine and renderer
const engine = Engine.create();
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 800,
    height: 600,
    wireframes: false
  }
});

// Create two boxes and a ground
const boxA = Bodies.rectangle(400, 200, 80, 80);
const boxB = Bodies.rectangle(450, 50, 80, 80);
const ground = Bodies.rectangle(400, 580, 810, 60, { isStatic: true });

// Add all bodies to the world
Composite.add(engine.world, [boxA, boxB, ground]);

// Run the renderer and engine
Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);
```

```html
<!-- HTML structure -->
<!DOCTYPE html>
<html>
<head>
  <style>body { margin: 0; overflow: hidden; }</style>
</head>
<body>
  <script src="https://cdn.jsdelivr.net/npm/matter-js@0.20.0/build/matter.min.js"></script>
  <script src="your-script.js"></script>
</body>
</html>
```

### Expected Output / Result

Two boxes fall under gravity and collide with each other before landing on a static ground. The physics simulation runs at 60fps with realistic collision response and momentum conservation.

---

## 🔧 Common Patterns

### Pattern 1: Creating Different Body Shapes

```javascript
const { Bodies } = Matter;

// Rectangle (x, y, width, height, options)
const box = Bodies.rectangle(200, 100, 80, 80, {
  restitution: 0.8,  // Bounciness (0-1)
  friction: 0.1,     // Surface friction
  density: 0.001     // Mass density
});

// Circle (x, y, radius, options)
const ball = Bodies.circle(300, 100, 40, {
  restitution: 0.9,
  render: { fillStyle: '#ff0000' }
});

// Polygon (x, y, sides, radius, options)
const hexagon = Bodies.polygon(400, 100, 6, 50);

// Custom vertices for complex shapes
const vertices = [
  { x: 0, y: 0 },
  { x: 50, y: 0 },
  { x: 50, y: 50 }
];
const triangle = Bodies.fromVertices(500, 100, vertices);
```

**When to use:** Creating game objects, obstacles, or interactive elements with different physical properties.

### Pattern 2: Mouse/Touch Interaction

```javascript
const { Mouse, MouseConstraint, World } = Matter;

// Create mouse control
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: { visible: false }
  }
});

World.add(engine.world, mouseConstraint);

// Keep mouse in sync with rendering
render.mouse = mouse;

// Prevent canvas from capturing scroll events
mouseConstraint.mouse.element.removeEventListener(
  "mousewheel",
  mouseConstraint.mouse.mousewheel
);
```

**When to use:** Enabling drag-and-drop physics, touch-based mobile games, or interactive physics demos.

### Pattern 3: Constraints and Connections

```javascript
const { Constraint, Bodies, Composite } = Matter;

// Create two bodies
const bodyA = Bodies.rectangle(200, 100, 50, 50);
const bodyB = Bodies.rectangle(300, 100, 50, 50);

// Connect them with a constraint (spring-like connection)
const constraint = Constraint.create({
  bodyA: bodyA,
  bodyB: bodyB,
  length: 100,        // Rest length
  stiffness: 0.4,     // Spring stiffness (0-1)
  damping: 0.1,       // Oscillation damping
  render: { visible: true }
});

Composite.add(engine.world, [bodyA, bodyB, constraint]);

// Pin a body to a fixed point
const pinConstraint = Constraint.create({
  bodyA: bodyA,
  pointA: { x: 0, y: 0 },
  pointB: { x: 200, y: 100 },
  stiffness: 1,
  length: 0
});
```

**When to use:** Creating pendulums, chains, ragdolls, rope bridges, or any connected physics objects.

---

## 📱 Mobile Considerations

### Touch Support
- ✅ Native touch events supported via MouseConstraint
- ✅ Works seamlessly on iOS and Android
- ⚠️ Requires canvas touch-action CSS for proper scroll handling

```css
canvas {
  touch-action: none; /* Prevents default touch behaviors */
}
```

### Responsive Behavior

```javascript
// Make canvas responsive to window size
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
    wireframes: false
  }
});

// Handle window resize
window.addEventListener('resize', () => {
  render.canvas.width = window.innerWidth;
  render.canvas.height = window.innerHeight;
});
```

### iOS/Android Gotchas
- Performance degrades on low-end devices with 100+ active bodies
- Enable sleeping to improve performance: `Engine.create({ enableSleeping: true })`
- Use larger collision tolerance on mobile: `engine.positionIterations = 3`
- Avoid high pixel density ratios: `mouse.pixelRatio = 1` instead of `window.devicePixelRatio`

---

## 🐛 Common Gotchas

### Issue 1: Bodies Fall Through Static Objects
**Problem:** Fast-moving bodies pass through thin static walls due to tunneling.
**Solution:** Use higher velocity iterations or thicker walls.

```javascript
const engine = Engine.create({
  velocityIterations: 8,  // Default is 4
  positionIterations: 6   // Default is 6
});

// Or make walls thicker
const ground = Bodies.rectangle(400, 580, 810, 100, { isStatic: true });
```

### Issue 2: Framerate Drops Cause Physics Slowdown
**Problem:** On low-end devices, when FPS drops from 60 to 30, physics run at half speed.
**Solution:** Use delta timing with fixed timesteps.

```javascript
// Use Runner with isFixed for consistent physics
const runner = Runner.create({
  isFixed: true,
  delta: 1000 / 60  // 60 FPS
});
Runner.run(runner, engine);
```

### Issue 3: Performance Degrades with Many Bodies
**Problem:** Adding thousands of bodies causes significant slowdown.
**Solution:** Enable sleeping, use broadphase optimization, and limit active bodies.

```javascript
const engine = Engine.create({
  enableSleeping: true  // Bodies stop calculating when at rest
});

// Remove off-screen bodies
bodies.forEach(body => {
  if (body.position.y > 1000) {
    Composite.remove(engine.world, body);
  }
});
```

---

## 💡 Pro Tips

- Enable `wireframes: false` in render options for colorful bodies instead of outlines
- Use `Body.setStatic(body, true)` to convert dynamic bodies to static at runtime
- Call `Engine.update(engine, 1000 / 60)` manually for custom game loops
- Set `body.collisionFilter.group = -1` to make bodies in the same group ignore collisions
- Use `Events.on(engine, 'collisionStart', callback)` to detect collisions
- Reduce render quality on mobile: `render.options.pixelRatio = 1`
- Pool and reuse bodies instead of creating/destroying for better performance

---

## 🔗 Resources

- [Official Documentation](https://brm.io/matter-js/docs/)
- [GitHub Repository](https://github.com/liabru/matter-js)
- [npm Package](https://www.npmjs.com/package/matter-js)
- [Examples & Demos](https://brm.io/matter-js/demo/)
- [Getting Started Wiki](https://github.com/liabru/matter-js/wiki/Getting-started)
- [Missing Tutorial (Beginner Guide)](https://alexandergottlieb.com/2017/01/19/matter.js-the-missing-tutorial/)

---

## 📊 Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | All | Full support |
| Firefox | All | Full support |
| Safari | All | Full support |
| Edge | All | Full support (Chromium-based) |
| IE | 8+ | Legacy support with polyfills |
| iOS Safari | All | Touch-optimized, may need performance tuning |
| Android Chrome | All | Full support, enable sleeping for performance |

---

## 🆚 Alternatives

When to consider other libraries:
- **Planck.js**: JavaScript port of Box2D with better performance for complex simulations; smaller community and fewer examples (5,181 stars)
- **Box2D**: Industry standard for complex physics; poor JavaScript documentation; better for native platforms; WASM version offers significant performance boost
- **p2.js**: Simpler API with built-in constraint types (vehicles, ragdolls); less active development; good for 2D games with moderate physics needs (2,685 stars)
- **Rapier.rs**: Rust-based WASM physics engine with massive performance gains; allows thousands more active bodies than Matter.js; steeper learning curve

**Choose Matter.js if:** You want good documentation, rich examples, active community (17,907 stars), and pure JavaScript implementation without WASM complexity.

---

## ⚠️ Breaking Changes

### v0.19.0 → v0.20.0
- Updated collision system for better stability
- Minor API improvements in constraint handling
- Check GitHub releases for specific migration notes

### v0.14.0 → v0.19.0
- Improved rendering performance
- Added better sleeping body detection
- Enhanced mobile touch support

---

**Last Updated:** 2025-12-19
**Verified Version:** 0.20.0
