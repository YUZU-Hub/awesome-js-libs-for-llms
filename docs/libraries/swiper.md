# Swiper

> Modern mobile touch slider with hardware accelerated transitions

**Version:** 12.0.3
**Category:** sliders-carousels
**Bundle Size:** 41 kb (minified) / 14 kb (gzipped)
**Dependencies:** None

---

## 🎯 What It Does

Swiper is the most modern mobile touch slider with hardware accelerated transitions and native behavior. It's designed to be used in mobile websites, mobile web apps, and mobile native/hybrid apps. Features include touch gestures, pagination, navigation, multiple slides, parallax effects, and lazy loading.

**Best for:**
- Image galleries and carousels
- Full-screen mobile sliders
- Product showcases and testimonials
- Touch-friendly content navigation
- Card-style layouts with swipe gestures

**Not suitable for:**
- Simple image lightboxes (use PhotoSwipe)
- Static content that doesn't need swiping
- Tab navigation (use native tabs)

---

## 📦 Installation

### CDN (Recommended)

```html
<!-- Swiper CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@12.0.3/swiper-bundle.min.css">

<!-- Swiper JS -->
<script src="https://cdn.jsdelivr.net/npm/swiper@12.0.3/swiper-bundle.min.js"></script>
```

### npm

```bash
npm install swiper@12.0.3
```

---

## ⚡ Quick Start

### Basic Slider

```html
<!-- HTML Structure -->
<div class="swiper">
  <div class="swiper-wrapper">
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
    <div class="swiper-slide">Slide 3</div>
  </div>
  <!-- Optional: Pagination -->
  <div class="swiper-pagination"></div>
  <!-- Optional: Navigation -->
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
</div>

<script>
  // Initialize Swiper
  const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
</script>
```

### Expected Output

A fully functional touch-enabled slider with dots (pagination) and arrow buttons. Swipes smoothly on mobile, clicks arrows on desktop.

---

## 🔧 Common Patterns

### Pattern 1: Image Gallery with Thumbnails

```javascript
// Main gallery
const mainSwiper = new Swiper('.gallery-main', {
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// Thumbnail gallery
const thumbSwiper = new Swiper('.gallery-thumbs', {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});

// Link them together
mainSwiper.controller.control = thumbSwiper;
thumbSwiper.controller.control = mainSwiper;
```

**When to use:** Product galleries, portfolio showcases

### Pattern 2: Responsive Breakpoints

```javascript
const swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  spaceBetween: 10,
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 640px
    640: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    // when window width is >= 768px
    768: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    // when window width is >= 1024px
    1024: {
      slidesPerView: 4,
      spaceBetween: 40
    }
  }
});
```

**When to use:** Responsive card layouts, adaptive content grids

### Pattern 3: Autoplay with Progress Bar

```javascript
const swiper = new Swiper('.swiper', {
  autoplay: {
    delay: 3000,
    disableOnInteraction: false, // Continue after user interaction
  },
  speed: 600,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'progressbar', // Show progress bar instead of bullets
  },
});
```

**When to use:** Hero banners, promotional content, testimonials

### Pattern 4: Cards with Centered Active Slide

```javascript
const swiper = new Swiper('.swiper', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
});
```

**When to use:** Featured content, card-style navigation, app screenshots

### Pattern 5: Lazy Loading Images

```html
<div class="swiper">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <img data-src="image1.jpg" class="swiper-lazy">
      <div class="swiper-lazy-preloader"></div>
    </div>
    <div class="swiper-slide">
      <img data-src="image2.jpg" class="swiper-lazy">
      <div class="swiper-lazy-preloader"></div>
    </div>
  </div>
</div>

<script>
  const swiper = new Swiper('.swiper', {
    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 2,
    },
  });
</script>
```

**When to use:** Large image galleries, performance optimization, mobile sites

---

## 📱 Mobile Considerations

### Touch Support
- ✅ Native touch events with smooth 60fps animations
- ✅ Hardware acceleration enabled by default
- ✅ Multi-touch support for pinch/zoom with zoom module
- ✅ Respects momentum and bounce-back physics

### Responsive Behavior

```javascript
const swiper = new Swiper('.swiper', {
  // Better touch experience
  touchRatio: 1,          // 1:1 touch to slide ratio
  touchAngle: 45,         // Allow 45° angle touch
  shortSwipes: true,      // Allow quick flicks
  longSwipes: true,       // Allow long drag swipes
  longSwipesRatio: 0.5,   // Trigger at 50% width

  // Mobile-specific
  preventInteractionOnTransition: true, // Prevent double-tap during transition
  observer: true,         // Auto-update on DOM changes
  observeParents: true,   // Watch parent elements too
});
```

### iOS/Android Gotchas

```javascript
// Fix for iOS scrolling issues
const swiper = new Swiper('.swiper', {
  touchStartPreventDefault: false, // Allow scrolling page on iOS

  // Android momentum scrolling
  freeMode: {
    enabled: true,
    momentum: true,
    momentumRatio: 1,
    momentumVelocityRatio: 1,
  },
});
```

- **iOS Safari**: May need `touch-action: pan-y` on body to prevent conflicts
- **Android Chrome**: Enable `passiveListeners: false` if scrolling conflicts occur
- **Landscape orientation**: Use `watchOverflow: true` to disable when slides fit

---

## 🐛 Common Gotchas

### Issue 1: Swiper Not Initializing

**Problem:** Swiper initializes before images load, causing wrong dimensions
**Solution:** Initialize after images load or use `updateOnImagesReady`

```javascript
// ❌ Wrong - initializes immediately
const swiper = new Swiper('.swiper');

// ✅ Correct - waits for images
const swiper = new Swiper('.swiper', {
  preloadImages: false,
  lazy: true,
  // Or observe images
  observer: true,
  observeParents: true,
});

// Alternative: manually update
swiper.update();
```

### Issue 2: Loop Mode with slidesPerView

**Problem:** Duplicate slides issues when using `loop: true` with `slidesPerView > 1`
**Solution:** Need enough slides (at least 2x slidesPerView)

```javascript
// ❌ Wrong - only 3 slides with slidesPerView: 3
const swiper = new Swiper('.swiper', {
  slidesPerView: 3,
  loop: true, // Won't work properly
});

// ✅ Correct - ensure enough slides
const swiper = new Swiper('.swiper', {
  slidesPerView: 3,
  loop: true,
  loopAdditionalSlides: 3, // Add buffer slides
});
```

### Issue 3: Height Issues with Auto Height

**Problem:** Swiper container has zero height
**Solution:** Set explicit height or use autoHeight

```css
/* ❌ Wrong - no height set */
.swiper {
  width: 100%;
}

/* ✅ Correct - explicit height */
.swiper {
  width: 100%;
  height: 400px;
}

/* Or use auto height */
```

```javascript
const swiper = new Swiper('.swiper', {
  autoHeight: true, // Adjusts to active slide height
});
```

### Issue 4: Navigation Hidden Behind Other Elements

**Problem:** Navigation arrows not clickable due to z-index
**Solution:** Set proper z-index

```css
.swiper-button-next,
.swiper-button-prev {
  z-index: 10; /* Above slides */
}
```

### Issue 5: Slides Per View Not Working

**Problem:** slidesPerView: 'auto' not working
**Solution:** Set explicit width on slides

```css
/* ✅ Required for slidesPerView: 'auto' */
.swiper-slide {
  width: 300px; /* Or any fixed/percentage width */
}
```

---

## 💡 Pro Tips

- **Destroy properly**: Always call `swiper.destroy(true, true)` when removing from DOM to prevent memory leaks
- **Virtual slides**: Use `virtual: true` for thousands of slides to improve performance
- **Disable prefetch**: Set `watchSlidesProgress: true` for better initial load time
- **Custom pagination**: Use `renderBullet` callback for styled pagination dots
- **Accessibility**: Swiper includes ARIA labels by default, enable with `a11y: true`
- **Events**: Use `swiper.on('slideChange', callback)` for tracking analytics
- **Keyboard control**: Enable with `keyboard: true` for desktop accessibility

---

## 🔗 Resources

- [Official Documentation](https://swiperjs.com/swiper-api)
- [GitHub Repository](https://github.com/nolimits4web/swiper)
- [npm Package](https://www.npmjs.com/package/swiper)
- [Demos & Examples](https://swiperjs.com/demos)
- [React/Vue/Angular Integration](https://swiperjs.com/react)

---

## 📊 Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 60+ | Full support |
| Firefox | 60+ | Full support |
| Safari | 12+ | Full support |
| Edge | 79+ | Full support (Chromium) |
| iOS Safari | 12+ | Optimized for touch |
| Android Chrome | 60+ | Hardware acceleration |

**Note:** Uses modern JavaScript (ES6+), polyfills may be needed for older browsers

---

## 🆚 Alternatives

When to consider other libraries:

- **Glide.js**: Lighter weight (23kb vs 41kb), but fewer features and effects
- **Slick Carousel**: Older but stable, jQuery-dependent, good for legacy projects
- **Flickity**: Similar features, different API, better for masonry layouts
- **Splide**: Lightweight (28kb), newer, less community support
- **Keen Slider**: Tiny (5kb), framework-agnostic, minimal features

**Choose Swiper if:**
- Need comprehensive mobile touch support
- Want built-in effects (cube, flip, cards)
- Require virtual slides for performance
- Need framework integrations (React/Vue/Angular)

**Choose alternatives if:**
- Bundle size is critical (use Splide or Keen Slider)
- Only need basic slider functionality (use Glide.js)
- Using jQuery already (use Slick)

---

## ⚠️ Breaking Changes

### v11.0.0 → v12.0.0
- Removed deprecated methods: `swiper.slidePrev()` now requires manual loop handling
- Changed default `speed` from 300ms to 400ms
- Updated CSS class names: `.swiper-container` is now just `.swiper`
- Removed IE11 support completely

### v10.0.0 → v11.0.0
- Migrated to ES modules by default
- Removed CommonJS support
- Changed import paths: `import Swiper from 'swiper'` instead of `'swiper/swiper-bundle'`

### v8.0.0 → v9.0.0
- Renamed `.swiper-container` to `.swiper`
- Updated default modules - must import explicitly
- Changed autoplay API: `autoplay.delay` instead of `autoplayDelay`

**Migration Tips:**
```html
<!-- Old (v8 and before) -->
<div class="swiper-container">

<!-- New (v9+) -->
<div class="swiper">
```

```javascript
// Old imports
import Swiper from 'swiper/swiper-bundle';

// New imports (v11+)
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
```

---

**Last Updated:** 2025-12-19
**Verified Version:** 12.0.3
