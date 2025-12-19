# AOS (Animate On Scroll)

> Animate elements on scroll with data attributes

**Version:** 2.3.4
**Category:** animation
**Bundle Size:** 13 kb (minified) / 4 kb (gzipped)
**Dependencies:** None

---

## 🎯 What It Does

AOS animates elements as they scroll into view using simple data attributes. No JavaScript configuration needed for basic use - just add `data-aos="fade-up"` to any element.

**Best for:**
- Fade-in content on scroll
- Landing page animations
- Reveal effects for cards and sections
- Staggered list animations
- Portfolio and marketing sites

**Not suitable for:**
- Complex timeline animations (use GSAP)
- Scroll-linked progress indicators
- Parallax effects
- Performance-critical mobile apps

---

## 📦 Installation

### CDN (Recommended)

```html
<!-- CSS (Required) -->
<link href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" rel="stylesheet">

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>

<!-- Initialize AOS -->
<script>
  AOS.init();
</script>
```

### npm

```bash
npm install aos
```

```javascript
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();
```

---

## ⚡ Quick Start

### Basic Usage

```html
<!-- Element fades up when scrolled into view -->
<div data-aos="fade-up">
  <h2>Hello World</h2>
</div>

<!-- Must initialize AOS -->
<script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>
<script>
  AOS.init();
</script>
```

### Expected Output

Element starts invisible, then fades in with upward motion as user scrolls it into view.

---

## 🔧 Common Patterns

### Pattern 1: Animation Types

```html
<!-- Fade animations -->
<div data-aos="fade-up">Fade up</div>
<div data-aos="fade-down">Fade down</div>
<div data-aos="fade-left">Fade from left</div>
<div data-aos="fade-right">Fade from right</div>

<!-- Flip animations -->
<div data-aos="flip-left">Flip left</div>
<div data-aos="flip-right">Flip right</div>
<div data-aos="flip-up">Flip up</div>

<!-- Zoom animations -->
<div data-aos="zoom-in">Zoom in</div>
<div data-aos="zoom-out">Zoom out</div>

<!-- Slide animations -->
<div data-aos="slide-up">Slide up</div>
<div data-aos="slide-down">Slide down</div>
```

**When to use:** Choose animation based on content type and layout direction

### Pattern 2: Duration and Delay

```html
<!-- Control animation speed -->
<div data-aos="fade-up" data-aos-duration="500">Fast (500ms)</div>
<div data-aos="fade-up" data-aos-duration="1000">Normal (1000ms)</div>
<div data-aos="fade-up" data-aos-duration="2000">Slow (2000ms)</div>

<!-- Add delay before animation starts -->
<div data-aos="fade-up" data-aos-delay="0">No delay</div>
<div data-aos="fade-up" data-aos-delay="200">200ms delay</div>
<div data-aos="fade-up" data-aos-delay="400">400ms delay</div>
```

**When to use:** Staggered reveals, sequential content, emphasis

### Pattern 3: Staggered List

```html
<div class="features">
  <div data-aos="fade-up" data-aos-delay="0">Feature 1</div>
  <div data-aos="fade-up" data-aos-delay="100">Feature 2</div>
  <div data-aos="fade-up" data-aos-delay="200">Feature 3</div>
  <div data-aos="fade-up" data-aos-delay="300">Feature 4</div>
</div>
```

**When to use:** Feature lists, card grids, timeline content

### Pattern 4: Global Configuration

```javascript
AOS.init({
  duration: 800,           // Animation duration (ms)
  delay: 0,               // Default delay
  once: true,             // Animate only once
  offset: 120,            // Trigger offset from viewport (px)
  easing: 'ease-in-out',  // Easing function
  disable: false,         // Disable on specific conditions
  mirror: false           // Animate when scrolling past element
});
```

**When to use:** Set consistent defaults across your site

### Pattern 5: Easing Functions

```html
<div data-aos="fade-up" data-aos-easing="linear">Linear</div>
<div data-aos="fade-up" data-aos-easing="ease">Ease (default)</div>
<div data-aos="fade-up" data-aos-easing="ease-in">Ease in</div>
<div data-aos="fade-up" data-aos-easing="ease-out">Ease out</div>
<div data-aos="fade-up" data-aos-easing="ease-in-out">Ease in-out</div>
<div data-aos="fade-up" data-aos-easing="ease-in-back">Ease in back</div>
```

**When to use:** Fine-tune animation feel and personality

---

## 📱 Mobile Considerations

### Touch Support
- ✅ Works automatically with touch scrolling
- ✅ No special configuration needed
- ⚠️ Consider disabling for performance on mobile

### Disable on Mobile

```javascript
// Disable on mobile devices
AOS.init({
  disable: 'mobile'
});

// Or disable below specific width
AOS.init({
  disable: function() {
    return window.innerWidth < 768;
  }
});

// Or disable for reduced motion preference
AOS.init({
  disable: function() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
});
```

### Mobile Performance Tips

```javascript
AOS.init({
  once: true,         // Animate only once (saves battery)
  duration: 400,      // Faster animations
  offset: 50,         // Smaller trigger offset
  disable: 'phone'    // Disable on phones, keep on tablets
});
```

---

## 🐛 Common Gotchas

### Issue 1: Forgetting to Initialize

```html
<!-- ❌ Wrong - AOS.init() not called -->
<div data-aos="fade-up">Won't animate</div>
<script src="aos.js"></script>

<!-- ✅ Correct - must call AOS.init() -->
<div data-aos="fade-up">Will animate</div>
<script src="aos.js"></script>
<script>AOS.init();</script>
```

### Issue 2: Missing CSS File

```html
<!-- ❌ Wrong - missing CSS -->
<script src="aos.js"></script>

<!-- ✅ Correct - both CSS and JS required -->
<link rel="stylesheet" href="aos.css">
<script src="aos.js"></script>
```

### Issue 3: Dynamic Content Not Animating

```javascript
// ❌ Wrong - new elements don't animate
container.innerHTML += '<div data-aos="fade-up">New content</div>';

// ✅ Correct - refresh AOS after adding content
container.innerHTML += '<div data-aos="fade-up">New content</div>';
AOS.refresh(); // Recalculate positions
```

### Issue 4: x-if in Template Tag Required

```html
<!-- ❌ Wrong - using x-if on regular div -->
<!-- (Note: This is for Alpine.js integration) -->

<!-- AOS works fine on any element -->
<div data-aos="fade-up">Content</div>
```

### Issue 5: Flash of Unstyled Content

```css
/* Hide elements until AOS initializes */
[data-aos] {
  pointer-events: none;
}

[data-aos].aos-animate {
  pointer-events: auto;
}
```

---

## 💡 Pro Tips

- **Use `once: true`** for better performance (animate only first time)
- **Don't animate hero content** - it should be immediately visible
- **Limit animations** - don't animate everything, focus on key elements
- **Keep durations short** - 400-800ms feels snappy
- **Use `offset`** to control trigger point (default 120px)
- **Call `AOS.refresh()`** after layout changes or dynamic content
- **Respect reduced motion** - disable for accessibility

---

## 🔗 Resources

- [Official Documentation](https://michalsnik.github.io/aos/)
- [GitHub Repository](https://github.com/michalsnik/aos)
- [npm Package](https://www.npmjs.com/package/aos)

---

## 📊 Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 60+ | Full support |
| Firefox | 55+ | Full support |
| Safari | 10+ | Full support |
| Edge | 79+ | Full support |
| iOS Safari | 10+ | Full support |
| Android Chrome | 60+ | Full support |

**Note:** IE11 not supported (requires CSS3 transitions and MutationObserver)

---

## 🆚 Alternatives

When to consider other libraries:
- **ScrollReveal**: JavaScript-based configuration instead of data attributes
- **GSAP ScrollTrigger**: Complex timeline animations, scroll-linked effects
- **Intersection Observer**: Native API, zero dependencies, custom animations
- **CSS scroll-driven animations**: Native CSS, modern browsers only

---

## ⚠️ Breaking Changes

### v2.x → v3.0.0
- `data-aos-*` attributes renamed (check documentation)
- Some easing functions renamed
- Configuration options changed

### v1.x → v2.x
- Major rewrite
- New animation names
- Changed initialization options

---

**Last Updated:** 2024-12-19
**Verified Version:** 3.0.0
