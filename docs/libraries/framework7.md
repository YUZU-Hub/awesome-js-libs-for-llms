# Framework7

> Mobile-first UI framework for building iOS and Android apps with native look and feel

**Version:** 9.0.2
**Category:** mobile-ui
**Bundle Size:** 70.3 kb (minified + gzipped)
**Dependencies:** None (framework-agnostic)

---

## 🎯 What It Does

Framework7 is a full-featured mobile HTML framework that provides native-like iOS and Android UI components. It offers automatic platform-specific styling (iOS and Material Design) with a comprehensive set of UI components, smooth animations, and a powerful router for single-page applications.

**Best for:**
- Building hybrid mobile apps (Cordova/Capacitor)
- Progressive Web Apps (PWA) with native feel
- Mobile-first web applications with iOS/Android styling
- Rapid prototyping of mobile interfaces
- Apps requiring platform-specific UI (automatic iOS/Material themes)

**Not suitable for:**
- Desktop-only applications (mobile-focused)
- Simple websites without app-like navigation
- Projects requiring extensive cross-browser legacy support
- When bundle size is critical and you only need basic components

---

## 📦 Installation

### CDN (Recommended for Quick Start)

```html
<!-- Framework7 CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/framework7@9.0.2/framework7-bundle.min.css">

<!-- Framework7 JS -->
<script src="https://cdn.jsdelivr.net/npm/framework7@9.0.2/framework7-bundle.min.js"></script>
```

### npm

```bash
npm install framework7
```

### With Frontend Frameworks

```bash
# Vue.js
npm install framework7-vue

# React
npm install framework7-react

# Svelte
npm install framework7-svelte
```

---

## ⚡ Quick Start

### Basic App Structure

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <title>My App</title>

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/framework7@9/css/framework7.bundle.min.css">
</head>
<body>
  <div id="app">
    <div class="view view-main">
      <div class="page">
        <div class="navbar">
          <div class="navbar-bg"></div>
          <div class="navbar-inner">
            <div class="title">My App</div>
          </div>
        </div>
        <div class="page-content">
          <div class="block">
            <p>Hello World!</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/framework7@9/js/framework7.bundle.min.js"></script>
  <script>
    var app = new Framework7({
      el: '#app',
      name: 'My App',
      theme: 'auto', // Auto-detect iOS or Material
    });
  </script>
</body>
</html>
```

### Expected Output

A mobile app interface with native iOS or Material Design styling (auto-detected based on device), including a navigation bar and content area with smooth touch interactions.

---

## 🔧 Common Patterns

### Pattern 1: Multi-Page Navigation with Router

```javascript
var app = new Framework7({
  el: '#app',
  name: 'My App',
  theme: 'auto',
  routes: [
    {
      path: '/',
      url: './index.html',
    },
    {
      path: '/about/',
      url: './about.html',
    },
    {
      path: '/form/',
      url: './form.html',
    },
  ],
});

var mainView = app.views.create('.view-main');
```

```html
<!-- Navigation links -->
<a href="/about/" class="link">About</a>
<a href="/form/" class="button">Go to Form</a>
<a href="#" class="link back">Go Back</a>
```

**When to use:** Single-page apps with multiple views, history management needed

### Pattern 2: List View with Links

```html
<div class="list">
  <ul>
    <li>
      <a href="/item/1/" class="item-link item-content">
        <div class="item-inner">
          <div class="item-title">Item 1</div>
        </div>
      </a>
    </li>
    <li>
      <a href="/item/2/" class="item-link item-content">
        <div class="item-inner">
          <div class="item-title">Item 2</div>
        </div>
      </a>
    </li>
  </ul>
</div>
```

**When to use:** Settings screens, menus, contact lists, any scrollable list navigation

### Pattern 3: Popup/Dialog

```javascript
// Create popup
var popup = app.popup.create({
  content: `
    <div class="popup">
      <div class="page">
        <div class="navbar">
          <div class="navbar-bg"></div>
          <div class="navbar-inner">
            <div class="title">Popup Title</div>
            <div class="right">
              <a href="#" class="link popup-close">Close</a>
            </div>
          </div>
        </div>
        <div class="page-content">
          <div class="block">
            <p>Popup content here</p>
          </div>
        </div>
      </div>
    </div>
  `,
  on: {
    open: function () {
      console.log('Popup opened');
    },
  }
});

// Open popup
popup.open();
```

**When to use:** Modal content, forms, details that overlay main content

### Pattern 4: Buttons and Actions

```html
<!-- Standard buttons -->
<a href="#" class="button">Default Button</a>
<a href="#" class="button button-fill">Filled Button</a>
<a href="#" class="button button-raised">Raised Button</a>

<!-- Button row -->
<div class="block">
  <div class="row">
    <div class="col"><a href="#" class="button button-fill">Cancel</a></div>
    <div class="col"><a href="#" class="button button-fill">Submit</a></div>
  </div>
</div>
```

**When to use:** Call-to-action buttons, form submissions, navigation actions

### Pattern 5: Cards

```html
<div class="card">
  <div class="card-header">Card Header</div>
  <div class="card-content card-content-padding">
    <p>Card content goes here with some text and information.</p>
  </div>
  <div class="card-footer">
    <a href="#" class="link">Read more</a>
    <a href="#" class="link">Like</a>
  </div>
</div>
```

**When to use:** Content feeds, dashboards, grouped related information

---

## 📱 Mobile Considerations

### Touch Support
- ✅ Full native touch event support with hardware acceleration
- ✅ Touch ripple effects (Material) and highlight (iOS)
- ✅ Fast click handling (no 300ms delay)
- ✅ Smooth swipe gestures for navigation and actions

### Responsive Behavior
```javascript
// Platform-specific configuration
var app = new Framework7({
  el: '#app',
  theme: 'auto', // Auto-detect: 'ios' | 'md' | 'aurora'
  touch: {
    tapHold: true, // Enable tap and hold events
    tapHoldDelay: 750, // Milliseconds
  },
  view: {
    iosSwipeBack: true, // iOS-style swipe back
    mdSwipeBack: false, // Material typically doesn't use swipe back
  },
});
```

### iOS/Android Gotchas
- **Platform Detection**: Framework7 auto-detects platform but can be forced with `theme: 'ios'` or `theme: 'md'`
- **Safe Areas**: Use `viewport-fit=cover` meta tag and Framework7's safe area classes for notched devices
- **Statusbar**: Requires Cordova statusbar plugin for proper statusbar color management
- **HTTPS**: iOS requires HTTPS or App Transport Security (ATS) exceptions for HTTP

---

## 🐛 Common Gotchas

### Issue 1: View Not Initialized
**Problem:** Router navigation doesn't work, links don't trigger page transitions
**Solution:** Always create a view instance after app initialization
```javascript
// ❌ Wrong - no view created
var app = new Framework7({ el: '#app' });

// ✅ Correct - create main view
var app = new Framework7({ el: '#app' });
var mainView = app.views.create('.view-main');
```

### Issue 2: Page Lifecycle Events
**Problem:** JavaScript not executing on dynamically loaded pages
**Solution:** Use page lifecycle events, not document.ready
```javascript
app.on('pageInit', function (page) {
  // This runs when any page is initialized
  if (page.name === 'about') {
    // Code specific to about page
    console.log('About page initialized');
  }
});
```

### Issue 3: CSS Theme Conflicts
**Problem:** Wrong theme styles applied (iOS on Android or vice versa)
**Solution:** Use `theme: 'auto'` or check theme with `app.theme`
```javascript
// Force specific theme
var app = new Framework7({
  el: '#app',
  theme: 'md', // Force Material Design
});

// Check current theme
if (app.theme === 'ios') {
  // iOS-specific code
}
```

### Issue 4: Bundle vs Core
**Problem:** Components not working despite correct HTML
**Solution:** Use bundle version or import specific components
```html
<!-- ✅ Use bundle for all components -->
<script src="https://cdn.jsdelivr.net/npm/framework7@9/js/framework7.bundle.min.js"></script>

<!-- ❌ Core version missing components -->
<script src="https://cdn.jsdelivr.net/npm/framework7@9/js/framework7.min.js"></script>
```

---

## 💡 Pro Tips

- **Use Lite Version** with Vue/React/Svelte - smaller bundle when using framework integrations
- **Lazy Load Components** - Import only components you need for better tree-shaking
- **Kitchen Sink App** - Study the official Kitchen Sink demo for component examples
- **Use Template7** - Built-in mobile-first template engine for dynamic content
- **Panel Navigation** - Implement side panels for drawer navigation patterns
- **Preload Pages** - Use `preloadPreviousPage: true` for smoother back navigation
- **Custom Build** - Create custom builds with only needed components (ES modules)

---

## 🔗 Resources

- [Official Documentation](https://framework7.io/docs/)
- [GitHub Repository](https://github.com/framework7io/framework7)
- [npm Package](https://www.npmjs.com/package/framework7)
- [Kitchen Sink Demo](https://framework7.io/examples/)
- [Forum Community](https://forum.framework7.io/)
- [Release Notes](https://framework7.io/release-notes/)
- [Tutorials](https://framework7.io/tutorials/)

---

## 📊 Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 90+ | Full support |
| Firefox | 88+ | Full support |
| Safari | 14+ | Primary iOS target |
| Edge | 90+ | Full support |
| iOS Safari | 14+ | Primary target, fully optimized |
| Android Chrome | 90+ | Primary target, Material Design |

**Note:** Focused on iOS Safari (webkit) and latest Android. Not designed for legacy IE support.

---

## 🆚 Alternatives

When to consider other libraries:
- **Ionic Framework**: Better if you need Angular integration, larger community, more enterprise features
- **Onsen UI**: More standardized approach, strong Angular support, smaller learning curve
- **React Native**: Better for truly native apps (not web-based), access to native APIs
- **jQuery Mobile**: Legacy projects only, Framework7 is significantly more modern
- **Quasar Framework**: Better for full-stack Vue.js apps with desktop support

---

## ⚠️ Breaking Changes

### v8.0.0 → v9.0.0
- **Dynamic Navbar removed** - No longer need `dynamicNavbar` parameter, transitions work automatically
- **Touch configuration changed** - Use `touchRipple` (Material) and `touchHighlight` (iOS) instead of `mdTouchRipple`/`iosTouchRipple`
- **iOS 26 styles** - Updated to latest iOS 26 design language with refined spacing and typography
- **Material You updates** - New Vibrant and Monochrome color schemes, updated Range and Progressbar components

### v7.0.0 → v8.0.0
- Complete rewrite with TypeScript
- New Material You design implementation
- Core components modularized for better tree-shaking
- Improved animations and transitions engine
- Migration guide: https://framework7.io/docs/migration-from-v7-to-v8

---

**Last Updated:** 2025-12-19
**Verified Version:** 9.0.2
