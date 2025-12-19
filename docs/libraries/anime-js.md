# Anime.js

> Lightweight JavaScript animation library for CSS properties, SVG, DOM attributes, and JavaScript Objects

**Version:** 3.2.2
**Category:** animation
**Bundle Size:** 17.6 kb (minified) / 6.5 kb (gzipped)
**Dependencies:** None

---

## 🎯 What It Does

Anime.js is a lightweight JavaScript animation library with a simple, yet powerful API. It works with CSS properties, SVG, DOM attributes and JavaScript Objects, providing an easy way to create smooth, performant animations with minimal code.

**Best for:**
- CSS property animations (opacity, transform, color)
- SVG animations (path morphing, line drawing)
- DOM attribute animations
- Timeline-based sequences
- Staggered animations for multiple elements

**Not suitable for:**
- Complex 3D transforms (use Three.js)
- Physics-based animations (use GSAP with plugins)
- Video or audio timeline synchronization (use GSAP)

---

## 📦 Installation

### CDN (Recommended)

```html
<script src="https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.min.js"></script>
```

### npm

```bash
npm install animejs
```

---

## ⚡ Quick Start

### Basic Animation

```javascript
// Animate a single element
anime({
  targets: '.box',
  translateX: 250,
  rotate: '1turn',
  duration: 2000,
  easing: 'easeInOutQuad'
});
```

```html
<!-- Required HTML -->
<div class="box" style="width: 50px; height: 50px; background: #FF0066;"></div>
```

### Expected Output

The box element will smoothly move 250px to the right while rotating 360 degrees over 2 seconds with an ease-in-out timing.

---

## 🔧 Common Patterns

### Pattern 1: Multiple Properties

```javascript
anime({
  targets: '.element',
  translateX: [0, 300],     // From 0 to 300
  translateY: [0, -100],    // From 0 to -100
  scale: [1, 1.5],          // Scale up
  opacity: [1, 0.5],        // Fade out
  duration: 1500,
  easing: 'easeInOutQuad'
});
```

**When to use:** Animating multiple properties simultaneously on one or more elements

### Pattern 2: Staggered Animations

```javascript
anime({
  targets: '.item',
  translateX: 250,
  opacity: [0, 1],
  delay: anime.stagger(100), // Delay increases by 100ms for each element
  duration: 1000,
  easing: 'easeOutElastic(1, .8)'
});
```

**When to use:** Animating lists, grids, or multiple elements with sequential timing

### Pattern 3: Timeline Sequences

```javascript
const timeline = anime.timeline({
  easing: 'easeOutExpo',
  duration: 750
});

timeline
  .add({
    targets: '.header',
    translateY: [-50, 0],
    opacity: [0, 1]
  })
  .add({
    targets: '.button',
    scale: [0, 1],
    opacity: [0, 1]
  }, '-=500'); // Start 500ms before previous animation ends
```

**When to use:** Creating complex animation sequences with precise timing control

### Pattern 4: SVG Path Animation

```javascript
anime({
  targets: 'path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 1500,
  loop: false
});
```

**When to use:** Line drawing effects, SVG path morphing, logo animations

### Pattern 5: Callbacks and Control

```javascript
const animation = anime({
  targets: '.element',
  translateX: 250,
  duration: 2000,
  autoplay: false,
  begin: function(anim) {
    console.log('Animation started');
  },
  update: function(anim) {
    console.log('Progress: ' + Math.round(anim.progress) + '%');
  },
  complete: function(anim) {
    console.log('Animation completed');
  }
});

// Manual control
animation.play();
animation.pause();
animation.restart();
animation.reverse();
animation.seek(1000); // Jump to 1000ms
```

**When to use:** Interactive animations, user-controlled playback, progress tracking

---

## 📱 Mobile Considerations

### Touch Support
- ✅ Works perfectly on mobile browsers
- ✅ Hardware-accelerated transforms for smooth 60fps
- ⚠️ Requires touch event handling for interactive animations

### Responsive Behavior

```javascript
// Adjust animation based on screen size
const isMobile = window.innerWidth < 768;

anime({
  targets: '.hero',
  translateX: isMobile ? 100 : 250,
  duration: isMobile ? 1000 : 1500,
  easing: 'easeOutQuad'
});
```

### iOS/Android Gotchas
- **Performance**: Always use `translateX/Y` instead of `left/top` for better performance
- **Autoplay**: iOS Safari may block animations that trigger on page load without user interaction
- **Memory**: Pause or remove animations when elements are off-screen on mobile devices

---

## 🐛 Common Gotchas

### Issue 1: Targets Selector Not Found
**Problem:** Animation doesn't run if elements don't exist when anime() is called
**Solution:** Ensure DOM elements exist before calling anime()
```javascript
// ❌ Wrong - may run before DOM is ready
anime({ targets: '.box', translateX: 250 });

// ✅ Correct - wait for DOM
document.addEventListener('DOMContentLoaded', function() {
  anime({ targets: '.box', translateX: 250 });
});
```

### Issue 2: Transform Origin Issues
**Problem:** Rotations or scales happen around unexpected pivot points
**Solution:** Set transform-origin in CSS first
```css
.element {
  transform-origin: center center; /* Default */
  transform-origin: top left;      /* Custom origin */
}
```

### Issue 3: Property Value Format
**Problem:** Anime.js requires specific units for certain properties
**Solution:** Always include units explicitly
```javascript
// ❌ Wrong - no unit
anime({ targets: '.box', width: 200 });

// ✅ Correct - with unit
anime({ targets: '.box', width: '200px' });

// ✅ Also correct - relative values
anime({ targets: '.box', width: '+=50px' }); // Increase by 50px
```

### Issue 4: Easing Functions
**Problem:** Custom easing string format can be confusing
**Solution:** Use built-in easings or check syntax carefully
```javascript
// ✅ Built-in easings (recommended)
easing: 'easeInOutQuad'
easing: 'easeOutElastic(1, .8)'
easing: 'spring(1, 80, 10, 0)'

// ✅ Cubic bezier
easing: 'cubicBezier(.5, .05, .1, .3)'

// ❌ Wrong format
easing: 'ease-in-out' // This won't work
```

---

## 💡 Pro Tips

- **Use `translateX/Y/Z`** instead of `left/top/position` for hardware acceleration
- **Batch animations** by targeting multiple elements at once for better performance
- **Stagger delays** can create elegant sequential effects with minimal code
- **Timeline offset** (`-=` or `+=`) creates overlapping animations easily
- **Direction property** allows animations to play forwards, reverse, or alternate
- **Loop property** supports infinite loops or specific iteration counts
- **Set autoplay: false** for animations you want to trigger manually
- **Use `anime.remove()`** to free up memory when animations are no longer needed

---

## 🔗 Resources

- [Official Documentation](https://animejs.com/documentation/)
- [GitHub Repository](https://github.com/juliangarnier/anime)
- [npm Package](https://www.npmjs.com/package/animejs)
- [CodePen Examples](https://codepen.io/collection/XLebem/)

---

## 📊 Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 49+ | Full support |
| Firefox | 45+ | Full support |
| Safari | 10+ | Full support |
| Edge | 14+ | Full support |
| iOS Safari | 10+ | Full support, hardware accelerated |
| Android Chrome | 49+ | Full support |

**Note:** Uses ES6 features. For older browsers, use a transpiler like Babel.

---

## 🆚 Alternatives

When to consider other libraries:
- **GSAP**: More features, better for complex timelines, but larger (35kb) and requires license for commercial use
- **CSS Animations**: Lighter weight, but limited control and no JavaScript object animation
- **Velocity.js**: Similar performance, but project is no longer actively maintained
- **Framer Motion**: Better for React projects with component-level animations
- **Web Animations API**: Native browser API, but requires polyfills for older browsers

---

## ⚠️ Breaking Changes

### v3.0.0 → v3.2.2
- No breaking changes
- Performance improvements and bug fixes
- Added `anime.set()` utility function
- Enhanced SVG transform support

### v2.x → v3.0.0
- Removed timeline callback parameters (use animation callbacks instead)
- Changed `elasticity` parameter to elastic easing function format
- Updated timeline offset syntax to use `+=` and `-=`
- Dropped support for IE9 and IE10

---

**Last Updated:** 2025-12-19
**Verified Version:** 3.2.2
