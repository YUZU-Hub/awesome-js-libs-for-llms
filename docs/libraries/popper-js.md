# Popper.js

> Tooltip and popover positioning engine

**Version:** 2.11.8
**Category:** ui-positioning
**Bundle Size:** 7 kb (minified) / 3 kb (gzipped)
**Dependencies:** None

---

## 🎯 What It Does

Popper.js is a positioning engine that intelligently places tooltips, popovers, and dropdowns relative to reference elements. It automatically handles viewport boundaries, prevents overflow, and adjusts placement dynamically. Note: Floating UI is the modern successor (Popper v3) with improved features.

**Best for:**
- Tooltips that adapt to screen edges
- Dropdown menus with smart positioning
- Popovers that avoid viewport overflow
- Custom positioned UI elements (date pickers, context menus)

**Not suitable for:**
- Modal dialogs (use native dialog or modals libraries)
- Fixed position elements (use CSS)
- Complex layout systems (use CSS Grid/Flexbox)

---

## 📦 Installation

### CDN (Recommended)

```html
<!-- Core Library -->
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></script>
```

### npm

```bash
npm install @popperjs/core
```

---

## ⚡ Quick Start

### Basic Tooltip

```html
<button id="myButton">Hover me</button>
<div id="tooltip" role="tooltip" style="display: none; background: #333; color: white; padding: 8px; border-radius: 4px;">
  I'm a tooltip!
  <div id="arrow" data-popper-arrow style="position: absolute;"></div>
</div>
```

```javascript
const button = document.querySelector('#myButton');
const tooltip = document.querySelector('#tooltip');

// Create Popper instance
const popperInstance = Popper.createPopper(button, tooltip, {
  placement: 'top',
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 8], // [skidding, distance]
      },
    },
  ],
});

// Show/hide on hover
button.addEventListener('mouseenter', () => {
  tooltip.style.display = 'block';
  popperInstance.update(); // Recalculate position
});

button.addEventListener('mouseleave', () => {
  tooltip.style.display = 'none';
});
```

### Expected Output

Tooltip appears above the button with automatic positioning adjustments if near screen edges. Arrow points to the button.

---

## 🔧 Common Patterns

### Pattern 1: Dropdown Menu

```javascript
const trigger = document.querySelector('#dropdown-trigger');
const menu = document.querySelector('#dropdown-menu');

const popperInstance = Popper.createPopper(trigger, menu, {
  placement: 'bottom-start', // Align to left edge
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 4],
      },
    },
    {
      name: 'preventOverflow',
      options: {
        boundary: 'viewport', // Stay within viewport
      },
    },
  ],
});

trigger.addEventListener('click', () => {
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  if (menu.style.display === 'block') {
    popperInstance.update();
  }
});

// Close when clicking outside
document.addEventListener('click', (e) => {
  if (!trigger.contains(e.target) && !menu.contains(e.target)) {
    menu.style.display = 'none';
  }
});
```

**When to use:** Navigation menus, select dropdowns, action menus

### Pattern 2: All Available Placements

```javascript
// 12 placement options
const placements = [
  'top', 'top-start', 'top-end',
  'bottom', 'bottom-start', 'bottom-end',
  'left', 'left-start', 'left-end',
  'right', 'right-start', 'right-end'
];

const popper = Popper.createPopper(reference, element, {
  placement: 'auto', // Automatically choose best placement
  modifiers: [
    {
      name: 'flip',
      options: {
        fallbackPlacements: ['top', 'bottom', 'right'], // Try these if first fails
      },
    },
  ],
});
```

**When to use:** When you need flexibility for different screen sizes

### Pattern 3: Dynamic Content Updates

```javascript
const popper = Popper.createPopper(reference, tooltip, {
  placement: 'right',
});

// Update content dynamically
async function updateTooltipContent() {
  tooltip.textContent = 'New content with different size';
  await popper.update(); // Recalculate after content changes
}

// Or use forceUpdate for immediate recalculation
popper.forceUpdate();
```

**When to use:** Loading dynamic content, changing tooltip text, responsive updates

### Pattern 4: Custom Modifiers Configuration

```javascript
const popper = Popper.createPopper(reference, tooltip, {
  placement: 'top',
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 10], // 10px distance from reference
      },
    },
    {
      name: 'preventOverflow',
      options: {
        padding: 8, // 8px from viewport edge
        boundary: document.querySelector('#container'), // Custom boundary
      },
    },
    {
      name: 'arrow',
      options: {
        padding: 5, // 5px from popper edges
      },
    },
    {
      name: 'flip',
      enabled: true, // Auto-flip when no space
    },
  ],
});
```

**When to use:** Fine-tuned positioning control, custom boundaries

### Pattern 5: Performance - Destroy When Done

```javascript
const popper = Popper.createPopper(reference, tooltip);

// Clean up to prevent memory leaks
function hideAndDestroy() {
  tooltip.style.display = 'none';
  popper.destroy(); // Remove event listeners and cleanup
}

// Recreate when needed again
function showAgain() {
  tooltip.style.display = 'block';
  const newPopper = Popper.createPopper(reference, tooltip, options);
}
```

**When to use:** Single-use tooltips, cleanup on component unmount

---

## 📱 Mobile Considerations

### Touch Support
- ✅ Works with touch events
- ⚠️ No hover state on mobile - use click/tap events
- ✅ Handles orientation changes automatically

### Responsive Behavior

```javascript
// Mobile-friendly configuration
const popper = Popper.createPopper(reference, tooltip, {
  placement: 'auto', // Let Popper decide best placement
  modifiers: [
    {
      name: 'preventOverflow',
      options: {
        padding: 16, // More padding on mobile for finger access
      },
    },
    {
      name: 'computeStyles',
      options: {
        adaptive: true, // Adjust for virtual keyboard
      },
    },
  ],
});

// Handle touch events
reference.addEventListener('touchstart', (e) => {
  e.preventDefault();
  tooltip.style.display = 'block';
  popper.update();
});
```

### iOS/Android Gotchas

- **Viewport Meta**: Ensure `<meta name="viewport" content="width=device-width">` is set
- **Touch Targets**: Keep tooltips at least 44x44px for accessibility
- **Virtual Keyboard**: Use `adaptive: true` to adjust when keyboard appears
- **Scroll Events**: Popper auto-updates on scroll, but consider disabling on mobile for performance

---

## 🐛 Common Gotchas

### Issue 1: Reference Element Must Be Positioned

**Problem:** Popper doesn't position correctly when reference element isn't rendered or has no dimensions
**Solution:** Ensure reference element is visible and has dimensions

```javascript
// ❌ Wrong - element not in DOM yet
const popper = Popper.createPopper(notYetRendered, tooltip);

// ✅ Correct - wait for element to render
const reference = document.querySelector('#myElement');
if (reference && reference.offsetParent !== null) {
  const popper = Popper.createPopper(reference, tooltip);
}
```

### Issue 2: Forgetting to Update After Content Changes

**Problem:** Popper position wrong after tooltip content size changes
**Solution:** Call `update()` after changing content

```javascript
// ❌ Wrong
tooltip.textContent = 'Much longer text that changes size';

// ✅ Correct
tooltip.textContent = 'Much longer text that changes size';
popper.update(); // Recalculate position
```

### Issue 3: Not Destroying Instances

**Problem:** Memory leaks from abandoned Popper instances
**Solution:** Always destroy when removing elements

```javascript
// ✅ Correct cleanup
function removeTooltip() {
  popper.destroy(); // Remove listeners first
  tooltip.remove(); // Then remove element
}
```

### Issue 4: Arrow Not Positioning

**Problem:** Arrow element doesn't position correctly
**Solution:** Must have `data-popper-arrow` attribute and specific styles

```javascript
// ✅ Correct arrow setup
<div id="arrow" data-popper-arrow style="position: absolute;"></div>

// CSS for arrow styling
#arrow::before {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;
  transform: rotate(45deg);
}
```

### Issue 5: Placement Not Honored

**Problem:** Popper ignores specified placement
**Solution:** Check if `flip` modifier is enabled (it's on by default)

```javascript
// Disable flip to force specific placement
const popper = Popper.createPopper(reference, tooltip, {
  placement: 'top',
  modifiers: [
    {
      name: 'flip',
      enabled: false, // Force top placement even if no space
    },
  ],
});
```

---

## 💡 Pro Tips

- **Use `placement: 'auto'`** for most cases - Popper picks the best spot
- **Disable unused modifiers** for better performance on low-end devices
- **Lazy initialization** - Create Popper only when needed, not on page load
- **Virtual elements** - You can use `getBoundingClientRect()` object instead of DOM element
- **Check `data-popper-placement`** attribute on tooltip to know actual placement chosen
- **Use `strategy: 'fixed'`** for better performance with scrolling containers

---

## 🔗 Resources

- [Official Documentation](https://popper.js.org/)
- [GitHub Repository](https://github.com/floating-ui/floating-ui/tree/v2.x)
- [npm Package](https://www.npmjs.com/package/@popperjs/core)
- [Floating UI (Successor)](https://floating-ui.com/) - Modern replacement with better features
- [Migration Guide](https://floating-ui.com/docs/migration)

---

## 📊 Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 84+ | Full support |
| Firefox | 78+ | Full support |
| Safari | 13.1+ | Full support |
| Edge | 84+ | Full support |
| iOS Safari | 13.4+ | Full support |
| Android Chrome | 84+ | Full support |

**Note:** Requires `ResizeObserver` API. Older browsers need polyfill.

---

## 🆚 Alternatives

When to consider other libraries:
- **Floating UI**: Modern successor to Popper.js with better API, tree-shaking, and React/Vue support - use for new projects
- **Tippy.js**: Higher-level library built on Popper with animations and themes included
- **Tooltip.js**: Bootstrap's tooltip implementation (also uses Popper internally)
- **Pure CSS**: For simple static tooltips without dynamic positioning
- **Tether**: Older alternative, but less maintained

---

## ⚠️ Breaking Changes

### Popper v1 → v2 (v2.11.8)

**Major Changes:**
- Renamed from `popper.js` to `@popperjs/core`
- New modifier system (v1 modifiers need rewrite)
- `onCreate` and `onUpdate` callbacks removed (use `update()` method)
- Arrow positioning changed - now requires `data-popper-arrow` attribute
- No jQuery dependency removal (never had one)

**Migration:**
```javascript
// v1 syntax
new Popper(reference, popper, {
  onCreate: (data) => console.log(data),
  modifiers: { offset: { offset: '0,10' } }
});

// v2 syntax
Popper.createPopper(reference, popper, {
  modifiers: [
    {
      name: 'offset',
      options: { offset: [0, 10] }
    }
  ]
});
// Use popper.update() instead of onCreate callback
```

### Future: Popper v2 → Floating UI (v3)

- Floating UI is the official successor
- Better tree-shaking (import only what you need)
- Framework-specific packages (React, Vue, Svelte)
- Improved virtual element support
- Migration guide: https://floating-ui.com/docs/migration

---

**Last Updated:** 2024-12-19
**Verified Version:** 2.11.8
