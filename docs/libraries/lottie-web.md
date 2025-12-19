# Lottie Web

> Render After Effects animations natively on the web in real-time

**Version:** 5.13.0
**Category:** animation
**Bundle Size:** 156 kb (minified) / 52 kb (gzipped)
**Dependencies:** None

---

## 🎯 What It Does

Lottie Web renders Adobe After Effects animations exported as JSON files, providing high-quality vector animations with small file sizes. Perfect for complex animations that would be huge as GIFs or impractical with CSS.

**Best for:**
- Loading spinners and progress indicators
- Animated icons and UI micro-interactions
- Onboarding sequences and tutorials
- Hero animations and illustrations
- Success/error state animations

**Not suitable for:**
- Simple transitions (use CSS animations)
- Video playback (use HTML5 video)
- Heavy 3D animations (use Three.js)
- When you need IE11 support without polyfills

---

## 📦 Installation

### CDN (Recommended)

```html
<!-- Latest version -->
<script src="https://cdn.jsdelivr.net/npm/lottie-web@5.13.0/build/player/lottie.min.js"></script>

<!-- Light version (SVG only, smaller) -->
<script src="https://cdn.jsdelivr.net/npm/lottie-web@5.13.0/build/player/lottie_light.min.js"></script>
```

### npm

```bash
npm install lottie-web
```

```javascript
import lottie from 'lottie-web';
```

---

## ⚡ Quick Start

### Basic Usage

```html
<!-- Container for animation -->
<div id="lottie-container" style="width: 400px; height: 400px;"></div>

<script src="https://cdn.jsdelivr.net/npm/lottie-web@5.13.0/build/player/lottie.min.js"></script>
<script>
  const animation = lottie.loadAnimation({
    container: document.getElementById('lottie-container'),
    renderer: 'svg', // 'svg', 'canvas', or 'html'
    loop: true,
    autoplay: true,
    path: 'animation.json' // Path to your Lottie JSON file
  });
</script>
```

### Expected Output

Plays the After Effects animation smoothly in the div container. Animation scales automatically to container size while maintaining aspect ratio.

---

## 🔧 Common Patterns

### Pattern 1: Loading Spinner

```javascript
// Perfect for loading states
const spinner = lottie.loadAnimation({
  container: document.getElementById('loading-spinner'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'https://assets.website.com/loader.json'
});

// Stop when loading complete
fetch('/api/data')
  .then(response => response.json())
  .then(data => {
    spinner.destroy(); // Clean up
    document.getElementById('loading-spinner').style.display = 'none';
  });
```

**When to use:** Loading states, infinite loops, background animations

### Pattern 2: Playback Control

```javascript
const animation = lottie.loadAnimation({
  container: document.getElementById('controlled-animation'),
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: 'success-animation.json'
});

// Control methods
document.getElementById('play-btn').addEventListener('click', () => {
  animation.play();
});

document.getElementById('pause-btn').addEventListener('click', () => {
  animation.pause();
});

document.getElementById('stop-btn').addEventListener('click', () => {
  animation.stop(); // Resets to first frame
});

// Listen for completion
animation.addEventListener('complete', () => {
  console.log('Animation finished!');
});
```

**When to use:** User-controlled animations, success confirmations, interactive experiences

### Pattern 3: Responsive Animation

```javascript
const animation = lottie.loadAnimation({
  container: document.getElementById('responsive-animation'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'hero-animation.json'
});

// Resize handler
window.addEventListener('resize', () => {
  animation.resize();
});

// Destroy when element removed (React/Vue cleanup)
function cleanup() {
  animation.destroy();
}
```

**When to use:** Hero sections, full-width animations, responsive layouts

### Pattern 4: Inline JSON Data

```javascript
// Embed JSON directly (better for small animations)
const animationData = {
  "v": "5.9.0",
  "fr": 30,
  "ip": 0,
  "op": 60,
  "w": 500,
  "h": 500,
  "assets": [],
  "layers": [/* ... */]
};

const animation = lottie.loadAnimation({
  container: document.getElementById('inline-animation'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: animationData // Use animationData instead of path
});
```

**When to use:** Small animations, avoiding HTTP requests, bundled animations

### Pattern 5: Scroll-Triggered Animation

```javascript
const animation = lottie.loadAnimation({
  container: document.getElementById('scroll-animation'),
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: 'scroll-reveal.json'
});

// Sync with scroll position
window.addEventListener('scroll', () => {
  const element = document.getElementById('scroll-animation');
  const rect = element.getBoundingClientRect();
  const scrollPercent = Math.max(0, Math.min(1,
    (window.innerHeight - rect.top) / window.innerHeight
  ));

  // Set animation frame based on scroll
  const frame = scrollPercent * animation.totalFrames;
  animation.goToAndStop(frame, true);
});
```

**When to use:** Scroll-based storytelling, parallax effects, reveal animations

---

## 📱 Mobile Considerations

### Touch Support
- ✅ Performs well on modern mobile devices
- ✅ Hardware accelerated (especially SVG renderer)
- ⚠️ Canvas renderer can be slower on older devices

### Responsive Behavior

```javascript
// Optimize for mobile
const isMobile = window.innerWidth < 768;

const animation = lottie.loadAnimation({
  container: document.getElementById('mobile-animation'),
  renderer: isMobile ? 'canvas' : 'svg', // Canvas can be faster on mobile
  loop: true,
  autoplay: !isMobile, // Don't autoplay on mobile to save battery
  path: isMobile ? 'animation-simple.json' : 'animation-complex.json'
});

// Pause when page hidden (save battery)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    animation.pause();
  } else {
    animation.play();
  }
});
```

### iOS/Android Gotchas
- **File Size**: Keep JSON under 200kb for smooth mobile performance
- **FPS**: Limit to 30 FPS for mobile (60 FPS can drain battery)
- **Memory**: Destroy animations when not visible to prevent memory leaks
- **iOS Safari**: SVG renderer works best, canvas can have blur issues

---

## 🐛 Common Gotchas

### Issue 1: Animation Not Showing
**Problem:** Blank container or console errors about paths
**Solution:** Check JSON file path and ensure container has dimensions
```javascript
// ❌ Wrong - container has no dimensions
<div id="animation"></div>

// ✅ Correct - container must have width/height
<div id="animation" style="width: 300px; height: 300px;"></div>
```

### Issue 2: Memory Leaks
**Problem:** Animations keep running after component removed
**Solution:** Always call destroy() when removing animations
```javascript
// In React cleanup, Vue beforeDestroy, etc.
useEffect(() => {
  const animation = lottie.loadAnimation({/* ... */});

  return () => {
    animation.destroy(); // Critical for cleanup!
  };
}, []);
```

### Issue 3: CORS Issues with External JSON
**Problem:** "Failed to load" error when loading JSON from CDN
**Solution:** Ensure CORS headers are set or use inline animationData
```javascript
// Option 1: Fetch with CORS
fetch('https://assets.example.com/animation.json')
  .then(response => response.json())
  .then(animationData => {
    lottie.loadAnimation({
      container: document.getElementById('animation'),
      animationData: animationData
    });
  });

// Option 2: Use same-origin JSON files
lottie.loadAnimation({
  path: '/animations/local-file.json' // Same domain
});
```

### Issue 4: JSON Format from After Effects
**Problem:** After Effects export doesn't work
**Solution:** Use official Bodymovin plugin (v5.9.0+) and export with correct settings
- Install Bodymovin extension in After Effects
- Export as JSON (not .aep)
- Enable "Glyphs" if using custom fonts
- Test in LottieFiles preview before deploying

---

## 💡 Pro Tips

- **Use LottieFiles**: Browse 100k+ free animations at lottiefiles.com
- **Optimize JSON**: Use lottiefiles.com optimizer to reduce file size by 30-50%
- **Lazy load**: Only load Lottie library when animations are needed
- **Preload critical animations**: Fetch JSON files during initial page load
- **Use segments**: Play specific parts of an animation with `playSegments([start, end])`
- **Monitor performance**: Check frame rate with `animation.getDuration()` and adjust FPS

---

## 🔗 Resources

- [Official Documentation](https://airbnb.io/lottie/)
- [GitHub Repository](https://github.com/airbnb/lottie-web)
- [npm Package](https://www.npmjs.com/package/lottie-web)
- [LottieFiles Library](https://lottiefiles.com/) - Free animations
- [Bodymovin Plugin](https://aescripts.com/bodymovin/) - After Effects export
- [Interactive Editor](https://lottiefiles.com/editor) - Edit JSON animations

---

## 📊 Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 90+ | Full support (all renderers) |
| Firefox | 88+ | Full support |
| Safari | 14+ | SVG renderer recommended |
| Edge | 90+ | Full support |
| iOS Safari | 12+ | Hardware accelerated |
| Android Chrome | 90+ | Use canvas on older devices |

**Note:** IE11 requires polyfills for Promises and Object.assign

---

## 🆚 Alternatives

When to consider other libraries:
- **CSS Animations**: Better for simple transitions and transforms (0kb)
- **GSAP**: More control for JavaScript-driven animations (larger bundle)
- **GIF/WebP**: Simpler but much larger file sizes (10-50x bigger)
- **SVG + CSS**: Good for simple icon animations (no JS needed)
- **Rive**: Newer format with smaller files and runtime control (smaller JSON)

**Lottie vs GIF comparison:**
- Lottie JSON: 15-50kb for complex animation
- GIF equivalent: 500kb-2MB for same quality
- Lottie scales perfectly, GIF pixelates

---

## ⚠️ Breaking Changes

### v5.0.0 → v5.13.0
- No breaking changes, mostly bug fixes
- Improved TypeScript definitions
- Better React/Vue integration

### v4.x → v5.0.0
- Changed default renderer from canvas to svg
- Removed deprecated `animationData.assets` format
- Updated segment API: use `playSegments([[0, 50]])` instead of `playSegments(0, 50)`

---

**Last Updated:** 2024-12-19
**Verified Version:** 5.13.0
