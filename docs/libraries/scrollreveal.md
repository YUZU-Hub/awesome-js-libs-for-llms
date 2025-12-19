# ScrollReveal

> Easy scroll animations for web elements

**Version:** 4.0.9
**Category:** scrolling
**Bundle Size:** 11 kb (minified) / 4 kb (gzipped)
**Dependencies:** None

---

## 🎯 What It Does

ScrollReveal is a JavaScript library that animates elements as they scroll into view. It uses the Intersection Observer API to detect when elements enter the viewport and applies smooth reveal animations with minimal setup.

**Best for:**
- Fade-in animations as user scrolls
- Staggered reveals for cards/galleries
- Landing page element animations
- Simple directional reveals (slide from bottom, left, right, top)

**Not suitable for:**
- Complex timeline animations (use GSAP ScrollTrigger)
- Parallax scrolling effects
- Scroll-linked progress indicators

---

## 📦 Installation

### CDN (Recommended)

```html
<script src="https://cdn.jsdelivr.net/npm/scrollreveal@4.0.9/dist/scrollreveal.min.js"></script>
```

### npm

```bash
npm install scrollreveal
```

---

## ⚡ Quick Start

### Basic Usage

```javascript
// Initialize and reveal elements
ScrollReveal().reveal('.reveal');
```

```html
<div class="reveal">
  <h2>This will fade in on scroll</h2>
</div>

<div class="reveal">
  <p>So will this paragraph</p>
</div>

<script src="https://cdn.jsdelivr.net/npm/scrollreveal@4.0.9/dist/scrollreveal.min.js"></script>
<script>
  ScrollReveal().reveal('.reveal');
</script>
```

### Expected Output

Elements with class `reveal` will fade in (opacity 0 to 1) with a subtle upward motion as they enter the viewport.

---

## 🔧 Common Patterns

### Pattern 1: Reveal from Different Directions

```javascript
// Reveal from bottom (most common)
ScrollReveal().reveal('.from-bottom', {
  origin: 'bottom',
  distance: '50px',
  duration: 1000
});

// Reveal from left
ScrollReveal().reveal('.from-left', {
  origin: 'left',
  distance: '50px',
  duration: 1000
});

// Reveal from right
ScrollReveal().reveal('.from-right', {
  origin: 'right',
  distance: '50px',
  duration: 1000
});
```

**When to use:** Landing pages, hero sections, feature showcases

### Pattern 2: Staggered Animation

```javascript
// Animate multiple items with delay between each
ScrollReveal().reveal('.card', {
  interval: 200, // 200ms delay between each element
  distance: '50px',
  origin: 'bottom',
  duration: 800
});
```

```html
<div class="card">Card 1</div>
<div class="card">Card 2</div>
<div class="card">Card 3</div>
<!-- Each card reveals 200ms after the previous one -->
```

**When to use:** Product grids, testimonial cards, feature lists

### Pattern 3: Configuration Options

```javascript
ScrollReveal().reveal('.custom', {
  // Animation duration in milliseconds
  duration: 1000,

  // Delay before animation starts
  delay: 200,

  // Distance element moves
  distance: '50px',

  // Origin of animation
  origin: 'bottom', // 'top', 'left', 'right', 'bottom'

  // Starting opacity (0 = invisible)
  opacity: 0,

  // Easing function
  easing: 'ease', // or 'cubic-bezier(0.5, 0, 0, 1)'

  // Animation scale
  scale: 1, // 0.9 = starts 90% size

  // Enable on mobile
  mobile: true,

  // Reset animation on scroll out
  reset: false,

  // Percentage of element visible before trigger
  viewFactor: 0.2 // 0.2 = 20% visible
});
```

**When to use:** Fine-tuning animation behavior for specific elements

### Pattern 4: Sequence Animation

```javascript
// Reveal hero elements in sequence
ScrollReveal().reveal('.hero-title', {
  delay: 0,
  origin: 'top'
});

ScrollReveal().reveal('.hero-subtitle', {
  delay: 200,
  origin: 'left'
});

ScrollReveal().reveal('.hero-button', {
  delay: 400,
  origin: 'bottom'
});
```

**When to use:** Hero sections, splash screens, introductory content

---

## 📱 Mobile Considerations

### Touch Support
- ✅ Works perfectly on mobile browsers
- ✅ Native scroll detection (no touch event conflicts)
- ✅ Hardware-accelerated animations

### Responsive Behavior

```javascript
// Enable mobile animations (default)
ScrollReveal().reveal('.element', {
  mobile: true // Animations trigger on mobile
});

// Disable on mobile for performance
ScrollReveal().reveal('.heavy-animation', {
  mobile: false // No animation on mobile devices
});
```

### Mobile Performance Tips

```javascript
// Optimized for mobile
ScrollReveal().reveal('.mobile-friendly', {
  duration: 600,    // Shorter duration
  distance: '20px', // Less movement
  scale: 1,         // Avoid scale transforms
  mobile: true
});
```

### iOS/Android Gotchas
- **Smooth scrolling:** Works with `-webkit-overflow-scrolling: touch`
- **Viewport height:** Mobile browser chrome affects viewport calculations
- **Performance:** Test on actual devices, not just emulators
- **Battery drain:** Excessive animations can drain battery on mobile

---

## 🐛 Common Gotchas

### Issue 1: Forgetting to Call reveal()
**Problem:** ScrollReveal loaded but nothing animates
**Solution:** Must call reveal() method after initialization

```javascript
// ❌ Wrong - creates instance but doesn't reveal
const sr = ScrollReveal();

// ✅ Correct - must call reveal()
ScrollReveal().reveal('.element');

// ✅ Also correct - reuse instance
const sr = ScrollReveal();
sr.reveal('.element');
```

### Issue 2: Elements Already in Viewport
**Problem:** Elements visible on page load don't animate nicely
**Solution:** This is expected - they animate immediately on load

```javascript
// Control when elements become visible
ScrollReveal().reveal('.element', {
  viewFactor: 0.5, // Must be 50% visible to trigger
  delay: 300       // Add delay for on-load elements
});
```

### Issue 3: Dynamically Added Elements
**Problem:** Elements added via JavaScript don't animate
**Solution:** Call reveal() after adding to DOM

```javascript
// Add new content
const newElement = document.createElement('div');
newElement.className = 'reveal';
document.body.appendChild(newElement);

// Must reveal after DOM insertion
ScrollReveal().reveal('.reveal');
```

### Issue 4: Scrollable Container
**Problem:** Animations don't trigger inside scrollable div
**Solution:** Specify container option

```javascript
// For elements inside a scrollable container
ScrollReveal({
  container: document.getElementById('scrollable-div')
}).reveal('.inside-container');
```

```html
<div id="scrollable-div" style="height: 400px; overflow-y: scroll;">
  <div class="inside-container">Reveals on container scroll</div>
</div>
```

### Issue 5: Animation Only Happens Once
**Problem:** Want animation to repeat on scroll up/down
**Solution:** Use reset option

```javascript
ScrollReveal().reveal('.element', {
  reset: true // Animates every time element enters viewport
});
```

---

## 💡 Pro Tips

- **Reuse instance:** Create one ScrollReveal instance and call reveal() multiple times
- **Use viewFactor:** Adjust trigger point with `viewFactor: 0.2` (20% visible)
- **Combine with CSS:** Add `visibility: hidden` to prevent flash before JS loads
- **Stagger smartly:** Use `interval` instead of manual delays for lists
- **Test performance:** Use `mobile: false` on low-end devices if needed
- **Avoid too many animations:** Too many simultaneous reveals can cause jank

---

## 🔗 Resources

- [Official Documentation](https://scrollrevealjs.org/)
- [GitHub Repository](https://github.com/jlmakes/scrollreveal)
- [npm Package](https://www.npmjs.com/package/scrollreveal)
- [API Reference](https://scrollrevealjs.org/api/reveal.html)

---

## 📊 Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 60+ | Full support |
| Firefox | 55+ | Full support |
| Safari | 11+ | Full support |
| Edge | 79+ | Full support |
| iOS Safari | 11+ | Full support |
| Android Chrome | 60+ | Full support |

**Note:** Requires Intersection Observer API. For older browsers, include polyfill:

```html
<script src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"></script>
<script src="https://cdn.jsdelivr.net/npm/scrollreveal@4.0.9/dist/scrollreveal.min.js"></script>
```

---

## 🆚 Alternatives

When to consider other libraries:

- **AOS (Animate On Scroll)**: Better if you prefer HTML data-attributes over JavaScript configuration. Similar size, simpler setup for basic use cases.
- **GSAP ScrollTrigger**: Better if you need complex timeline animations, scroll-linked effects, or fine-grained control. More powerful but larger bundle (20kb).
- **Intersection Observer (Native)**: Better if you want minimal bundle size and custom animation logic. Requires more code but 0kb dependency.

---

## ⚠️ Breaking Changes

### v4.0.0 → v4.0.9
- No breaking changes
- Bug fixes and performance improvements
- Maintenance updates only

### v3.x → v4.0.0
- Removed jQuery dependency (now vanilla JS)
- Changed initialization syntax
- Removed `sync()` method (use `reveal()` instead)
- Updated to use Intersection Observer API

**Migration from v3:**
```javascript
// v3.x
window.sr = ScrollReveal();
sr.reveal('.element');

// v4.x (same, but no global required)
ScrollReveal().reveal('.element');
```

---

**Last Updated:** 2025-12-19
**Verified Version:** 4.0.9
