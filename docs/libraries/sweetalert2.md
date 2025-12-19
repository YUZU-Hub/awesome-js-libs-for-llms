# SweetAlert2

> Beautiful, responsive, customizable popup boxes

**Version:** 11.26.10
**Category:** ui-components
**Bundle Size:** 36 kb (minified) / 17 kb (gzipped)
**Dependencies:** None

---

## 🎯 What It Does

SweetAlert2 creates beautiful popup boxes to replace native `alert()`, `confirm()`, and `prompt()` dialogs. It supports icons, HTML content, async operations, and input types with a promise-based API.

**Best for:**
- Confirmation dialogs before destructive actions
- Success/error feedback after operations
- Toast notifications for non-blocking alerts
- User input collection in popup modals
- Loading states during async operations

**Not suitable for:**
- Complex multi-step forms (use real modals)
- Heavy interactive content (use dedicated modals)
- Frequent notifications (may feel intrusive)

---

## 📦 Installation

### CDN (Recommended)

```html
<!-- All-in-one (CSS + JS) -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.26.10/dist/sweetalert2.all.min.js"></script>

<!-- Or separate files -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.26.10/dist/sweetalert2.min.css">
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.26.10/dist/sweetalert2.min.js"></script>
```

### npm

```bash
npm install sweetalert2
```

```javascript
import Swal from 'sweetalert2';
```

---

## ⚡ Quick Start

### Basic Alert

```javascript
// Simple alert
Swal.fire('Hello world!');

// With title and text
Swal.fire('Success!', 'Your file has been saved', 'success');

// With icon types: 'success', 'error', 'warning', 'info', 'question'
Swal.fire({
  icon: 'success',
  title: 'Done!',
  text: 'Operation completed successfully'
});
```

### Expected Output

A centered modal with title, text, and icon appears. User clicks OK to dismiss.

---

## 🔧 Common Patterns

### Pattern 1: Confirmation Dialog

```javascript
Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!',
  cancelButtonText: 'Cancel'
}).then((result) => {
  if (result.isConfirmed) {
    // User clicked confirm
    Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
  }
});
```

**When to use:** Before destructive actions like delete, logout, form reset

### Pattern 2: Input Prompts

```javascript
// Text input
const { value: name } = await Swal.fire({
  title: 'Enter your name',
  input: 'text',
  inputPlaceholder: 'Your name',
  inputValidator: (value) => {
    if (!value) return 'Name is required!';
  }
});

// Email input with validation
const { value: email } = await Swal.fire({
  title: 'Enter email',
  input: 'email',
  inputPlaceholder: 'your@email.com'
});

// Select dropdown
const { value: color } = await Swal.fire({
  title: 'Select color',
  input: 'select',
  inputOptions: { red: 'Red', blue: 'Blue', green: 'Green' },
  inputPlaceholder: 'Choose a color'
});
```

**When to use:** Collecting single values, quick user input, inline forms

### Pattern 3: Toast Notifications

```javascript
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

// Use the toast
Toast.fire({ icon: 'success', title: 'Signed in successfully' });
Toast.fire({ icon: 'error', title: 'Login failed' });
```

**When to use:** Non-blocking notifications, auto-dismiss messages

### Pattern 4: Loading State

```javascript
Swal.fire({
  title: 'Saving...',
  text: 'Please wait',
  allowOutsideClick: false,
  allowEscapeKey: false,
  didOpen: () => {
    Swal.showLoading();
  }
});

// After async operation completes
await saveData();
Swal.close();

// Or show success
Swal.fire('Saved!', 'Data saved successfully', 'success');
```

**When to use:** During API calls, file uploads, long-running operations

### Pattern 5: Custom HTML Content

```javascript
Swal.fire({
  title: '<strong>HTML <u>example</u></strong>',
  icon: 'info',
  html: `
    You can use <b>bold</b>, <a href="#">links</a>,
    and other HTML tags
  `,
  showCloseButton: true,
  showCancelButton: true,
  focusConfirm: false,
  confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
  cancelButtonText: '<i class="fa fa-thumbs-down"></i> Cancel'
});
```

**When to use:** Rich content alerts, styled messages, inline actions

---

## 📱 Mobile Considerations

### Touch Support
- ✅ Fully responsive out of the box
- ✅ Large touch-friendly buttons
- ✅ Handles virtual keyboard correctly
- ✅ Prevents body scrolling when open

### Responsive Behavior

```javascript
// Mobile-optimized configuration
Swal.fire({
  title: 'Mobile Friendly',
  width: '90%',        // Responsive width
  padding: '1em',      // Comfortable padding
  grow: 'row',         // Grow horizontally on mobile
  heightAuto: true,    // Auto height
  scrollbarPadding: false
});
```

### iOS/Android Gotchas
- **Virtual keyboard**: Input auto-focus can cause scroll jump - use `focusConfirm: false` if needed
- **Position fixed**: Works correctly, tested on mobile Safari
- **Orientation change**: Automatically adjusts layout
- **Notch handling**: Uses safe-area-inset for proper spacing

---

## 🐛 Common Gotchas

### Issue 1: Wrong Result Checking

```javascript
// ❌ Wrong - truthy check fails for cancel
.then((result) => {
  if (result) { /* Always true */ }
});

// ✅ Correct - check isConfirmed
.then((result) => {
  if (result.isConfirmed) {
    // User clicked confirm
  } else if (result.isDismissed) {
    // User clicked cancel, backdrop, or pressed ESC
  }
});
```

### Issue 2: Forgetting CSS

```html
<!-- ❌ Wrong - JS only, no styles -->
<script src="sweetalert2.min.js"></script>

<!-- ✅ Correct - use all-in-one or include CSS -->
<script src="sweetalert2.all.min.js"></script>
<!-- OR -->
<link rel="stylesheet" href="sweetalert2.min.css">
<script src="sweetalert2.min.js"></script>
```

### Issue 3: Async/Await Without Try-Catch

```javascript
// ❌ Wrong - unhandled rejection possible
const { value } = await Swal.fire({ input: 'text' });

// ✅ Correct - handle dismissal
const result = await Swal.fire({ input: 'text' });
if (result.isConfirmed && result.value) {
  console.log('User entered:', result.value);
}
```

### Issue 4: XSS with User Content

```javascript
// ❌ Wrong - XSS vulnerable
Swal.fire({ html: userInput });

// ✅ Correct - use text property (auto-escaped)
Swal.fire({ text: userInput });

// ✅ Or sanitize HTML yourself
Swal.fire({ html: DOMPurify.sanitize(userInput) });
```

### Issue 5: Multiple Alerts Stacking

```javascript
// ❌ Wrong - second alert closes first
Swal.fire('Alert 1');
Swal.fire('Alert 2'); // Replaces Alert 1

// ✅ Correct - chain alerts
Swal.fire('Alert 1').then(() => {
  Swal.fire('Alert 2');
});
```

---

## 💡 Pro Tips

- **Use `Swal.mixin()`** to create reusable configurations (toasts, branded alerts)
- **Check `result.dismiss`** to know why alert was closed (backdrop, esc, cancel, timer)
- **Use `preConfirm`** to run async validation before closing
- **Set `allowOutsideClick: false`** for critical confirmations
- **Use `timerProgressBar`** with `timer` to show countdown
- **Customize with CSS**: Override `.swal2-*` classes for branding

---

## 🔗 Resources

- [Official Documentation](https://sweetalert2.github.io/)
- [GitHub Repository](https://github.com/sweetalert2/sweetalert2)
- [npm Package](https://www.npmjs.com/package/sweetalert2)
- [Recipe Collection](https://sweetalert2.github.io/recipe-gallery/)

---

## 📊 Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 60+ | Full support |
| Firefox | 55+ | Full support |
| Safari | 10+ | Full support |
| Edge | 79+ | Full support |
| iOS Safari | 10+ | Full support |
| Android Chrome | 60+ | Full support |

**Note:** IE11 not supported (requires ES6)

---

## 🆚 Alternatives

When to consider other libraries:
- **Native dialogs**: `alert()`, `confirm()`, `prompt()` - Zero bytes but ugly
- **Toastify-js**: Smaller (6kb), but only toast notifications
- **Bootstrap Modals**: If already using Bootstrap, might be lighter
- **HTML `<dialog>`**: Native element, but limited styling support

---

## ⚠️ Breaking Changes

### v10.x → v11.x
- `Swal.isVisible()` renamed to `Swal.isLoading()`
- Some CSS class names changed
- Minor API adjustments

### v9.x → v10.x
- `onOpen` renamed to `didOpen`
- `onClose` renamed to `didClose`
- `onBeforeOpen` renamed to `willOpen`
- `onDestroy` renamed to `didDestroy`

---

**Last Updated:** 2024-12-19
**Verified Version:** 11.14.5
