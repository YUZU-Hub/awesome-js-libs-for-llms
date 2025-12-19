# D3.js

> Data-Driven Documents - Low-level JavaScript library for creating custom, dynamic data visualizations

**Version:** 7.9.0
**Category:** charts-visualization
**Bundle Size:** 283 kb (minified) / 73 kb (gzipped)
**Dependencies:** None

---

## 🎯 What It Does

D3.js is a low-level JavaScript library for binding data to DOM elements and creating bespoke, interactive data visualizations using web standards (SVG, Canvas, HTML). Unlike chart libraries, D3 provides granular control over every aspect of your visualization through 30+ composable modules.

**Best for:**
- Custom, publication-quality visualizations (media, journalism)
- Complex interactive charts with animations
- Network diagrams, geographic maps, hierarchical visualizations
- Dynamic, real-time data visualization
- When you need complete creative control

**Not suitable for:**
- Simple dashboards or standard charts (use Chart.js or Observable Plot)
- Static visualizations without interaction
- Quick prototypes or time-constrained projects
- When you need pre-built chart components

---

## 📦 Installation

### CDN (Recommended)

```html
<!-- ESM (Modern browsers) -->
<script type="module">
  import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
  // Your code here
</script>

<!-- UMD (Global d3 object) -->
<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
```

### npm

```bash
npm install d3
# or
yarn add d3
# or
pnpm add d3
```

### Import Specific Modules (Recommended for smaller bundles)

```javascript
// Import only what you need
import { select, selectAll } from "d3-selection";
import { scaleLinear } from "d3-scale";
import { axisBottom, axisLeft } from "d3-axis";
```

---

## ⚡ Quick Start

### Basic Bar Chart (Copy-Paste Ready)

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
</head>
<body>
  <div id="chart"></div>

  <script>
    // Data
    const data = [30, 86, 168, 281, 303, 365];

    // Dimensions
    const width = 640;
    const height = 400;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 30;
    const marginLeft = 40;

    // Scales
    const x = d3.scaleBand()
      .domain(d3.range(data.length))
      .range([marginLeft, width - marginRight])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([height - marginBottom, marginTop]);

    // Create SVG
    const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    // Add bars
    svg.append("g")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(data)
      .join("rect")
        .attr("x", (d, i) => x(i))
        .attr("y", d => y(d))
        .attr("height", d => y(0) - y(d))
        .attr("width", x.bandwidth());

    // Add axes
    svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).tickFormat(i => i + 1));

    svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y));

    // Append to page
    document.getElementById("chart").appendChild(svg.node());
  </script>
</body>
</html>
```

### Expected Output

A responsive SVG bar chart with 6 blue bars, labeled axes, and automatic scaling. The chart scales to container width using `viewBox`.

---

## 🔧 Common Patterns

### Pattern 1: Selections and Data Binding

```javascript
// Select elements and bind data
d3.selectAll("circle")
  .data([10, 20, 30, 40])
  .join("circle")
    .attr("cx", (d, i) => i * 50)
    .attr("cy", 100)
    .attr("r", d => d)
    .style("fill", "orange");

// The .join() method handles enter/update/exit automatically
```

**When to use:** Creating or updating DOM elements based on data arrays

### Pattern 2: Enter/Update/Exit Pattern (Classic)

```javascript
const circles = d3.selectAll("circle")
  .data(newData);

// ENTER: Add new elements for new data
circles.enter()
  .append("circle")
  .attr("r", 5);

// UPDATE: Modify existing elements
circles
  .attr("cx", d => xScale(d.x))
  .attr("cy", d => yScale(d.y));

// EXIT: Remove elements without data
circles.exit().remove();
```

**When to use:** Fine-grained control over element lifecycle, complex animations between states

### Pattern 3: Scales (Data to Visual Mapping)

```javascript
// Linear scale for continuous data
const yScale = d3.scaleLinear()
  .domain([0, 100])           // Data range
  .range([height, 0]);        // Pixel range (inverted for SVG)

// Time scale for dates
const xScale = d3.scaleTime()
  .domain([new Date("2024-01-01"), new Date("2024-12-31")])
  .range([0, width]);

// Ordinal scale for categories
const colorScale = d3.scaleOrdinal()
  .domain(["A", "B", "C"])
  .range(["#ff0000", "#00ff00", "#0000ff"]);

// Use scales
const y = yScale(50);        // Returns pixel position
const x = xScale(new Date("2024-06-15"));
const color = colorScale("B");  // Returns "#00ff00"
```

**When to use:** Converting data values to visual properties (position, size, color)

### Pattern 4: Transitions and Animations

```javascript
// Animate changes
d3.selectAll("circle")
  .transition()
    .duration(750)           // 750ms animation
    .delay((d, i) => i * 10) // Stagger by index
    .attr("r", d => d * 2)
    .style("fill", "purple")
    .on("end", () => console.log("Animation complete"));

// Chain transitions
selection
  .transition()
    .duration(500)
    .style("opacity", 0)
  .transition()
    .duration(500)
    .style("opacity", 1);
```

**When to use:** Smooth state changes, drawing attention, showing data updates

### Pattern 5: Loading Data

```javascript
// Load CSV data
const data = await d3.csv("data.csv");
// Automatically parses: [{name: "Alice", age: "30"}, ...]

// Load and transform JSON
const data = await d3.json("api/data.json");

// Parse dates and numbers
const data = await d3.csv("data.csv", d => ({
  date: d3.timeParse("%Y-%m-%d")(d.date),
  value: +d.value  // Convert string to number
}));

// Multiple files
const [sales, inventory] = await Promise.all([
  d3.csv("sales.csv"),
  d3.csv("inventory.csv")
]);
```

**When to use:** Loading external data files, API integration

---

## 📱 Mobile Considerations

### Touch Support

- ✅ Full touch event support via `d3-selection`
- ✅ Drag gestures: `d3.drag()` works on touch devices
- ✅ Zoom/pan: `d3.zoom()` handles touch and mouse
- ⚠️ Avoid hover effects - use click/tap instead

```javascript
// Touch-friendly drag
const drag = d3.drag()
  .on("start", dragStarted)
  .on("drag", dragging)
  .on("end", dragEnded);

svg.selectAll("circle")
  .call(drag);

// Touch-friendly zoom
const zoom = d3.zoom()
  .scaleExtent([0.5, 5])
  .on("zoom", (event) => {
    svg.attr("transform", event.transform);
  });

svg.call(zoom);
```

### Responsive Behavior

```javascript
// Responsive SVG using viewBox
const svg = d3.create("svg")
  .attr("viewBox", [0, 0, width, height])
  .attr("style", "max-width: 100%; height: auto;");

// Resize handler
function resize() {
  const container = document.getElementById("chart");
  const width = container.clientWidth;
  // Redraw chart with new width
  updateChart(width);
}

window.addEventListener("resize", resize);
```

### iOS/Android Gotchas

- **Touch delay**: iOS has 300ms tap delay (fixed in iOS 13+)
- **SVG rendering**: Some Android devices struggle with complex SVGs (>1000 elements)
- **Memory**: Use Canvas for >5000 data points on mobile
- **Pinch zoom**: Disable page zoom with `touch-action: none` on SVG

---

## 🐛 Common Gotchas

### Issue 1: SVG Coordinate System (Y-axis inverted)

**Problem:** SVG y=0 is at top, but data usually has 0 at bottom
**Solution:** Invert the range when creating scales

```javascript
// ❌ Wrong - chart appears upside down
const yScale = d3.scaleLinear()
  .domain([0, 100])
  .range([0, height]);

// ✅ Correct - invert the range
const yScale = d3.scaleLinear()
  .domain([0, 100])
  .range([height, 0]);  // height first, 0 second
```

### Issue 2: Forgetting to Join Data

**Problem:** Creating elements but not binding data
**Solution:** Always use `.data()` and `.join()` or `.enter()`

```javascript
// ❌ Wrong - no data binding
d3.select("svg")
  .append("circle")
  .attr("r", 10);

// ✅ Correct - data drives elements
d3.select("svg")
  .selectAll("circle")
  .data([10, 20, 30])
  .join("circle")
    .attr("r", d => d);
```

### Issue 3: Selecting Before Elements Exist

**Problem:** `selectAll()` on non-existent elements returns empty selection
**Solution:** This is correct! D3's enter/join pattern handles creation

```javascript
// This is CORRECT - selectAll on empty selection is intentional
d3.select("svg")
  .selectAll("circle")  // Empty selection is OK
  .data([1, 2, 3])
  .join("circle")       // Creates circles
    .attr("r", 5);
```

### Issue 4: Mutation vs. Selection Chains

**Problem:** Forgetting that most D3 methods mutate and return the selection
**Solution:** Chain methods, but know when to store references

```javascript
// ✅ Chain methods - cleaner
const svg = d3.create("svg")
  .attr("width", 500)
  .attr("height", 300);

// ✅ Store reference when needed later
const g = svg.append("g")
  .attr("transform", "translate(50, 50)");

g.append("circle").attr("r", 10);
g.append("text").text("Label");
```

---

## 💡 Pro Tips

- **Use Observable Plot for simple charts** - D3's official high-level library reduces 50 lines to 1
- **Import specific modules** - `d3-scale`, `d3-selection` instead of entire D3 bundle
- **Canvas for performance** - Switch to Canvas rendering for >1000 elements
- **Master scales first** - Understanding scales unlocks 80% of D3's power
- **ViewBox for responsive** - Use `viewBox` and `max-width: 100%` instead of fixed dimensions
- **Inspect with DevTools** - SVG elements are regular DOM - use browser inspector
- **Start with examples** - Modify Observable notebooks rather than building from scratch

---

## 🔗 Resources

- [Official Documentation](https://d3js.org/)
- [GitHub Repository](https://github.com/d3/d3)
- [npm Package](https://www.npmjs.com/package/d3)
- [Observable Gallery](https://observablehq.com/@d3/gallery) - 1000+ examples
- [Learn D3](https://observablehq.com/@d3/learn-d3) - Interactive tutorials
- [API Reference](https://d3js.org/api) - Complete module documentation

---

## 📊 Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 90+ | Full support |
| Firefox | 88+ | Full support |
| Safari | 14+ | Full support, some SVG quirks |
| Edge | 90+ | Full support |
| iOS Safari | 14+ | Full support, watch memory on complex SVGs |
| Android Chrome | 90+ | Full support, Canvas recommended for complex viz |

**Requirements:** ES2015+ (no IE11 support)

---

## 🆚 Alternatives

When to consider other libraries:

- **Observable Plot** - Same team, 50x less code for standard charts. Use Plot for 90% of cases, D3 for custom work
- **Chart.js** - Pre-built charts, easier learning curve, less flexible
- **Plotly.js** - Interactive charts out-of-box, larger bundle (3MB vs 73KB)
- **Apache ECharts** - More chart types, better for business dashboards
- **Vega/Vega-Lite** - Declarative grammar, less code, less control

**Rule of thumb:** If you can describe your chart in 1-2 sentences, use Observable Plot or Chart.js. If you need custom interactions, animations, or unique designs, use D3.

---

## ⚠️ Breaking Changes

### v6.0 → v7.0 (2021)
- Moved to ES modules exclusively (no more UMD in source)
- `d3.event` removed - use `event` parameter in callbacks
- Flattened module structure
- Migration guide: https://observablehq.com/@d3/d3v7-migration-guide

### v5.0 → v6.0 (2020)
- Removed `d3.event` in favor of explicit event parameters
- Updated time parsing to be more strict
- Simplified module dependencies

---

**Last Updated:** 2025-12-19
**Verified Version:** 7.9.0
