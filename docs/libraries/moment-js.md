# Moment.js

> Date parsing, validation, manipulation, and formatting library

**Version:** 2.30.1
**Category:** date-time
**Bundle Size:** 71.2 kb (minified) / 18.3 kb (gzipped)
**Dependencies:** None

---

## 🎯 What It Does

Moment.js is a comprehensive date and time library that provides parsing, validation, manipulation, and formatting of dates. It handles timezones, localization, relative time, and calendar formatting with a chainable API.

**Best for:**
- Parsing dates from multiple formats
- Formatting dates for display
- Date math (add/subtract days, months, years)
- Relative time ("2 hours ago", "in 3 days")
- Calendar time ("Today at 2:30 PM", "Last Monday")

**Not suitable for:**
- New projects (library is in maintenance mode - use date-fns or Day.js instead)
- Performance-critical applications (large bundle size)
- Tree-shaking optimization (imports entire library)

---

## ⚠️ Important Notice

**Moment.js is in maintenance mode** (as of September 2020). The team recommends using alternatives for new projects:
- **date-fns** - Modular, tree-shakeable, 2kb per function
- **Day.js** - 2kb Moment.js-compatible API
- **Luxon** - Modern, timezone-aware, 17kb
- **Native Intl** - Built-in browser API for formatting

Use Moment.js only for:
- Maintaining existing projects already using it
- Quick prototypes and demos
- Compatibility with libraries that depend on it

---

## 📦 Installation

### CDN (Recommended)

```html
<!-- Core library -->
<script src="https://cdn.jsdelivr.net/npm/moment@2.30.1/moment.min.js"></script>

<!-- With timezone support (optional, +50kb) -->
<script src="https://cdn.jsdelivr.net/npm/moment-timezone@0.5.45/moment-timezone-with-data.min.js"></script>
```

### npm

```bash
npm install moment
```

```javascript
// ES6 import
import moment from 'moment';

// CommonJS
const moment = require('moment');
```

---

## ⚡ Quick Start

### Basic Usage

```javascript
// Current date and time
const now = moment();

// Parse a date
const date = moment('2025-12-25');

// Format a date
console.log(now.format('YYYY-MM-DD')); // "2025-12-19"
console.log(now.format('MMMM Do YYYY, h:mm:ss a')); // "December 19th 2025, 3:45:23 pm"

// Relative time
console.log(now.fromNow()); // "a few seconds ago"
console.log(moment('2025-12-25').fromNow()); // "in 6 days"
```

### Expected Output
Moment objects are mutable and chainable. Format returns a string, manipulation methods modify the object in place.

---

## 🔧 Common Patterns

### Pattern 1: Parsing Dates

```javascript
// ISO 8601 string (recommended)
moment('2025-12-19'); // December 19, 2025
moment('2025-12-19T14:30:00'); // With time

// Custom format (specify format for reliability)
moment('12-25-2025', 'MM-DD-YYYY');
moment('25/12/2025', 'DD/MM/YYYY');
moment('December 25th 2025', 'MMMM Do YYYY');

// Multiple formats (tries in order)
moment('12-25-2025', ['MM-DD-YYYY', 'DD-MM-YYYY']);

// Unix timestamp
moment(1703001600000); // Milliseconds
moment.unix(1703001600); // Seconds

// JavaScript Date object
moment(new Date());

// Validation
const date = moment('invalid-date', 'YYYY-MM-DD');
if (!date.isValid()) {
  console.error('Invalid date');
}
```

**When to use:** Converting user input, API responses, or database dates into Moment objects

### Pattern 2: Formatting Dates

```javascript
const date = moment('2025-12-25 14:30:00');

// Common formats
date.format('YYYY-MM-DD'); // "2025-12-25"
date.format('MM/DD/YYYY'); // "12/25/2025"
date.format('DD MMM YYYY'); // "25 Dec 2025"
date.format('MMMM Do, YYYY'); // "December 25th, 2025"

// With time
date.format('h:mm A'); // "2:30 PM"
date.format('HH:mm:ss'); // "14:30:00"
date.format('YYYY-MM-DD HH:mm:ss'); // "2025-12-25 14:30:00"

// Localized
date.format('LLL'); // "December 25, 2025 2:30 PM"
date.format('llll'); // "Thu, Dec 25, 2025 2:30 PM"

// ISO 8601
date.toISOString(); // "2025-12-25T14:30:00.000Z"

// Unix timestamp
date.valueOf(); // 1735137000000 (milliseconds)
date.unix(); // 1735137000 (seconds)
```

**When to use:** Displaying dates to users, sending dates to APIs, storing in databases

### Pattern 3: Date Manipulation

```javascript
const now = moment();

// Add time (creates new moment - original unchanged)
const tomorrow = moment().add(1, 'days');
const nextWeek = moment().add(1, 'weeks');
const nextMonth = moment().add(1, 'months');
const nextYear = moment().add(1, 'years');

// Subtract time
const yesterday = moment().subtract(1, 'days');
const lastMonth = moment().subtract(1, 'months');

// Multiple units
const future = moment().add({
  days: 7,
  months: 1,
  years: 1
});

// Set specific values
const date = moment()
  .year(2025)
  .month(11) // December (0-indexed!)
  .date(25)
  .hour(14)
  .minute(30)
  .second(0);

// Start/end of period
const startOfDay = moment().startOf('day'); // 00:00:00
const endOfMonth = moment().endOf('month'); // Last day, 23:59:59
const startOfWeek = moment().startOf('week'); // Sunday 00:00:00
```

**When to use:** Calculating deadlines, date ranges, scheduling, calendar features

### Pattern 4: Date Comparison

```javascript
const date1 = moment('2025-12-19');
const date2 = moment('2025-12-25');

// Comparison
date1.isBefore(date2); // true
date1.isAfter(date2); // false
date1.isSame(date2); // false
date1.isSameOrBefore(date2); // true

// Specific unit comparison
date1.isSame(date2, 'month'); // true (both in December)
date1.isSame(date2, 'year'); // true (both in 2025)

// Between
const christmas = moment('2025-12-25');
const today = moment('2025-12-19');
const newYear = moment('2026-01-01');
today.isBetween(christmas, newYear); // false

// Difference
const diff = date2.diff(date1, 'days'); // 6 days
const hours = date2.diff(date1, 'hours'); // 144 hours
const diffFloat = date2.diff(date1, 'months', true); // 0.19 months
```

**When to use:** Validating date ranges, sorting dates, calculating durations

### Pattern 5: Relative Time

```javascript
// From now
moment('2025-12-18').fromNow(); // "a day ago"
moment('2025-12-20').fromNow(); // "in a day"
moment('2025-11-19').fromNow(); // "a month ago"

// From specific date
const reference = moment('2025-12-25');
moment('2025-12-19').from(reference); // "6 days ago"
moment('2026-01-01').from(reference); // "in 7 days"

// Without suffix
moment('2025-12-18').fromNow(true); // "a day"
moment('2025-12-20').fromNow(true); // "a day"

// Time to/from
moment('2025-12-25').toNow(); // "in 6 days" (opposite of fromNow)

// Calendar time
moment().calendar(); // "Today at 2:30 PM"
moment().subtract(1, 'days').calendar(); // "Yesterday at 2:30 PM"
moment().add(1, 'days').calendar(); // "Tomorrow at 2:30 PM"
moment().add(3, 'days').calendar(); // "Monday at 2:30 PM"
```

**When to use:** Social media timestamps, notification times, activity feeds

### Pattern 6: Common Configuration

```javascript
// Strict parsing (recommended)
moment('12/25/2025', 'MM/DD/YYYY', true); // Strict mode
moment('25/12/2025', 'MM/DD/YYYY', true).isValid(); // false

// Locale
moment.locale('es'); // Spanish
moment().format('LLLL'); // "jueves, 19 de diciembre de 2025 14:30"
moment.locale('en'); // Reset to English

// UTC mode
moment.utc(); // Current time in UTC
moment.utc('2025-12-25'); // Parse as UTC
const local = moment.utc().local(); // Convert to local time

// Custom parsing
const customFormat = moment('25-12-2025', 'DD-MM-YYYY');
```

**When to use:** Internationalization, timezone handling, strict validation

---

## 📱 Mobile Considerations

### Touch Support
- ✅ Works perfectly on mobile browsers
- ✅ No UI components (just date logic)
- ✅ Supports all mobile date formats

### Responsive Behavior
- **Bundle size**: 71kb is significant for mobile - consider Day.js (2kb) instead
- **Performance**: Parse and format operations are fast enough for mobile
- **Offline**: Works completely offline once loaded

### iOS/Android Gotchas
- **Date parsing**: iOS Safari strict with date formats - always specify format string
- **Timezones**: Mobile devices handle timezones differently - use moment-timezone for consistency
- **Memory**: Moment objects are mutable - clone when needed to avoid bugs

```javascript
// ⚠️ Mobile Safari date parsing issue
moment('2025-12-25'); // ✅ Works
moment('12/25/2025'); // ⚠️ May fail on iOS - specify format

// ✅ Always specify format for reliability
moment('12/25/2025', 'MM/DD/YYYY'); // Works everywhere
```

---

## 🐛 Common Gotchas

### Issue 1: Mutability
**Problem:** Moment objects are mutable - operations modify the original
**Solution:** Clone when you need to preserve the original
```javascript
// ❌ Wrong - modifies original
const start = moment('2025-12-19');
const end = start.add(7, 'days'); // start is now modified!

// ✅ Correct - clone first
const start = moment('2025-12-19');
const end = start.clone().add(7, 'days'); // start unchanged
```

### Issue 2: Month Indexing
**Problem:** Months are 0-indexed (0 = January, 11 = December)
**Solution:** Remember the offset or use names
```javascript
// ❌ Wrong
moment().month(12); // This is January of next year!

// ✅ Correct
moment().month(11); // December (0-indexed)
moment().month('December'); // Better - use name
moment('2025-12-25'); // Best - use string parsing
```

### Issue 3: Invalid Date Handling
**Problem:** Moment accepts invalid dates without warning
**Solution:** Always validate after parsing
```javascript
// ❌ Wrong - doesn't check validity
const date = moment('invalid-date');
date.format(); // "Invalid date" string

// ✅ Correct - validate first
const date = moment('2025-12-25', 'YYYY-MM-DD', true); // Strict mode
if (!date.isValid()) {
  console.error('Invalid date provided');
  return;
}
```

### Issue 4: Timezone Confusion
**Problem:** Core Moment.js doesn't handle timezones well
**Solution:** Use moment-timezone or parse as UTC explicitly
```javascript
// ⚠️ Problem - local timezone assumed
const date = moment('2025-12-25T14:30:00'); // Local time

// ✅ Solution 1 - Parse as UTC
const utcDate = moment.utc('2025-12-25T14:30:00');

// ✅ Solution 2 - Use moment-timezone
const nycTime = moment.tz('2025-12-25 14:30', 'America/New_York');
```

### Issue 5: Date Formatting Confusion
**Problem:** Using wrong format tokens
**Solution:** Reference the format token guide
```javascript
// ❌ Wrong tokens
moment().format('YYYY-DD-MM'); // Year-Day-Month (wrong!)
moment().format('yyyy-mm-dd'); // lowercase y doesn't work

// ✅ Correct tokens
moment().format('YYYY-MM-DD'); // Year-Month-Day
moment().format('DD/MM/YYYY'); // Day-Month-Year
moment().format('MMM Do, YYYY'); // Dec 19th, 2025
```

---

## 💡 Pro Tips

- **Always use strict mode** when parsing user input: `moment(input, format, true)`
- **Clone before manipulating** to avoid mutability bugs: `moment.clone()`
- **Specify format explicitly** for reliable parsing across browsers
- **Use Day.js for new projects** - same API, 97% smaller (2kb vs 71kb)
- **Import locale files separately** to reduce bundle size
- **Prefer UTC** for storing dates, convert to local only for display
- **Validate all parsed dates** with `.isValid()` before using
- **Use relative time sparingly** - can be confusing across timezones

---

## 🔗 Resources

- [Official Documentation](https://momentjs.com/docs/)
- [GitHub Repository](https://github.com/moment/moment)
- [npm Package](https://www.npmjs.com/package/moment)
- [Format Tokens Reference](https://momentjs.com/docs/#/displaying/format/)
- [Migration Guide to Day.js](https://day.js.org/)
- [Moment Timezone](https://momentjs.com/timezone/)

---

## 📊 Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 90+ | Full support |
| Firefox | 88+ | Full support |
| Safari | 14+ | Full support (watch date parsing) |
| Edge | 90+ | Full support |
| iOS Safari | 14+ | Full support (use strict parsing) |
| Android Chrome | 90+ | Full support |

**Note:** Works in all modern browsers. IE11 supported but deprecated.

---

## 🆚 Alternatives

When to consider other libraries:

- **Day.js (2kb)**: 97% smaller, same API, no timezone support in core
  - Use for: New projects, bundle size critical, similar API needed

- **date-fns (2kb per function)**: Modular, tree-shakeable, functional style
  - Use for: Modern projects, tree-shaking, TypeScript, only need specific functions

- **Luxon (17kb)**: Modern API, built-in timezone support, immutable
  - Use for: Complex timezone handling, immutability, modern syntax

- **Native Intl**: Built-in, 0kb, limited functionality
  - Use for: Formatting only, no dependencies, basic date operations

### Migration Path from Moment.js

```javascript
// Moment.js
moment().format('YYYY-MM-DD');
moment().add(7, 'days');

// Day.js (almost identical API)
dayjs().format('YYYY-MM-DD');
dayjs().add(7, 'days');

// date-fns (functional style)
import { format, addDays } from 'date-fns';
format(new Date(), 'yyyy-MM-dd');
addDays(new Date(), 7);
```

---

## ⚠️ Breaking Changes

### v2.29.0 → v2.30.1
- Minor bug fixes and security updates
- No breaking changes in API
- Locale updates

### v2.0.0 → v2.29.0
- Changed default parsing strictness
- Updated locale handling
- Deprecated some format tokens

### v1.x → v2.0.0
- Complete API rewrite
- Changed method names
- New parsing engine
- See [official migration guide](https://momentjs.com/docs/#/-project-status/)

---

**Last Updated:** 2025-12-19
**Verified Version:** 2.30.1
**Status:** Maintenance Mode (consider alternatives for new projects)
