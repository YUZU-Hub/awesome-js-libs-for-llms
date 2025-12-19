# Lodash

> Modern JavaScript utility library delivering modularity, performance & extras

**Version:** 4.17.21
**Category:** utilities
**Bundle Size:** 71 kb (minified) / 25 kb (gzipped) | 4 kb per method (modular)
**Dependencies:** None

---

## 🎯 What It Does

Lodash is a comprehensive JavaScript utility library that provides 200+ functions for common programming tasks like manipulating arrays, objects, strings, and functions. It emphasizes performance, consistency, and reducing boilerplate code.

**Best for:**
- Array and object manipulation (deep cloning, merging, filtering)
- Function utilities (debounce, throttle, memoize)
- Data transformation and grouping operations
- Type checking and validation
- Working with nested data structures

**Not suitable for:**
- When native JS methods suffice (map, filter, forEach)
- Bundle size is critical and you only need 1-2 functions (use lodash-es)
- Functional programming purists (consider Ramda)

---

## 📦 Installation

### CDN (Recommended)

```html
<!-- Full build -->
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>

<!-- Core build (4KB, most common functions) -->
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.core.min.js"></script>
```

### npm

```bash
# Full library
npm install lodash

# ES modules (tree-shakeable)
npm install lodash-es

# Individual methods
npm install lodash.debounce lodash.clonedeep
```

---

## ⚡ Quick Start

### Basic Usage

```javascript
// CDN: Use _ as global variable
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
const evens = _.filter(numbers, n => n % 2 === 0);
console.log(evens); // [2, 4, 6, 8]

// Get nested property safely
const user = { profile: { name: 'John', age: 30 } };
const name = _.get(user, 'profile.name'); // 'John'
const email = _.get(user, 'profile.email', 'N/A'); // 'N/A' (default)

// Deep clone object
const original = { a: 1, b: { c: 2 } };
const clone = _.cloneDeep(original);
clone.b.c = 3; // Doesn't affect original
```

### Expected Output

Lodash functions return new arrays/objects without mutating originals (immutable by default), making them safe for React state updates.

---

## 🔧 Common Patterns

### Pattern 1: Debounce (Search Input)

```javascript
// Debounce: Execute after user stops typing for 300ms
const searchInput = document.getElementById('search');
const search = _.debounce(function(query) {
  console.log('Searching for:', query);
  // Make API call here
}, 300);

searchInput.addEventListener('input', (e) => {
  search(e.target.value);
});

// Cancel on component unmount
window.addEventListener('unload', () => search.cancel());
```

**When to use:** Search inputs, window resize handlers, scroll events

### Pattern 2: Throttle (Scroll Handler)

```javascript
// Throttle: Execute at most once per 200ms
const handleScroll = _.throttle(function() {
  const scrollTop = window.pageYOffset;
  console.log('Scroll position:', scrollTop);
}, 200);

window.addEventListener('scroll', handleScroll);

// Leading edge (execute immediately, then wait)
const leadingThrottle = _.throttle(handler, 1000, { leading: true, trailing: false });
```

**When to use:** Scroll tracking, animation frames, rate-limiting API calls

### Pattern 3: Deep Clone vs Shallow Clone

```javascript
// Shallow clone (only top level)
const shallow = _.clone({ a: 1, b: { c: 2 } });
shallow.b.c = 3; // ❌ Mutates original!

// Deep clone (all levels)
const deep = _.cloneDeep({ a: 1, b: { c: 2 } });
deep.b.c = 3; // ✅ Safe, doesn't affect original

// Clone with custom handling
const cloned = _.cloneDeepWith(obj, (value) => {
  if (value instanceof Date) {
    return new Date(value); // Custom Date handling
  }
});
```

**When to use:** Copying state in React/Vue, preventing mutations, duplicating complex objects

### Pattern 4: Safe Property Access

```javascript
const user = {
  profile: {
    address: {
      city: 'New York'
    }
  }
};

// ❌ Unsafe: Throws if path doesn't exist
const city = user.profile.address.city;

// ✅ Safe with default value
const city = _.get(user, 'profile.address.city', 'Unknown');
const zip = _.get(user, 'profile.address.zip', '00000'); // Returns default

// Set nested property safely (creates path)
_.set(user, 'profile.social.twitter', '@johndoe');

// Check if path exists
if (_.has(user, 'profile.address.city')) {
  console.log('City exists!');
}
```

**When to use:** API responses with optional fields, deeply nested data, preventing "Cannot read property of undefined"

### Pattern 5: Array/Object Utilities

```javascript
// Group by property
const users = [
  { name: 'John', role: 'admin' },
  { name: 'Jane', role: 'user' },
  { name: 'Bob', role: 'admin' }
];
const byRole = _.groupBy(users, 'role');
// { admin: [{...}, {...}], user: [{...}] }

// Order/sort multiple fields
const sorted = _.orderBy(users, ['role', 'name'], ['desc', 'asc']);

// Merge objects deeply
const defaults = { theme: 'light', notifications: { email: true, sms: false } };
const userPrefs = { notifications: { email: false } };
const merged = _.merge({}, defaults, userPrefs);
// { theme: 'light', notifications: { email: false, sms: false } }

// Unique values
const nums = [1, 2, 2, 3, 3, 3];
const unique = _.uniq(nums); // [1, 2, 3]
const uniqueBy = _.uniqBy(users, 'role'); // Unique by property

// Chunk array
const items = [1, 2, 3, 4, 5, 6, 7];
const pages = _.chunk(items, 3); // [[1,2,3], [4,5,6], [7]]
```

**When to use:** Data transformation, formatting API responses, pagination, removing duplicates

### Pattern 6: Chaining

```javascript
// Chain multiple operations
const result = _.chain([1, 2, 3, 4, 5, 6])
  .filter(n => n % 2 === 0)  // [2, 4, 6]
  .map(n => n * 2)            // [4, 8, 12]
  .sum()                      // 24
  .value();                   // Must call .value() to get result

// Lazy evaluation (only processes what's needed)
const first3Evens = _.chain(_.range(1, 1000000))
  .filter(n => n % 2 === 0)
  .take(3)  // Only processes until 3 found
  .value(); // [2, 4, 6]
```

**When to use:** Complex data transformations, method chaining preference, performance optimization with large datasets

---

## 📱 Mobile Considerations

### Touch Support
- ✅ Lodash is library-agnostic and works perfectly on mobile
- ✅ Debounce/throttle help optimize touch event performance
- ✅ No DOM manipulation, pure utility functions

### Responsive Behavior
```javascript
// Optimize for mobile: Longer debounce on slow devices
const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
const delay = isMobile ? 500 : 300;
const search = _.debounce(searchHandler, delay);
```

### iOS/Android Gotchas
- **Bundle Size**: Use lodash-es with tree-shaking or individual methods (lodash.debounce)
- **Performance**: Deep cloning large objects can be slow on older devices
- **Memory**: Cancel debounced/throttled functions on unmount to prevent leaks

---

## 🐛 Common Gotchas

### Issue 1: Forgetting .value() in Chains
**Problem:** Chain returns wrapper object, not result
**Solution:** Always call .value() at the end
```javascript
// ❌ Wrong
const result = _.chain([1,2,3]).map(n => n * 2);
console.log(result); // LodashWrapper object

// ✅ Correct
const result = _.chain([1,2,3]).map(n => n * 2).value();
console.log(result); // [2, 4, 6]
```

### Issue 2: Shallow Clone Trap
**Problem:** Using _.clone() on nested objects causes mutations
**Solution:** Use _.cloneDeep() for nested structures
```javascript
// ❌ Wrong
const copy = _.clone({ user: { name: 'John' } });
copy.user.name = 'Jane'; // Mutates original!

// ✅ Correct
const copy = _.cloneDeep({ user: { name: 'John' } });
copy.user.name = 'Jane'; // Safe
```

### Issue 3: Not Canceling Debounce/Throttle
**Problem:** Debounced function executes after component unmounts
**Solution:** Cancel on cleanup
```javascript
// React example
useEffect(() => {
  const debouncedSave = _.debounce(saveData, 500);

  return () => {
    debouncedSave.cancel(); // Cleanup
  };
}, []);
```

### Issue 4: Merge vs Assign
**Problem:** _.assign() is shallow, not deep
**Solution:** Use _.merge() for nested objects
```javascript
const obj1 = { a: { b: 1 } };
const obj2 = { a: { c: 2 } };

_.assign({}, obj1, obj2);  // { a: { c: 2 } } - Lost b!
_.merge({}, obj1, obj2);   // { a: { b: 1, c: 2 } } - Correct
```

---

## 💡 Pro Tips

- **Tree-shaking**: Use `lodash-es` with modern bundlers to only include methods you use
- **Per-method imports**: `import debounce from 'lodash/debounce'` reduces bundle size
- **Performance**: Lodash methods are faster than native for large datasets (optimized algorithms)
- **Immutability**: All methods return new values, safe for React/Redux state updates
- **FP version**: `lodash/fp` provides auto-curried, immutable, data-last functions for functional programming

---

## 🔗 Resources

- [Official Documentation](https://lodash.com/docs/4.17.21)
- [GitHub Repository](https://github.com/lodash/lodash)
- [npm Package](https://www.npmjs.com/package/lodash)
- [Per-method Packages](https://www.npmjs.com/search?q=keywords:lodash-modularized)

---

## 📊 Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | All | Full support |
| Firefox | All | Full support |
| Safari | All | Full support |
| Edge | All | Full support |
| iOS Safari | All | Full support |
| Android Chrome | All | Full support |
| IE | 11+ | Requires core-js polyfills |

**Note:** Lodash supports ES5+ environments. For IE11, ensure polyfills for Promise, Map, Set if using FP variant.

---

## 🆚 Alternatives

When to consider other libraries:
- **Native JavaScript**: Modern ES6+ includes many Lodash equivalents (map, filter, Object.assign, spread operator). Use native for simple cases.
- **Ramda**: Better for functional programming (auto-curried, composition-focused, smaller API surface)
- **Underscore.js**: Lodash predecessor, smaller but fewer features and slower performance
- **Just (just-\*)**: Ultra-modular, install only what you need (just-debounce, just-clone)

**Native equivalents:**
```javascript
// Lodash
_.map(arr, fn)      // Native: arr.map(fn)
_.filter(arr, fn)   // Native: arr.filter(fn)
_.find(arr, fn)     // Native: arr.find(fn)
_.includes(arr, x)  // Native: arr.includes(x)
_.assign(a, b)      // Native: Object.assign(a, b) or {...a, ...b}
_.keys(obj)         // Native: Object.keys(obj)
_.values(obj)       // Native: Object.values(obj)

// Still need Lodash for:
_.debounce, _.throttle, _.cloneDeep, _.merge, _.get, _.groupBy, _.orderBy
```

---

## ⚠️ Breaking Changes

### v4.0.0 → v4.17.21
- No breaking changes in 4.x series
- 4.17.21 is the final 4.x version (maintenance mode)
- Security patches and bug fixes only

### v3.x → v4.0.0
- Removed `_.pluck` (use `_.map` instead)
- Removed `_.where` (use `_.filter` instead)
- Changed `_.template` delimiter syntax
- Removed callback shorthand `_.map(arr, 'prop')` in some methods
- `_.forEach` and `_.map` no longer support exiting early with `return false`

### Migration from 3.x to 4.x
```javascript
// v3
_.pluck(users, 'name')
// v4
_.map(users, 'name')

// v3
_.where(users, { active: true })
// v4
_.filter(users, { active: true })
```

---

**Last Updated:** 2025-12-19
**Verified Version:** 4.17.21
