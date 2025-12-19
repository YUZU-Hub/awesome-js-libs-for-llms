# jQuery

> Fast, small, feature-rich JavaScript library for DOM manipulation

**Version:** 3.7.1
**Category:** utilities
**Bundle Size:** 87.6 kb (minified) / 30.1 kb (gzipped)
**Dependencies:** None

---

## 🎯 What It Does

jQuery simplifies DOM manipulation, event handling, and AJAX requests with a concise API that works across browsers. It pioneered the `$` selector pattern.

**Best for:**
- Legacy codebases already using jQuery
- Quick DOM manipulation and event handling
- AJAX requests with simple syntax
- Plugin ecosystem (DataTables, jQuery UI)

**Not suitable for:**
- Modern SPAs (use React, Vue, or Angular)
- Performance-critical applications
- New projects targeting modern browsers only

---

## 📦 Installation

### CDN (Recommended)

```html
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<!-- Slim version (no AJAX/effects) - 24kb gzipped -->
<script src="https://code.jquery.com/jquery-3.7.1.slim.min.js"></script>
```

### npm

```bash
npm install jquery
```

---

## ⚡ Quick Start

```html
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script>
$(function() {
  // DOM ready
  $('#myButton').on('click', function() {
    $('.content').toggle();
  });
});
</script>
```

---

## 🔧 Common Patterns

### Pattern 1: DOM Selection & Manipulation

```javascript
// Select and modify
$('#element').html('<p>New content</p>');
$('.items').addClass('active').css('color', 'blue');
$('[data-id]').attr('data-loaded', 'true');

// Traversal
$('#parent').find('.child');
$('.item').closest('.container');
$('.item').siblings().first();
```

### Pattern 2: Event Handling

```javascript
// Click with delegation (works for dynamic elements)
$(document).on('click', '.dynamic-btn', function(e) {
  e.preventDefault();
  $(this).addClass('clicked');
});

// Multiple events
$('#input').on('focus blur', function() {
  $(this).toggleClass('active');
});
```

### Pattern 3: AJAX Requests

```javascript
$.ajax({
  url: '/api/data',
  method: 'POST',
  data: { name: 'John' },
  success: function(response) {
    console.log(response);
  },
  error: function(xhr, status, error) {
    console.error(error);
  }
});

// Shorthand
$.get('/api/users', function(data) { });
$.post('/api/save', { name: 'Jane' });
$.getJSON('/api/data.json', function(json) { });
```

### Pattern 4: Animations

```javascript
$('#element').fadeIn(300);
$('#element').slideToggle();
$('#element').animate({ opacity: 0.5, left: '50px' }, 400);
```

---

## 📱 Mobile Considerations

### Touch Support
- ✅ Works on mobile browsers
- ⚠️ Use `.on('touchstart')` for touch-specific events
- ⚠️ Consider slim build for smaller bundle

### Performance
- Cache selectors: `const $list = $('#list');`
- Minimize DOM queries in loops
- Use event delegation for dynamic content

---

## 🐛 Common Gotchas

### Issue 1: Code Runs Before DOM Ready
```javascript
// ❌ Wrong - DOM not ready
$('#element').text('Hello');

// ✅ Correct
$(function() {
  $('#element').text('Hello');
});
```

### Issue 2: Arrow Functions Lose `this`
```javascript
// ❌ Wrong - this is window
$('.btn').on('click', () => {
  $(this).addClass('active');
});

// ✅ Correct
$('.btn').on('click', function() {
  $(this).addClass('active');
});
```

### Issue 3: Checking Element Exists
```javascript
// ❌ Wrong - always truthy
if ($('#element')) { }

// ✅ Correct
if ($('#element').length) { }
```

### Issue 4: Dynamic Elements Don't Respond
```javascript
// ❌ Wrong - won't work for elements added later
$('.dynamic').on('click', handler);

// ✅ Correct - event delegation
$(document).on('click', '.dynamic', handler);
```

---

## 💡 Pro Tips

- Cache jQuery objects: `const $el = $('#el');` then reuse `$el`
- Chain methods: `$('#el').addClass('a').removeClass('b').show()`
- Use `.prop()` for boolean attributes, `.attr()` for others
- Prefer `.on()` over `.click()` for consistency

---

## 🔗 Resources

- [Official Documentation](https://api.jquery.com/)
- [GitHub Repository](https://github.com/jquery/jquery)
- [npm Package](https://www.npmjs.com/package/jquery)
- [Learning Center](https://learn.jquery.com/)

---

## 📊 Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 90+ | Full support |
| Firefox | 88+ | Full support |
| Safari | 14+ | Full support |
| Edge | 90+ | Full support |
| iOS Safari | 14+ | Full support |
| IE | 9+ | jQuery 3.x (IE11 only) |

---

## 🆚 Alternatives

- **Vanilla JS**: Modern browsers have `querySelector`, `fetch`, `classList`
- **Cash**: 6kb jQuery alternative with similar API
- **Zepto**: Lightweight jQuery-compatible library

---

## ⚠️ Breaking Changes

### v2.x → v3.x
- Dropped IE8 support
- `.andSelf()` removed (use `.addBack()`)
- Deferred objects now Promises/A+ compliant

---

**Last Updated:** 2024-12-19
**Verified Version:** 3.7.1
