# Phaser

> Fast, free, and fun open source HTML5 2D game framework for desktop and mobile web browsers

**Version:** 3.90.0
**Category:** game-development
**Bundle Size:** 880 KB (minified) / 233 KB (gzipped) - Custom builds: 110 KB (gzipped)
**Dependencies:** None

---

## 🎯 What It Does

Phaser is a comprehensive 2D game framework for creating HTML5 games with WebGL and Canvas rendering. It includes built-in physics engines (Arcade, Matter.js), sprite management, animations, input handling, audio, and scene management. Perfect for creating browser games, Discord Activities, YouTube Playables, or native apps via Cordova.

**Best for:**
- 2D platformers, shooters, puzzle games, and arcade-style games
- Rapid prototyping and game jams with complete feature set
- Games requiring built-in physics and collision detection
- Cross-platform deployment (web, mobile, desktop)

**Not suitable for:**
- 3D games (use Babylon.js or Three.js instead)
- Minimalist projects where bundle size is critical (consider PixiJS)
- Projects needing only basic rendering without game features

---

## 📦 Installation

### CDN (Recommended)

```html
<!-- Minified (recommended) -->
<script src="https://cdn.jsdelivr.net/npm/[email protected]/dist/phaser.min.js"></script>

<!-- Full version -->
<script src="https://cdn.jsdelivr.net/npm/[email protected]/dist/phaser.js"></script>

<!-- Alternative CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/3.90.0/phaser.min.js"></script>
```

### npm

```bash
npm install phaser

# Or create new project with scaffolding
npm create @phaserjs/game@latest
```

---

## ⚡ Quick Start

### Basic Usage

```javascript
const config = {
    type: Phaser.AUTO, // WebGL if available, otherwise Canvas
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 300 }, debug: false }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    // Load assets before game starts
    this.load.image('sky', 'assets/sky.png');
    this.load.image('player', 'assets/player.png');
}

function create() {
    // Create game objects after assets loaded
    this.add.image(400, 300, 'sky');
    this.player = this.physics.add.sprite(100, 450, 'player');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
}

function update() {
    // Game loop - runs 60 times per second
    const cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
        this.player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        this.player.setVelocityX(160);
    } else {
        this.player.setVelocityX(0);
    }

    if (cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-330);
    }
}
```

### Expected Output / Result

Creates a playable game with a controllable player sprite that can move left/right with arrow keys, jump with up arrow, and has physics-based gravity and collision with screen boundaries.

---

## 🔧 Common Patterns

### Pattern 1: Scene Management (ES6 Classes)

```javascript
class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    create() {
        this.add.text(400, 300, 'Click to Start', { fontSize: '32px' });
        this.input.once('pointerdown', () => {
            this.scene.start('GameScene'); // Switch to game
        });
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('player', 'assets/player.png');
    }

    create() {
        this.player = this.add.sprite(400, 300, 'player');
    }
}

const config = {
    scene: [MainMenu, GameScene] // Load multiple scenes
};
```

**When to use:** Organize complex games into menu, gameplay, pause, and game-over screens. Scenes manage their own assets, game objects, and lifecycle independently.

### Pattern 2: Sprite Animations & Input

```javascript
function preload() {
    this.load.spritesheet('dude', 'assets/dude.png', {
        frameWidth: 32,
        frameHeight: 48
    });
}

function create() {
    // Create animations from spritesheet
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1 // Loop forever
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
        this.player.anims.play('right', true);
    } else {
        this.player.setVelocityX(0);
        this.player.anims.play('turn');
    }
}
```

**When to use:** Character movement with sprite-based animations. Essential for platformers, top-down games, and any game with animated characters.

### Pattern 3: Collision Detection & Groups

```javascript
function create() {
    // Create platform group with physics
    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');

    // Create collectible items group
    const stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate((child) => {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    // Set up collisions
    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(this.player, stars, collectStar, null, this);
}

function collectStar(player, star) {
    star.disableBody(true, true); // Remove from scene
    this.score += 10;
}
```

**When to use:** Managing multiple game objects efficiently, handling collisions between players and platforms/enemies/collectibles.

---

## 📱 Mobile Considerations

### Touch Support
- ✅ Native touch events supported via unified Pointer API
- ✅ Multi-touch supported (up to 10 pointers, configurable)
- ✅ Touch smoothing available via `input.smoothFactor` config

### Responsive Behavior

```javascript
const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT, // Scale to fit screen
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    input: {
        activePointers: 3 // 1 mouse + 2 touch pointers
    }
};

// Detect mobile and adjust controls
function create() {
    if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
        // Create touch buttons for mobile
        this.createMobileControls();
    } else {
        this.cursors = this.input.keyboard.createCursorKeys();
    }
}
```

### iOS/Android Gotchas
- **Context menu:** Disable long-press menu with `document.addEventListener('contextmenu', e => e.preventDefault())`
- **Performance:** Reduce canvas size for better mobile performance (e.g., 300px width fixed)
- **Touch stuck:** Use `pointerup` globally, not just on buttons, to prevent stuck touch states
- **Asset loading:** Compress and lazy-load assets per scene to reduce initial load time

---

## 🐛 Common Gotchas

### Issue 1: Assets Not Loading
**Problem:** Blank screen or missing sprites, console shows 404 errors
**Solution:** Assets must be loaded in `preload()` before use in `create()`. Check file paths and ensure local web server is running (not file:// protocol)
```javascript
// ❌ Wrong - using asset before loading
function create() {
    this.add.image(400, 300, 'logo'); // Error: texture not found
}

// ✅ Correct - load in preload()
function preload() {
    this.load.image('logo', 'assets/logo.png');
}
function create() {
    this.add.image(400, 300, 'logo');
}
```

### Issue 2: Scene Lifecycle Confusion
**Problem:** `this.scene.start()` called multiple times causing scene restart loops
**Solution:** Use appropriate scene methods: `start` (full restart), `pause`/`resume`, `sleep`/`wake`. Only call once per transition.

### Issue 3: Physics Bodies Not Colliding
**Problem:** Objects pass through each other despite collision setup
**Solution:** Verify physics is enabled, bodies are active, and collision bounds are correct. Use `debug: true` in physics config to visualize.
```javascript
const config = {
    physics: {
        default: 'arcade',
        arcade: { debug: true } // Show collision boxes
    }
};
```

### Issue 4: Memory Leaks with Destroyed Sprites
**Problem:** References to destroyed sprites in arrays cause crashes
**Solution:** Clean up external references on scene shutdown
```javascript
this.events.on('shutdown', () => {
    this.enemies = []; // Clear array of sprite references
});
```

---

## 💡 Pro Tips

- **Custom builds:** Reduce bundle to ~110KB gzipped by using custom builds with only needed features
- **Object pooling:** Reuse game objects instead of creating/destroying for better performance
- **Debug mode:** Use `physics.arcade.debug: true` to visualize collision boxes and debug physics
- **Asset packing:** Use texture atlases instead of individual images to reduce HTTP requests
- **Local server required:** Drag-and-drop HTML files won't work due to CORS. Use `npx http-server` or similar

---

## 🔗 Resources

- [Official Documentation](https://docs.phaser.io/)
- [GitHub Repository](https://github.com/phaserjs/phaser)
- [npm Package](https://www.npmjs.com/package/phaser)
- [Making Your First Game Tutorial](https://phaser.io/tutorials/making-your-first-phaser-3-game)
- [Phaser Examples & Labs](https://labs.phaser.io/)

---

## 📊 Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | Any with Canvas | Full WebGL support |
| Firefox | Any with Canvas | Full support with positional audio |
| Safari | Any with Canvas | WebGL + Canvas fallback |
| Edge | Any with Canvas | Full support |
| iOS Safari | Any with Canvas | Touch optimized, auto-fallback |
| Android Chrome | Any with Canvas | Full support |

**Minimum requirement:** Any browser supporting HTML5 Canvas (virtually all modern browsers). Phaser automatically switches between WebGL and Canvas rendering based on support.

---

## 🆚 Alternatives

When to consider other libraries:
- **PixiJS**: Lighter (focus on rendering only, no physics) if you need minimal bundle and can build game logic yourself
- **Kaboom.js**: Simpler API for beginners, game jams, and rapid prototyping, but slower performance
- **Babylon.js**: Better for 3D games with built-in 3D physics and rendering (can also do 2D)
- **Excalibur.js**: TypeScript-first approach with excellent DX for TypeScript projects

---

**Last Updated:** 2025-12-19
**Verified Version:** 3.90.0
