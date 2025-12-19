# LocalForage

> Fast, simple async storage library that wraps IndexedDB, WebSQL, or localStorage with a localStorage-like API

**Version:** 1.10.0
**Category:** storage
**Bundle Size:** 29 kb (minified) / 8.8 kb (gzipped)
**Dependencies:** None

---

## 🎯 What It Does

LocalForage provides a simple, asynchronous key-value storage interface that automatically uses the best available storage backend (IndexedDB, WebSQL, or localStorage). It offers localStorage's simplicity with IndexedDB's power, supporting complex data types like Blobs, ArrayBuffers, and TypedArrays without manual serialization.

**Best for:**
- Offline-first web applications requiring persistent storage
- Storing large objects, binary data, or files in the browser
- Progressive Web Apps (PWAs) needing reliable async storage
- Projects wanting localStorage simplicity with better performance

**Not suitable for:**
- Complex queries or relational data (use Dexie.js instead)
- Server synchronization requirements (use PouchDB instead)
- Real-time collaborative data (needs specialized solutions)

---

## 📦 Installation

### CDN (Recommended)

```html
<script src="https://cdn.jsdelivr.net/npm/localforage@1.10.0/dist/localforage.min.js"></script>
```

### npm

```bash
npm install localforage
```

---

## ⚡ Quick Start

### Basic Usage

```javascript
// Store data (returns Promise)
await localforage.setItem('user', { name: 'Alice', id: 123 });

// Retrieve data
const user = await localforage.getItem('user');
console.log(user.name); // 'Alice'

// Remove item
await localforage.removeItem('user');

// Clear all data
await localforage.clear();
```

### Expected Output / Result

LocalForage automatically serializes/deserializes objects, so you get back the exact data type you stored. No need for `JSON.parse()` or `JSON.stringify()` calls.

---

## 🔧 Common Patterns

### Pattern 1: Async/Await (Recommended)

```javascript
try {
  await localforage.setItem('settings', { theme: 'dark', lang: 'en' });
  const settings = await localforage.getItem('settings');
  console.log(settings.theme); // 'dark'
} catch (err) {
  console.error('Storage error:', err);
}
```

**When to use:** Modern applications with ES2017+ support. Cleanest syntax for async operations.

### Pattern 2: Storing Blobs and Binary Data

```javascript
// Store a Blob (e.g., image file)
const blob = new Blob(['Hello, world!'], { type: 'text/plain' });
await localforage.setItem('file', blob);

// Store ArrayBuffer or TypedArray
const buffer = new Uint8Array([1, 2, 3, 4, 5]);
await localforage.setItem('binary', buffer);
```

**When to use:** Storing images, files, or binary data that would be cumbersome with localStorage.

### Pattern 3: Multiple Instances

```javascript
// Create separate storage contexts
const userStore = localforage.createInstance({
  name: 'myApp',
  storeName: 'users'
});

const cacheStore = localforage.createInstance({
  name: 'myApp',
  storeName: 'cache'
});

await userStore.setItem('currentUser', userData);
await cacheStore.setItem('apiResponse', data);
```

**When to use:** Organizing data into logical groups or managing different data lifecycles.

### Pattern 4: Configuration

```javascript
// Must be called BEFORE any data operations
localforage.config({
  driver: localforage.INDEXEDDB, // Force specific driver
  name: 'myApp',
  version: 1.0,
  storeName: 'keyvaluepairs', // Table name
  description: 'Application data storage'
});
```

---

## 📱 Mobile Considerations

### Storage Limits
- ✅ IndexedDB: Up to 60% of disk space (Safari 17+)
- ⚠️ iOS <17: May prompt user for storage quota
- ⚠️ localStorage fallback: ~5-10MB limit

### iOS Safari Quirks
- **iOS 16 Bug**: Writing >2.5MB to localStorage may clear all data silently
- **Private Browsing**: setItem() throws QUOTA_EXCEEDED_ERR even with space available
- **iOS 13.4+**: Intelligent Tracking Prevention may evict data after 7 days of inactivity
- **Workaround**: Prefer IndexedDB driver on iOS, avoid localStorage fallback

### Android
- ✅ Full IndexedDB support on Chrome for Android 32+
- ✅ No significant platform-specific issues

---

## 🐛 Common Gotchas

### Issue 1: Calling config() Too Late
**Problem:** Configuration is ignored if called after first data operation
**Solution:** Always call `config()` before any `getItem()`, `setItem()`, etc.
```javascript
// ✅ Correct order
localforage.config({ name: 'myApp' });
await localforage.setItem('key', 'value');
```

### Issue 2: undefined Values Return null
**Problem:** Storing `undefined` returns `null` when retrieved
**Solution:** Use `null` explicitly or check for both
```javascript
const value = await localforage.getItem('missing');
if (value === null) { /* handle missing or undefined */ }
```

### Issue 3: Treating It Like Synchronous localStorage
**Problem:** Expecting immediate return values from getItem()
**Solution:** Always use await, .then(), or callbacks
```javascript
// ❌ Wrong
const data = localforage.getItem('key'); // Returns Promise, not data!

// ✅ Correct
const data = await localforage.getItem('key');
```

### Issue 4: Private Browsing Detection
**Problem:** Safari private mode appears to support storage but throws exceptions
**Solution:** Wrap operations in try-catch blocks
```javascript
try {
  await localforage.setItem('test', 'value');
} catch (err) {
  console.warn('Storage unavailable (private browsing?)');
}
```

---

## 💡 Pro Tips

- **Driver Fallback**: LocalForage automatically falls back: IndexedDB → WebSQL → localStorage
- **Iteration**: Use `localforage.iterate()` to loop through all items efficiently
- **Keys Method**: `await localforage.keys()` returns array of all keys
- **TypeScript**: Enable `allowSyntheticDefaultImports` for cleaner imports
- **Binary Performance**: Avoid localStorage backend for large binary data (serialization overhead)
- **Framework Wrappers**: Official adapters available for Angular, Vue, React, Ember

---

## 🔗 Resources

- [Official Documentation](https://localforage.github.io/localForage/)
- [GitHub Repository](https://github.com/localForage/localForage)
- [npm Package](https://www.npmjs.com/package/localforage)
- [Browser Support Wiki](https://github.com/localForage/localForage/wiki/Supported-Browsers-Platforms)

---

## 📊 Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 23+ | Full IndexedDB support |
| Firefox | 18+ | Full IndexedDB support |
| Safari | 3.1+ | iOS 16+ has localStorage bugs; use IndexedDB |
| Edge | 12+ | Full support |
| IE | 10+ | IndexedDB; IE 8-9 uses localStorage fallback |
| iOS Safari | 8+ | Beware ITP data eviction after 7 days inactivity |
| Android Chrome | 32+ | Full support |

---

## 🆚 Alternatives

When to consider other libraries:
- **idb-keyval**: Lighter (600B) if you only need simple key-value storage with IndexedDB only
- **Dexie.js**: Better for complex queries, schemas, transactions, and relational data
- **PouchDB**: Required for CouchDB synchronization and offline-first with server sync
- **Native IndexedDB**: Direct API if you need maximum control and performance

---

**Last Updated:** 2025-12-19
**Verified Version:** 1.10.0
