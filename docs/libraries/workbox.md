# Workbox

> Production-ready service worker library for building Progressive Web Apps with offline support

**Version:** 7.4.0
**Category:** PWA / Service Workers
**Bundle Size:** 4 kb (minified) / 1.8 kb (gzipped) for workbox-window
**Dependencies:** None

---

## 🎯 What It Does

Workbox is Google Chrome team's official library that simplifies service worker implementation for Progressive Web Apps. It provides battle-tested caching strategies, precaching capabilities, offline support, and background sync functionality without dealing with low-level Service Worker APIs.

**Best for:**
- Progressive Web Apps requiring offline functionality
- Implementing advanced caching strategies (cache-first, network-first, stale-while-revalidate)
- Asset precaching for faster loads and offline access
- Background synchronization for failed network requests
- Managing complex service worker routing patterns

**Not suitable for:**
- Simple websites without offline requirements
- Projects that cannot use HTTPS (service workers require HTTPS)
- Legacy browser support (IE11 and below)

---

## 📦 Installation

### CDN (For service worker context)

```javascript
// In your service-worker.js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.4.0/workbox-sw.js');

if (workbox) {
  console.log('Workbox loaded successfully');
} else {
  console.log('Workbox failed to load');
}
```

### npm

```bash
npm install workbox-window workbox-strategies workbox-routing workbox-precaching
```

---

## ⚡ Quick Start

### Basic Service Worker Setup

```javascript
// In your main app.js (window context)
import { Workbox } from 'workbox-window';

if ('serviceWorker' in navigator) {
  const wb = new Workbox('/service-worker.js');

  wb.addEventListener('installed', event => {
    if (event.isUpdate) {
      if (confirm('New version available! Reload to update?')) {
        window.location.reload();
      }
    }
  });

  wb.register();
}
```

```javascript
// In your service-worker.js
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';

// Precache assets during service worker installation
precacheAndRoute(self.__WB_MANIFEST);

// Cache images with cache-first strategy
registerRoute(
  ({request}) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [{
      maxEntries: 60,
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
    }],
  })
);
```

### Expected Output / Result

Service worker installs, caches critical assets immediately, and handles network requests with specified caching strategies. App works offline and loads faster on repeat visits.

---

## 🔧 Common Patterns

### Pattern 1: Cache-First Strategy (for static assets)

```javascript
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// Perfect for CSS, JS, fonts that don't change often
registerRoute(
  ({request}) => request.destination === 'style' ||
                 request.destination === 'script' ||
                 request.destination === 'font',
  new CacheFirst({
    cacheName: 'static-resources',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
        purgeOnQuotaError: true,
      }),
    ],
  })
);
```

**When to use:** For versioned, immutable assets like CSS, JavaScript bundles, web fonts, or images that rarely change. Provides fastest possible load times.

### Pattern 2: Network-First Strategy (for dynamic content)

```javascript
import { NetworkFirst } from 'workbox-strategies';

// For HTML pages, API responses that update frequently
registerRoute(
  ({url}) => url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: 'api-cache',
    networkTimeoutSeconds: 3,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 5 * 60, // 5 minutes
      }),
    ],
  })
);
```

**When to use:** For API calls and HTML pages where fresh content is priority, but you still want fallback for offline scenarios.

### Pattern 3: Stale-While-Revalidate (for balanced approach)

```javascript
import { StaleWhileRevalidate } from 'workbox-strategies';

// Balance speed and freshness
registerRoute(
  ({url}) => url.pathname.startsWith('/avatars/'),
  new StaleWhileRevalidate({
    cacheName: 'avatars',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 24 * 60 * 60, // 1 day
      }),
    ],
  })
);
```

**When to use:** For user-generated content, profile images, or data that changes occasionally but instant load time matters more than absolute freshness.

### Pattern 4: Background Sync (for offline form submissions)

```javascript
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { NetworkOnly } from 'workbox-strategies';

// Queue failed POST requests for retry
const bgSyncPlugin = new BackgroundSyncPlugin('formQueue', {
  maxRetentionTime: 24 * 60, // Retry for up to 24 hours
});

registerRoute(
  /\/api\/submit/,
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'POST'
);
```

**When to use:** For form submissions, analytics, or any POST/PUT requests that must succeed even if user goes offline.

---

## 📱 Mobile Considerations

### PWA Requirements
- ✅ Works across all modern mobile browsers with service worker support
- ✅ Essential for PWA installation and offline functionality
- ✅ Enables "Add to Home Screen" experience on mobile devices

### iOS Safari Limitations
- ⚠️ **Cache eviction**: iOS Safari may clear service worker cache after 7 days of inactivity or when device storage is low
- ⚠️ **Manifest requirement**: Must use `"display": "standalone"` or `"fullscreen"` in manifest.json (not `"minimal-ui"`)
- ⚠️ **Video caching issues**: Large video files may fail to cache or freeze during playback
- ⚠️ **Storage quota**: Combined IndexedDB + Cache limit is 500 MB (or half of free disk space if < 1GB available)
- ⚠️ **No install prompt**: iOS doesn't support `beforeinstallprompt` event; users must manually add via Share button

### Performance Tips
- Keep precache manifest small (< 2 MB) for faster service worker installation
- Use `purgeOnQuotaError: true` in ExpirationPlugin for mobile devices with limited storage
- Implement selective caching - don't cache everything

---

## 🐛 Common Gotchas

### Issue 1: Service Worker Not Updating
**Problem:** Code changes don't appear; old service worker keeps running
**Solution:** Implement proper update flow with skipWaiting
```javascript
// In service-worker.js
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// In app.js
wb.addEventListener('waiting', (event) => {
  wb.messageSkipWaiting();
});
```

### Issue 2: HTTPS Required
**Problem:** Service workers fail silently on HTTP
**Solution:** Always use HTTPS in production. For development, localhost is considered secure by browsers.

### Issue 3: Scope Restrictions
**Problem:** Service worker doesn't control expected pages
**Solution:** Register service worker at root level, or set scope explicitly:
```javascript
navigator.serviceWorker.register('/sw.js', { scope: '/' });
```

### Issue 4: iOS Cache Clearing
**Problem:** iOS Safari clears cache when PWA is closed
**Solution:** Accept this limitation; design for graceful degradation. Critical assets should be precached and re-fetch quickly. Use Network-First for important content.

### Issue 5: __WB_MANIFEST Undefined
**Problem:** `precacheAndRoute(self.__WB_MANIFEST)` fails
**Solution:** Ensure build tool (webpack/vite) plugin injects manifest:
```javascript
// webpack.config.js
const { InjectManifest } = require('workbox-webpack-plugin');

plugins: [
  new InjectManifest({
    swSrc: './src/service-worker.js',
    swDest: 'service-worker.js'
  })
]
```

---

## 💡 Pro Tips

- Use `workbox-window` in your app code (window context), never import it in service worker context
- Combine precaching for critical assets with runtime caching for everything else
- Set appropriate `maxAgeSeconds` per content type - don't use same value everywhere
- Use `networkTimeoutSeconds` with NetworkFirst to avoid long waits on slow connections
- Monitor cache sizes - implement expiration policies to prevent quota errors
- Test offline functionality with Chrome DevTools Application tab > Service Workers > Offline checkbox

---

## 🔗 Resources

- [Official Documentation](https://developer.chrome.com/docs/workbox/)
- [GitHub Repository](https://github.com/GoogleChrome/workbox)
- [npm Package](https://www.npmjs.com/package/workbox-window)
- [web.dev PWA Guide](https://web.dev/learn/pwa/workbox)
- [Caching Strategies Overview](https://developer.chrome.com/docs/workbox/caching-strategies-overview)

---

## 📊 Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 40+ | Full support |
| Firefox | 44+ | Full support |
| Safari | 11.1+ | Limited on iOS (cache eviction issues) |
| Edge | 17+ | Full support |
| iOS Safari | 11.3+ | Cache clears after 7 days inactivity |
| Android Chrome | 40+ | Full support |

**Note:** Service workers require HTTPS (except localhost for development). All modern browsers support service workers except IE11 and Opera Mini.

---

## 🆚 Alternatives

When to consider other libraries:
- **sw-toolbox** (deprecated): Legacy projects only; migrate to Workbox for modern features and active maintenance
- **sw-precache** (deprecated): Superseded by Workbox precaching module
- **Vanilla Service Workers**: More control and smaller bundle, but requires handling all edge cases manually. Good for simple use cases or learning.
- **offline-plugin**: Webpack-specific alternative with simpler API but fewer features than Workbox

---

## ⚠️ Breaking Changes

### v5.0.0 → v7.0.0
- Minimum Node.js version increased to 16
- Removed deprecated `workbox-google-analytics` (use gtag.js with Workbox instead)
- `navigateFallback` now only applies to navigation requests by default

### v4.0.0 → v5.0.0
- Workbox files are bundled locally instead of loaded from CDN by default
- Removed Express-style wildcard routes; use RegExp instead
- `importScripts()` no longer needed for workbox-sw in most build tools

---

**Last Updated:** 2025-12-19
**Verified Version:** 7.4.0
