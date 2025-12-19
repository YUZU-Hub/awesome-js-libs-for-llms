# Glide.js

> Lightweight, dependency-free JavaScript carousel

**Version:** 3.7.1
**Category:** ui-components
**Bundle Size:** 23 kb (minified) / 7 kb (gzipped)
**Dependencies:** None

---

## 🎯 What It Does

Glide.js is a lightweight, flexible carousel/slider library with zero dependencies. It focuses on simplicity and performance with a clean, modular API.

**Best for:**
- Image carousels and galleries
- Product sliders
- Testimonial carousels
- Content slideshows
- Responsive multi-item displays

**Not suitable for:**
- Complex animations (use GSAP)
- Virtual slides (use Swiper)
- Projects needing jQuery integration (use Slick)

---

## 📦 Installation

### CDN (Recommended)

```html
<!-- Core CSS (Required) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@glidejs/glide@3.7.1/dist/css/glide.core.min.css">

<!-- Theme CSS (Optional - for arrows/bullets styling) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@glidejs/glide@3.7.1/dist/css/glide.theme.min.css">

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/@glidejs/glide@3.7.1/dist/glide.min.js"></script>
```

### npm

```bash
npm install @glidejs/glide
```

```javascript
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';
```

---

## ⚡ Quick Start

### Basic Slider

```html
<div class="glide">
  <div class="glide__track" data-glide-el="track">
    <ul class="glide__slides">
      <li class="glide__slide">Slide 1</li>
      <li class="glide__slide">Slide 2</li>
      <li class="glide__slide">Slide 3</li>
    </ul>
  </div>
</div>

<script>
  new Glide('.glide').mount();
</script>
```

### Expected Output

A smooth sliding carousel. Users can drag/swipe to navigate between slides.

---

## 🔧 Common Patterns

### Pattern 1: Carousel with Navigation

```html
<div class="glide">
  <div class="glide__track" data-glide-el="track">
    <ul class="glide__slides">
      <li class="glide__slide">Slide 1</li>
      <li class="glide__slide">Slide 2</li>
      <li class="glide__slide">Slide 3</li>
    </ul>
  </div>

  <!-- Arrows -->
  <div class="glide__arrows" data-glide-el="controls">
    <button class="glide__arrow glide__arrow--left" data-glide-dir="<">Prev</button>
    <button class="glide__arrow glide__arrow--right" data-glide-dir=">">Next</button>
  </div>

  <!-- Bullets -->
  <div class="glide__bullets" data-glide-el="controls[nav]">
    <button class="glide__bullet" data-glide-dir="=0"></button>
    <button class="glide__bullet" data-glide-dir="=1"></button>
    <button class="glide__bullet" data-glide-dir="=2"></button>
  </div>
</div>

<script>
  new Glide('.glide', {
    type: 'carousel',
    autoplay: 3000
  }).mount();
</script>
```

**When to use:** Hero sliders, featured content, promotional banners

### Pattern 2: Multi-Item Slider

```javascript
new Glide('.glide', {
  type: 'carousel',
  perView: 4,           // Show 4 slides
  gap: 20,              // 20px gap between slides
  focusAt: 'center',    // Center active slide
  breakpoints: {
    1024: { perView: 3 },
    768: { perView: 2 },
    480: { perView: 1 }
  }
}).mount();
```

**When to use:** Product grids, team members, portfolio items

### Pattern 3: Autoplay with Pause

```javascript
new Glide('.glide', {
  type: 'carousel',
  autoplay: 4000,       // 4 seconds between slides
  hoverpause: true,     // Pause on hover
  animationDuration: 800,
  animationTimingFunc: 'ease-in-out'
}).mount();
```

**When to use:** Auto-rotating banners, testimonials, news tickers

### Pattern 4: Slider vs Carousel

```javascript
// Slider - stops at edges
new Glide('.glide', {
  type: 'slider',
  bound: true,          // Stop at first/last slide
  rewind: false         // No loop
}).mount();

// Carousel - infinite loop
new Glide('.glide', {
  type: 'carousel',     // Loops infinitely
  perView: 3
}).mount();
```

**When to use:** Slider for paginated content, carousel for continuous browsing

### Pattern 5: API Methods

```javascript
const glide = new Glide('.glide').mount();

// Navigation
glide.go('>');          // Next slide
glide.go('<');          // Previous slide
glide.go('=2');         // Go to slide index 2

// Control
glide.play();           // Start autoplay
glide.pause();          // Pause autoplay
glide.destroy();        // Destroy instance
glide.update({          // Update options
  perView: 2
});

// Events
glide.on('mount.after', () => console.log('Mounted'));
glide.on('run.before', () => console.log('Before slide'));
glide.on('run.after', () => console.log('After slide'));
```

**When to use:** Custom controls, analytics, external triggers

---

## 📱 Mobile Considerations

### Touch Support
- ✅ Native touch and swipe gestures
- ✅ Smooth momentum scrolling
- ✅ Configurable swipe threshold

### Responsive Behavior

```javascript
new Glide('.glide', {
  perView: 4,
  breakpoints: {
    1200: { perView: 3, gap: 15 },
    768: { perView: 2, gap: 10 },
    480: {
      perView: 1,
      gap: 5,
      peek: { before: 0, after: 50 }  // Peek next slide
    }
  }
}).mount();
```

### Touch Settings

```javascript
new Glide('.glide', {
  swipeThreshold: 80,    // Min distance to trigger swipe
  dragThreshold: 120,    // Min distance for mouse drag
  touchRatio: 0.5,       // Touch sensitivity (0 = disable)
  touchAngle: 45         // Max angle for horizontal swipe
}).mount();
```

---

## 🐛 Common Gotchas

### Issue 1: Forgetting to Call mount()

```javascript
// ❌ Wrong - slider won't work
new Glide('.glide', options);

// ✅ Correct - must call mount()
new Glide('.glide', options).mount();
```

### Issue 2: Wrong HTML Structure

```html
<!-- ❌ Wrong - missing required structure -->
<div class="glide">
  <div>Slide 1</div>
  <div>Slide 2</div>
</div>

<!-- ✅ Correct - required structure -->
<div class="glide">
  <div class="glide__track" data-glide-el="track">
    <ul class="glide__slides">
      <li class="glide__slide">Slide 1</li>
      <li class="glide__slide">Slide 2</li>
    </ul>
  </div>
</div>
```

### Issue 3: Missing Core CSS

```html
<!-- ❌ Wrong - no CSS loaded -->
<script src="glide.min.js"></script>

<!-- ✅ Correct - core CSS required -->
<link rel="stylesheet" href="glide.core.min.css">
<script src="glide.min.js"></script>
```

### Issue 4: Dynamic Content Issues

```javascript
// ❌ Wrong - slides added after mount
const glide = new Glide('.glide').mount();
// Adding slides now won't work correctly

// ✅ Correct - destroy and remount
glide.destroy();
// Add new slides to DOM
const newGlide = new Glide('.glide').mount();
```

### Issue 5: Multiple Sliders

```javascript
// ❌ Wrong - same selector, same instance
new Glide('.glide').mount();

// ✅ Correct - unique selectors or loop
document.querySelectorAll('.glide').forEach(el => {
  new Glide(el).mount();
});
```

---

## 💡 Pro Tips

- **Use `peek`** to show edges of adjacent slides: `peek: { before: 50, after: 50 }`
- **Use `focusAt: 'center'`** for centered carousels
- **Set `bound: true`** in slider mode to prevent empty space
- **Use `rewind: true`** to jump to first slide after last
- **Add `keyboard: true`** for arrow key navigation
- **Use `animationTimingFunc`** for custom easing

---

## 🔗 Resources

- [Official Documentation](https://glidejs.com/)
- [GitHub Repository](https://github.com/glidejs/glide)
- [npm Package](https://www.npmjs.com/package/@glidejs/glide)

---

## 📊 Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 60+ | Full support |
| Firefox | 55+ | Full support |
| Safari | 10+ | Full support |
| Edge | 79+ | Full support |
| iOS Safari | 10+ | Touch optimized |
| Android Chrome | 60+ | Touch optimized |

**Note:** IE11 requires polyfills for Promise and classList

---

## 🆚 Alternatives

When to consider other libraries:
- **Swiper**: More features (virtual slides, 3D effects, parallax), larger bundle
- **Slick**: jQuery-based, more options, but larger and unmaintained
- **Splide**: Similar size, more modern API, better accessibility
- **Flickity**: Better physics-based animations, touch-optimized

---

## ⚠️ Breaking Changes

### v3.6.x → v3.7.1
- Bug fixes only
- No breaking changes

### v3.0.0 → v3.6.0
- Module system changes for better tree-shaking
- Updated TypeScript definitions
- No major breaking changes

---

**Last Updated:** 2024-12-19
**Verified Version:** 3.7.1
