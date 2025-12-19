# Alpine.js

> Lightweight reactive framework for adding interactivity

**Version:** 3.15.3
**Category:** ui-framework
**Bundle Size:** 15 kb (minified) / 6 kb (gzipped)
**Dependencies:** None

---

## 🎯 What It Does

Alpine.js provides reactive and declarative behavior directly in HTML markup. It's like "jQuery for the modern web" - perfect for adding interactivity without a build step.

**Best for:**
- Dropdowns, modals, tabs, accordions
- Toggle visibility and state
- Form validation and dynamic inputs
- Server-rendered pages needing interactivity

**Not suitable for:**
- Complex single-page applications
- Apps requiring routing
- Complex state management across many components

---

## 📦 Installation

### CDN (Recommended)

```html
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.15.3/dist/cdn.min.js"></script>
```

### npm

```bash
npm install alpinejs
```

```javascript
import Alpine from 'alpinejs';
window.Alpine = Alpine;
Alpine.start();
```

---

## ⚡ Quick Start

```html
<div x-data="{ open: false }">
  <button @click="open = !open">Toggle</button>
  <div x-show="open">Hello Alpine!</div>
</div>
```

---

## 🔧 Common Patterns

### Pattern 1: Dropdown Menu

```html
<div x-data="{ open: false }" @click.away="open = false">
  <button @click="open = !open">Menu</button>
  <div x-show="open" x-transition>
    <a href="#">Item 1</a>
    <a href="#">Item 2</a>
  </div>
</div>
```

### Pattern 2: Modal Dialog

```html
<div x-data="{ modalOpen: false }">
  <button @click="modalOpen = true">Open Modal</button>

  <div x-show="modalOpen" @click.self="modalOpen = false"
       class="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div class="bg-white p-6 rounded">
      <h2>Modal Title</h2>
      <button @click="modalOpen = false">Close</button>
    </div>
  </div>
</div>
```

### Pattern 3: Tabs

```html
<div x-data="{ tab: 'one' }">
  <button @click="tab = 'one'" :class="{ 'active': tab === 'one' }">Tab 1</button>
  <button @click="tab = 'two'" :class="{ 'active': tab === 'two' }">Tab 2</button>

  <div x-show="tab === 'one'">Content 1</div>
  <div x-show="tab === 'two'">Content 2</div>
</div>
```

### Pattern 4: Form Binding

```html
<div x-data="{ email: '', valid: false }">
  <input type="email" x-model="email"
         @input="valid = email.includes('@')">
  <span x-show="!valid && email" class="error">Invalid email</span>
  <button :disabled="!valid">Submit</button>
</div>
```

### Pattern 5: Loop with x-for

```html
<div x-data="{ items: ['Apple', 'Banana', 'Cherry'] }">
  <template x-for="item in items" :key="item">
    <div x-text="item"></div>
  </template>
</div>
```

---

## 📱 Mobile Considerations

### Touch Support
- ✅ Works perfectly on touch devices
- ✅ Lightweight - ideal for mobile (6kb gzipped)
- ⚠️ Use `@touchstart` for touch-specific events

### iOS/Android
- No special considerations needed
- Falls back gracefully if JS disabled

---

## 🐛 Common Gotchas

### Issue 1: Missing x-data Scope
```html
<!-- ❌ Wrong - no x-data parent -->
<button @click="count++">Click</button>

<!-- ✅ Correct -->
<div x-data="{ count: 0 }">
  <button @click="count++">Click</button>
</div>
```

### Issue 2: x-if Requires Template Tag
```html
<!-- ❌ Wrong -->
<div x-if="show">Content</div>

<!-- ✅ Correct -->
<template x-if="show">
  <div>Content</div>
</template>
```

### Issue 3: x-show vs x-if
```html
<!-- x-show: toggles display CSS (element stays in DOM) -->
<div x-show="open">Fast toggle</div>

<!-- x-if: adds/removes from DOM (better for heavy content) -->
<template x-if="open">
  <div>Heavy component</div>
</template>
```

### Issue 4: Script Without defer
```html
<!-- ❌ Wrong -->
<script src="alpine.js"></script>

<!-- ✅ Correct - defer ensures DOM is ready -->
<script defer src="alpine.js"></script>
```

### Issue 5: Flash of Unstyled Content
```html
<style>[x-cloak] { display: none !important; }</style>
<div x-data x-cloak>
  <!-- Hidden until Alpine initializes -->
</div>
```

---

## 💡 Pro Tips

- Use `x-show` for frequent toggles, `x-if` for conditional heavy content
- Always add `:key` to `x-for` loops
- Use `@click.away` for closing dropdowns
- Use `x-transition` for smooth show/hide animations
- Combine with htmx for server communication

---

## 🔗 Resources

- [Official Documentation](https://alpinejs.dev/)
- [GitHub Repository](https://github.com/alpinejs/alpine)
- [npm Package](https://www.npmjs.com/package/alpinejs)

---

## 📊 Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 90+ | Full support |
| Firefox | 88+ | Full support |
| Safari | 14+ | Full support |
| Edge | 90+ | Full support |
| iOS Safari | 10+ | Full support |
| IE11 | ❌ | Not supported (needs Proxy) |

---

## 🆚 Alternatives

- **Vue.js**: Full SPA framework, more features but larger
- **htmx**: Server-driven, HTML-over-the-wire approach
- **Petite-Vue**: Even smaller Vue-like alternative

---

## ⚠️ Breaking Changes

### v2.x → v3.x
- `x-spread` replaced with `x-bind` object syntax
- `$el` now refers to current element
- Global `Alpine.data()` for reusable components

---

**Last Updated:** 2024-12-19
**Verified Version:** 3.14.1
