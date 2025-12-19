# GSAP

> Professional-grade JavaScript animation library

**Version:** 3.14.2
**Category:** animation
**Bundle Size:** 52 kb (minified) / 16.3 kb (gzipped)
**Dependencies:** None

---

## 🎯 What It Does

GSAP (GreenSock Animation Platform) is the industry-standard JavaScript animation library used by over 11 million sites. It animates CSS properties, SVG, canvas, and any JavaScript object with high-performance, smooth animations that work across all browsers.

**Best for:**
- Complex animation sequences and timelines
- Scroll-triggered animations (with ScrollTrigger plugin)
- SVG morphing and path animations
- High-performance UI transitions
- Cross-browser animation consistency

**Not suitable for:**
- Simple CSS transitions (use native CSS)
- Basic fade-in effects (consider AOS or CSS)
- Physics-based animations (use Matter.js)

---

## 📦 Installation

### CDN (Recommended)

```html
<!-- Core GSAP -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>

<!-- With ScrollTrigger plugin (most common) -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
```

### npm

```bash
npm install gsap
```

```javascript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
```

---

## ⚡ Quick Start

### Basic Animation (gsap.to)

```javascript
// Animate element to new properties
gsap.to(".box", {
  x: 200,           // Move 200px right
  rotation: 360,    // Rotate 360 degrees
  duration: 2,      // 2 seconds
  ease: "bounce"    // Bounce easing
});
```

```html
<div class="box" style="width: 100px; height: 100px; background: blue;"></div>
```

### Expected Output

The blue box smoothly moves 200px to the right while rotating 360 degrees over 2 seconds with a bouncy finish.

---

## 🔧 Common Patterns

### Pattern 1: Fade In on Load

```javascript
// Elements start invisible
gsap.from(".hero", {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power2.out"
});
```

**When to use:** Page load animations, revealing content

### Pattern 2: Sequential Timeline

```javascript
// Create a timeline for multiple animations
const tl = gsap.timeline();

tl.to(".box1", { x: 100, duration: 1 })
  .to(".box2", { x: 100, duration: 1 })      // After box1
  .to(".box3", { x: 100, duration: 1 }, "-=0.5"); // 0.5s overlap

// Control timeline
tl.play();
tl.pause();
tl.reverse();
```

**When to use:** Staggered animations, intro sequences, multi-step effects

### Pattern 3: Scroll-Triggered Animation

```javascript
// Register plugin first
gsap.registerPlugin(ScrollTrigger);

gsap.to(".fade-in", {
  opacity: 1,
  y: 0,
  scrollTrigger: {
    trigger: ".fade-in",
    start: "top 80%",     // When element top hits 80% of viewport
    end: "top 20%",
    scrub: 1,             // Smooth scrubbing (1 second lag)
    markers: true         // Show debug markers (remove in production)
  }
});
```

**When to use:** Parallax effects, reveal on scroll, sticky animations

### Pattern 4: Stagger Multiple Elements

```javascript
// Animate multiple elements with delay between each
gsap.from(".card", {
  opacity: 0,
  y: 50,
  duration: 0.8,
  stagger: 0.2,          // 0.2s delay between each card
  ease: "power2.out"
});
```

**When to use:** List animations, grid reveals, sequential loading

### Pattern 5: Infinite Loop

```javascript
// Continuous rotation
gsap.to(".spinner", {
  rotation: 360,
  duration: 2,
  repeat: -1,            // -1 = infinite
  ease: "linear"         // Constant speed
});
```

**When to use:** Loading spinners, ambient animations, rotating logos

---

## 📱 Mobile Considerations

### Touch Support
- ✅ Works perfectly on mobile browsers
- ✅ Hardware-accelerated transforms (use x, y instead of left, top)
- ✅ Automatic will-change optimization

### Performance Best Practices

```javascript
// Good: Use transforms (GPU-accelerated)
gsap.to(".box", { x: 100, y: 100, rotation: 45 });

// Bad: Use top/left (triggers layout)
gsap.to(".box", { left: "100px", top: "100px" });

// Use will-change for better mobile performance
gsap.set(".animated", { willChange: "transform" });
gsap.to(".animated", { x: 200, duration: 1 });
gsap.set(".animated", { willChange: "auto" }); // Clean up after
```

### Responsive Animations

```javascript
// Adjust animations for mobile
ScrollTrigger.matchMedia({
  "(min-width: 800px)": function() {
    // Desktop animations
    gsap.to(".hero", { x: 200 });
  },
  "(max-width: 799px)": function() {
    // Mobile animations (smaller movement)
    gsap.to(".hero", { x: 50 });
  }
});
```

### iOS/Android Gotchas
- **ScrollTrigger on iOS**: Use `normalizeScroll: true` for smooth scrolling on iOS
- **Reduced motion**: Respect user preferences with `prefers-reduced-motion`
- **Battery saving**: Use `paused: true` and play on interaction for background animations

---

## 🐛 Common Gotchas

### Issue 1: gsap.to vs gsap.from vs gsap.fromTo
**Problem:** Confusion about which method to use
**Solution:**
```javascript
// to() - Animate FROM current state TO specified values
gsap.to(".box", { x: 100 }); // Moves from wherever it is to x: 100

// from() - Set starting values, animate TO current state
gsap.from(".box", { x: 100 }); // Starts at x: 100, moves to x: 0

// fromTo() - Explicit start and end values
gsap.fromTo(".box",
  { x: 0, opacity: 0 },        // From these values
  { x: 100, opacity: 1 }       // To these values
);
```

### Issue 2: Transforms Not Working
**Problem:** Using CSS properties instead of GSAP shorthand
**Solution:** Use GSAP's transform shortcuts
```javascript
// ❌ Wrong
gsap.to(".box", { transform: "translateX(100px)" });

// ✅ Correct
gsap.to(".box", { x: 100, y: 50, rotation: 45, scale: 1.5 });
```

### Issue 3: Timeline Sequencing
**Problem:** All animations start at once
**Solution:** Understand position parameter
```javascript
const tl = gsap.timeline();

tl.to(".a", { x: 100, duration: 1 })
  .to(".b", { x: 100, duration: 1 })           // Starts after .a
  .to(".c", { x: 100, duration: 1 }, "<")      // Starts with previous
  .to(".d", { x: 100, duration: 1 }, "-=0.5")  // Starts 0.5s before previous ends
  .to(".e", { x: 100, duration: 1 }, "+=0.5"); // Starts 0.5s after previous ends
```

### Issue 4: ScrollTrigger Not Updating
**Problem:** Animations break after dynamic content loads
**Solution:** Refresh ScrollTrigger
```javascript
// After loading dynamic content
ScrollTrigger.refresh();

// Or use refresh on window resize
window.addEventListener("resize", () => ScrollTrigger.refresh());
```

---

## 💡 Pro Tips

- **Use gsap.set()** for instant property changes without animation
- **Kill animations** with `gsap.killTweensOf(".element")` before starting new ones to prevent conflicts
- **Use invalidate()** to restart animations with new values: `tl.invalidate().restart()`
- **Debug with markers**: Add `markers: true` to ScrollTrigger during development
- **Batch animations** for better performance: Use `gsap.utils.toArray()` with stagger
- **Use quickTo()** for responsive, high-frequency animations like cursor followers
- **Combine with CSS**: Let CSS handle static styles, GSAP handles transitions
- **Free plugins**: ScrollTrigger, Draggable, EasePack are free; others require paid license

---

## 🔗 Resources

- [Official Documentation](https://gsap.com/docs/v3/)
- [GitHub Repository](https://github.com/greensock/GSAP)
- [npm Package](https://www.npmjs.com/package/gsap)
- [CodePen Examples](https://codepen.io/GreenSock)
- [Cheat Sheet](https://gsap.com/cheatsheet/)
- [ScrollTrigger Demos](https://gsap.com/docs/v3/Plugins/ScrollTrigger)

---

## 📊 Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 90+ | Full support |
| Firefox | 88+ | Full support |
| Safari | 14+ | Full support |
| Edge | 90+ | Full support |
| iOS Safari | 14+ | Full support, use normalizeScroll |
| Android Chrome | 90+ | Full support |

**Note:** Works in all browsers that support ES5 (IE9+)

---

## 🆚 Alternatives

When to consider other libraries:
- **Anime.js**: Lighter (9kb), simpler API, but less powerful timeline controls
- **CSS Animations**: Native, no JS needed, but limited sequencing and no scroll triggers
- **Framer Motion**: Better for React components with declarative syntax
- **Motion One**: Modern, lightweight (5kb), but newer with smaller community
- **Web Animations API**: Native browser API, but limited browser support and features

GSAP is the go-to choice when you need reliable, complex animations with cross-browser consistency.

---

## ⚠️ Breaking Changes

### v3.0.0 → v3.12.5
- No major breaking changes in 3.x series
- ScrollTrigger improvements and new features
- Better TypeScript support added
- Performance optimizations for mobile

### v2.x → v3.0.0
- TweenLite/TweenMax merged into single `gsap` object
- `CSSPlugin` auto-loaded (no manual registration needed)
- `TimelineLite/TimelineMax` merged into `gsap.timeline()`
- New plugin registration: `gsap.registerPlugin(ScrollTrigger)`
- Changed: `onComplete: myFunc` still works, but context changed

Migration example:
```javascript
// v2 (old)
TweenMax.to(".box", 1, { x: 100 });

// v3 (new)
gsap.to(".box", { x: 100, duration: 1 });
```

---

**Last Updated:** 2024-12-19
**Verified Version:** 3.12.5
