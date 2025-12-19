# Bootstrap

> Mobile-first CSS framework with responsive components

**Version:** 5.3.8
**Category:** ui-framework
**Bundle Size:** 27 kb CSS + 16 kb JS (minified+gzipped)
**Dependencies:** Popper.js (included in bundle)

---

## 🎯 What It Does

Bootstrap provides a responsive grid system, pre-built components, and utility classes for rapid UI development. It's mobile-first and includes JavaScript components for interactive elements.

**Best for:**
- Rapid prototyping and MVPs
- Admin dashboards and web apps
- Consistent, professional-looking UIs
- Teams needing quick, battle-tested components

**Not suitable for:**
- Highly custom designs (consider Tailwind)
- Performance-critical sites (large bundle)
- Projects needing minimal CSS footprint

---

## 📦 Installation

### CDN (Recommended)

```html
<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- JS (includes Popper) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
```

### npm

```bash
npm install bootstrap@5.3.8
```

---

## ⚡ Quick Start

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container">
    <h1>Hello, Bootstrap!</h1>
    <button class="btn btn-primary">Click me</button>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

**Required:** viewport meta tag for responsive behavior.

---

## 🔧 Common Patterns

### Pattern 1: Responsive Grid

```html
<div class="container">
  <div class="row">
    <div class="col-12 col-md-8">Main content (full on mobile, 8 cols on tablet+)</div>
    <div class="col-12 col-md-4">Sidebar</div>
  </div>
</div>

<!-- Equal columns -->
<div class="row">
  <div class="col">1 of 3</div>
  <div class="col">2 of 3</div>
  <div class="col">3 of 3</div>
</div>
```

**Breakpoints:** xs (<576px), sm (≥576px), md (≥768px), lg (≥992px), xl (≥1200px), xxl (≥1400px)

### Pattern 2: Navbar

```html
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Logo</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Features</a></li>
      </ul>
    </div>
  </div>
</nav>
```

### Pattern 3: Cards

```html
<div class="card" style="width: 18rem;">
  <img src="image.jpg" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card Title</h5>
    <p class="card-text">Some description text.</p>
    <a href="#" class="btn btn-primary">Action</a>
  </div>
</div>
```

### Pattern 4: Modal

```html
<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
  Open Modal
</button>

<div class="modal fade" id="myModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal Title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">Modal content here</div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button class="btn btn-primary">Save</button>
      </div>
    </div>
  </div>
</div>
```

### Pattern 5: Utility Classes

```html
<!-- Spacing: {property}{sides}-{size} -->
<div class="mt-3">Margin-top: 1rem</div>
<div class="px-4">Padding x-axis: 1.5rem</div>
<div class="mb-5">Margin-bottom: 3rem</div>

<!-- Flexbox -->
<div class="d-flex justify-content-between align-items-center">
  <div>Left</div>
  <div>Right</div>
</div>

<!-- Display -->
<div class="d-none d-md-block">Hidden on mobile, visible on tablet+</div>

<!-- Text -->
<p class="text-center text-primary fw-bold">Centered blue bold text</p>
```

**Spacing sizes:** 0, 1 (0.25rem), 2 (0.5rem), 3 (1rem), 4 (1.5rem), 5 (3rem)

---

## 📱 Mobile Considerations

### Touch Support
- ✅ Mobile-first design - base styles for mobile
- ✅ Touch-friendly button/link sizes
- ✅ Responsive images with `.img-fluid`
- ✅ Collapsible navbar for mobile

### Responsive Pattern
```html
<!-- Stack on mobile, side-by-side on tablet+ -->
<div class="row">
  <div class="col-12 col-md-6">Column 1</div>
  <div class="col-12 col-md-6">Column 2</div>
</div>
```

---

## 🐛 Common Gotchas

### Issue 1: Missing Viewport Meta
```html
<!-- ❌ Wrong - responsive won't work -->
<head>...</head>

<!-- ✅ Correct -->
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
```

### Issue 2: Grid Outside Container
```html
<!-- ❌ Wrong -->
<div class="row">...</div>

<!-- ✅ Correct -->
<div class="container">
  <div class="row">...</div>
</div>
```

### Issue 3: JS Components Not Working
```html
<!-- ❌ Wrong - missing JS -->
<button data-bs-toggle="modal">Open</button>

<!-- ✅ Correct - include bundle.min.js -->
<script src="bootstrap.bundle.min.js"></script>
```

### Issue 4: Columns Don't Add to 12
```html
<!-- ❌ Wrong - adds to 13 -->
<div class="col-8"></div>
<div class="col-5"></div>

<!-- ✅ Correct - adds to 12 -->
<div class="col-8"></div>
<div class="col-4"></div>
```

---

## 💡 Pro Tips

- Use `.container-fluid` for full-width, `.container` for centered max-width
- Combine utilities: `class="d-flex justify-content-center align-items-center"`
- Use `data-bs-*` attributes for JS components (no custom JS needed)
- Override variables with Sass for theming, not raw CSS
- Use `.visually-hidden` for accessibility, not `display: none`

---

## 🔗 Resources

- [Official Documentation](https://getbootstrap.com/docs/5.3/)
- [GitHub Repository](https://github.com/twbs/bootstrap)
- [npm Package](https://www.npmjs.com/package/bootstrap)
- [Examples](https://getbootstrap.com/docs/5.3/examples/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)

---

## 📊 Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 60+ | Full support |
| Firefox | 60+ | Full support |
| Safari | 12+ | Full support |
| Edge | 79+ | Full support |
| iOS Safari | 12+ | Full support |
| IE | ❌ | Not supported |

---

## 🆚 Alternatives

- **Tailwind CSS**: Utility-first, smaller bundle with PurgeCSS, more customizable
- **Bulma**: Similar component approach, no JavaScript
- **Foundation**: More complex grid options

---

## ⚠️ Breaking Changes

### v4.x → v5.x
- Dropped jQuery dependency
- Renamed `.ml-*`/`.mr-*` to `.ms-*`/`.me-*` (start/end for RTL)
- `data-*` attributes changed to `data-bs-*`
- Dropped IE support

---

**Last Updated:** 2024-12-19
**Verified Version:** 5.3.8
