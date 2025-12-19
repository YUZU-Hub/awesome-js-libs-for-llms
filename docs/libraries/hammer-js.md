# Hammer.js

> Touch gesture recognition library for mobile and desktop

**Version:** 2.0.8
**Category:** mobile-touch
**Bundle Size:** 23.5 kb (minified) / 7.3 kb (gzipped)
**Dependencies:** None

---

## 🎯 What It Does

Hammer.js is a lightweight JavaScript library that recognizes touch, mouse, and pointer gestures. It handles tap, double-tap, press, pan, swipe, pinch, and rotate gestures with a unified API that works across all devices and browsers.

**Best for:**
- Touch-enabled web applications (drawing, maps, galleries)
- Mobile-first interfaces requiring gesture recognition
- Image viewers with pinch-zoom and pan
- Swipeable card interfaces and carousels
- Custom touch interactions beyond click/tap

**Not suitable for:**
- Simple click handlers (use native events)
- Basic scroll interactions (use CSS overflow)
- When you only need swipe (consider Swiper.js)
- Very small bundle size requirements (consider native touch events)

---

## 📦 Installation

### CDN (Recommended)

```html
<script src="https://cdn.jsdelivr.net/npm/hammerjs@2.0.8/hammer.min.js"></script>
```

### npm

```bash
npm install hammerjs
```

---

## ⚡ Quick Start

### Basic Tap Recognition

```html
<div id="target" style="width: 200px; height: 200px; background: #4CAF50;">
  Tap me!
</div>

<script>
  const element = document.getElementById('target');
  const hammer = new Hammer(element);

  hammer.on('tap', function(event) {
    console.log('Tapped!');
    element.style.background = '#FF5722';
  });
</script>
```

### Expected Output
The div changes color when tapped/clicked. Works with both touch and mouse events automatically.

---

## 🔧 Common Patterns

### Pattern 1: Swipe Detection (Most Common)

```javascript
const element = document.getElementById('swipeable');
const hammer = new Hammer(element);

// Enable swipe recognition
hammer.on('swipeleft', function() {
  console.log('Swiped left - show next');
});

hammer.on('swiperight', function() {
  console.log('Swiped right - show previous');
});

// Optional: configure swipe threshold
hammer.get('swipe').set({
  direction: Hammer.DIRECTION_HORIZONTAL, // Only horizontal swipes
  velocity: 0.3,     // Minimum velocity
  threshold: 10      // Minimum distance in pixels
});
```

**When to use:** Image galleries, card stacks, carousel navigation

### Pattern 2: Pinch Zoom

```javascript
const image = document.getElementById('zoomable-image');
const hammer = new Hammer(image);

// Enable pinch recognizer
hammer.get('pinch').set({ enable: true });

let currentScale = 1;

hammer.on('pinch', function(event) {
  // Scale relative to initial size
  const scale = currentScale * event.scale;
  image.style.transform = `scale(${scale})`;
});

hammer.on('pinchend', function(event) {
  currentScale = currentScale * event.scale;
});
```

**When to use:** Image viewers, maps, zoomable content

### Pattern 3: Pan/Drag

```javascript
const element = document.getElementById('draggable');
const hammer = new Hammer(element);

let posX = 0, posY = 0;

hammer.on('pan', function(event) {
  // Update position during drag
  element.style.transform = `translate(${posX + event.deltaX}px, ${posY + event.deltaY}px)`;
});

hammer.on('panend', function(event) {
  // Save final position
  posX += event.deltaX;
  posY += event.deltaY;
});
```

**When to use:** Draggable elements, sortable lists, custom sliders

### Pattern 4: Multiple Gestures

```javascript
const element = document.getElementById('interactive');
const hammer = new Hammer(element);

// Enable multiple recognizers
hammer.get('pinch').set({ enable: true });
hammer.get('rotate').set({ enable: true });

// Listen to multiple events
hammer.on('tap', () => console.log('Tap'));
hammer.on('doubletap', () => console.log('Double tap'));
hammer.on('press', () => console.log('Long press'));
hammer.on('swipe', () => console.log('Swipe'));
hammer.on('pan', () => console.log('Pan'));
hammer.on('pinch', () => console.log('Pinch'));
hammer.on('rotate', () => console.log('Rotate'));
```

**When to use:** Complex interactive elements requiring multiple gesture types

### Pattern 5: Direction Control

```javascript
const element = document.getElementById('target');
const hammer = new Hammer(element);

// Configure pan to only work vertically
hammer.get('pan').set({
  direction: Hammer.DIRECTION_VERTICAL
});

// Available directions:
// Hammer.DIRECTION_ALL (default)
// Hammer.DIRECTION_HORIZONTAL
// Hammer.DIRECTION_VERTICAL
// Hammer.DIRECTION_UP
// Hammer.DIRECTION_DOWN
// Hammer.DIRECTION_LEFT
// Hammer.DIRECTION_RIGHT

hammer.on('panup', () => console.log('Panned up'));
hammer.on('pandown', () => console.log('Panned down'));
```

**When to use:** Vertical scrollers, horizontal sliders, directional controls

---

## 📱 Mobile Considerations

### Touch Support
- ✅ Native touch events on iOS and Android
- ✅ Multi-touch gestures (pinch, rotate) fully supported
- ✅ Automatic mouse event fallback for desktop
- ✅ Pointer Events API support for modern browsers

### Responsive Behavior
```javascript
// Adjust thresholds for different screen sizes
const isMobile = window.innerWidth < 768;

hammer.get('swipe').set({
  threshold: isMobile ? 10 : 20,  // Lower threshold on mobile
  velocity: isMobile ? 0.3 : 0.4
});
```

### iOS/Android Gotchas
- **Touch-action CSS**: Add `touch-action: none` to prevent default scrolling
```css
.gesture-target {
  touch-action: none; /* Prevents browser default gestures */
}
```
- **iOS Safari**: Disable double-tap zoom with viewport meta tag
```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
```
- **Android Chrome**: May need to preventDefault on touchstart for some gestures

---

## 🐛 Common Gotchas

### Issue 1: Gestures Not Recognized
**Problem:** Pinch, rotate, or multi-touch gestures don't work
**Solution:** These recognizers are disabled by default - enable them explicitly
```javascript
// ❌ Wrong - pinch won't work
const hammer = new Hammer(element);
hammer.on('pinch', callback); // Won't fire!

// ✅ Correct - enable pinch first
const hammer = new Hammer(element);
hammer.get('pinch').set({ enable: true });
hammer.on('pinch', callback); // Now it works
```

### Issue 2: Conflicts with Scrolling
**Problem:** Pan gestures prevent normal page scrolling
**Solution:** Set direction to only capture specific gestures
```javascript
// Only capture horizontal pan, allow vertical scroll
hammer.get('pan').set({
  direction: Hammer.DIRECTION_HORIZONTAL
});
```

### Issue 3: Event Bubbling Issues
**Problem:** Parent elements also receive gesture events
**Solution:** Stop event propagation
```javascript
hammer.on('tap', function(event) {
  event.srcEvent.stopPropagation(); // Stop bubbling
  // Your code here
});
```

### Issue 4: Memory Leaks
**Problem:** Hammer instances not cleaned up when elements removed
**Solution:** Destroy instances when done
```javascript
// When removing element or unmounting component
hammer.destroy();
hammer = null;
```

### Issue 5: Tap vs Click Delay on Mobile
**Problem:** Using native click events has 300ms delay on mobile
**Solution:** Use Hammer's tap event instead
```javascript
// ❌ Has delay on mobile
element.addEventListener('click', handler);

// ✅ No delay
hammer.on('tap', handler);
```

---

## 💡 Pro Tips

- **Use `touchAction` option** instead of CSS when possible for better performance: `new Hammer(el, { touchAction: 'pan-y' })`
- **Combine recognizers** for complex interactions: enable multiple gesture types on same element
- **Optimize for performance** by limiting recognizer updates during animation frames
- **Test on real devices** - emulators don't accurately simulate multi-touch
- **Consider thresholds** - adjust velocity and distance thresholds based on element size and expected user behavior
- **Prevent default carefully** - only prevent defaults when necessary to avoid breaking browser features

---

## 🔗 Resources

- [Official Documentation](https://hammerjs.github.io/)
- [GitHub Repository](https://github.com/hammerjs/hammer.js)
- [npm Package](https://www.npmjs.com/package/hammerjs)
- [API Reference](https://hammerjs.github.io/api/)
- [Recognizer Options](https://hammerjs.github.io/recognizer-pan/)

---

## 📊 Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 55+ | Full support |
| Firefox | 52+ | Full support |
| Safari | 11+ | Full support |
| Edge | 79+ | Full support |
| iOS Safari | 11+ | Native touch optimized |
| Android Chrome | 55+ | Native touch optimized |

**Note:** Uses touch events and pointer events. For older browsers, falls back to mouse events.

---

## 🆚 Alternatives

When to consider other libraries:
- **Native Touch Events**: Lighter weight if you only need basic touch handling
- **Interact.js**: More features (draggable, resizable, snap-to-grid) but heavier (30kb)
- **ZingTouch**: Modern alternative with smaller footprint and better TypeScript support
- **Swiper.js**: Better if you specifically need a carousel/slider (more opinionated)
- **Pointer Events API**: Native browser API, but requires more manual gesture detection

---

## ⚠️ Breaking Changes

### v2.0.0 → v2.0.8
- No breaking changes
- Bug fixes and stability improvements
- Minor performance optimizations

### v1.x → v2.0.0
- Changed event names: `drag` → `pan`, `transform` → `pinch`/`rotate`
- New recognizer system - must enable pinch/rotate explicitly
- Updated direction constants (use `Hammer.DIRECTION_*`)
- Changed API for creating custom recognizers

**Migration tip:** Update event names and enable multi-touch recognizers explicitly

---

**Last Updated:** 2025-12-19
**Verified Version:** 2.0.8
