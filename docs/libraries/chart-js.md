# Chart.js

> Simple yet flexible JavaScript charting library for HTML5 canvas

**Version:** 4.5.1
**Category:** charts
**Bundle Size:** 181 kb (minified) / 59 kb (gzipped)
**Dependencies:** None

---

## 🎯 What It Does

Chart.js is a popular open-source library that renders responsive, animated charts using HTML5 Canvas. It provides 8 chart types out-of-the-box with simple configuration and automatic responsive behavior, making it ideal for dashboards and data visualization.

**Best for:**
- Business dashboards with common chart types (line, bar, pie)
- Real-time data visualization with smooth animations
- Responsive charts that adapt to mobile screens
- Quick prototyping with minimal configuration
- Projects where bundle size matters (smaller than D3.js)

**Not suitable for:**
- Complex custom visualizations (use D3.js)
- Large datasets with 10,000+ data points (performance issues)
- 3D charts or advanced statistical graphs
- Print-quality publication graphics (SVG-based libs better)

---

## 📦 Installation

### CDN (Recommended)

```html
<!-- Latest 4.x version -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>

<!-- Or use unpkg -->
<script src="https://unpkg.com/chart.js@4.4.0/dist/chart.umd.min.js"></script>
```

### npm

```bash
npm install chart.js
```

### ES Module Import

```javascript
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
```

---

## ⚡ Quick Start

### Basic Line Chart

```html
<!DOCTYPE html>
<html>
<head>
  <title>Chart.js Quick Start</title>
</head>
<body>
  <!-- Canvas element (Chart.js requires canvas) -->
  <canvas id="myChart" width="400" height="200"></canvas>

  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <script>
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Sales 2024',
          data: [12, 19, 3, 5, 2, 3],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Monthly Sales'
          }
        }
      }
    });
  </script>
</body>
</html>
```

### Expected Output

Renders a smooth line chart with 6 data points, automatically sized to fit the container. The chart includes a legend, title, and hover tooltips showing exact values.

---

## 🔧 Common Patterns

### Pattern 1: Bar Chart with Multiple Datasets

```javascript
const ctx = document.getElementById('barChart').getContext('2d');
const barChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: '2023',
        data: [65, 59, 80, 81],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1
      },
      {
        label: '2024',
        data: [28, 48, 40, 19],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
```

**When to use:** Comparing multiple data series side-by-side (e.g., year-over-year comparison)

### Pattern 2: Pie/Doughnut Chart

```javascript
const ctx = document.getElementById('pieChart').getContext('2d');
const pieChart = new Chart(ctx, {
  type: 'doughnut', // or 'pie'
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    datasets: [{
      label: 'Color Distribution',
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)'
      ],
      hoverOffset: 4
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  }
});
```

**When to use:** Showing proportions or percentage breakdown (market share, survey results)

### Pattern 3: Real-Time Data Updates

```javascript
const ctx = document.getElementById('liveChart').getContext('2d');
const liveChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Live Data',
      data: [],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  },
  options: {
    responsive: true,
    scales: {
      x: { display: true },
      y: { beginAtZero: true }
    }
  }
});

// Update chart every second
setInterval(() => {
  const now = new Date();
  liveChart.data.labels.push(now.getSeconds());
  liveChart.data.datasets[0].data.push(Math.random() * 100);

  // Keep only last 10 points
  if (liveChart.data.labels.length > 10) {
    liveChart.data.labels.shift();
    liveChart.data.datasets[0].data.shift();
  }

  liveChart.update('none'); // 'none' = no animation for performance
}, 1000);
```

**When to use:** Live dashboards, real-time monitoring, streaming data

### Pattern 4: Responsive Configuration

```javascript
const ctx = document.getElementById('responsiveChart').getContext('2d');
const responsiveChart = new Chart(ctx, {
  type: 'line',
  data: { /* ... */ },
  options: {
    responsive: true,
    maintainAspectRatio: true, // Set false to fill container
    aspectRatio: 2, // Width/height ratio (default: 2)
    onResize: (chart, size) => {
      // Custom logic when chart resizes
      console.log('Chart resized to', size.width, 'x', size.height);
    }
  }
});
```

**When to use:** Mobile-first designs, fluid layouts, dashboards

### Pattern 5: Custom Tooltips & Formatting

```javascript
const ctx = document.getElementById('formattedChart').getContext('2d');
const formattedChart = new Chart(ctx, {
  type: 'bar',
  data: { /* ... */ },
  options: {
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) label += ': ';
            label += '$' + context.parsed.y.toFixed(2);
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      }
    }
  }
});
```

**When to use:** Currency formatting, custom units, localized numbers

---

## 📱 Mobile Considerations

### Touch Support
- ✅ Full touch support out-of-the-box
- ✅ Tap to show tooltips
- ✅ Pinch-to-zoom disabled by default (prevents interference)
- ✅ Touch-optimized hover states

### Responsive Behavior

```javascript
// Mobile-optimized configuration
const mobileChart = new Chart(ctx, {
  type: 'line',
  data: { /* ... */ },
  options: {
    responsive: true,
    maintainAspectRatio: false, // Important for mobile
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    plugins: {
      legend: {
        display: window.innerWidth > 768, // Hide legend on mobile
        position: 'bottom' // Better for narrow screens
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45, // Angle labels on mobile
          minRotation: 45,
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
        }
      }
    }
  }
});
```

### iOS/Android Gotchas
- **Canvas sizing**: Set explicit width/height or use CSS with `maintainAspectRatio: false`
- **Performance**: Use `animation: false` for charts with 500+ points
- **Retina displays**: Canvas automatically scales for high-DPI screens
- **Memory**: Destroy charts when removing them: `chart.destroy()`

---

## 🐛 Common Gotchas

### Issue 1: Canvas Sizing Problems
**Problem:** Chart appears tiny or doesn't resize properly
**Solution:** Wrap canvas in a container with defined dimensions

```html
<!-- ❌ Wrong - canvas has no intrinsic size -->
<canvas id="myChart"></canvas>

<!-- ✅ Correct - container controls size -->
<div style="width: 80%; max-width: 600px; margin: auto;">
  <canvas id="myChart"></canvas>
</div>
```

```javascript
// Also set maintainAspectRatio: false for fluid height
options: {
  responsive: true,
  maintainAspectRatio: false
}
```

### Issue 2: Chart Not Visible
**Problem:** Canvas element renders but chart doesn't appear
**Solution:** Check script load order and context retrieval

```javascript
// ✅ Correct - wait for DOM
document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('myChart');
  if (ctx) {
    const chart = new Chart(ctx, { /* config */ });
  }
});

// ❌ Wrong - script runs before DOM ready
const ctx = document.getElementById('myChart'); // May be null
```

### Issue 3: Data Format Errors
**Problem:** Chart shows incorrect values or errors
**Solution:** Ensure data is numeric, not strings

```javascript
// ❌ Wrong - strings won't plot correctly
data: ['12', '19', '3', '5']

// ✅ Correct - use numbers
data: [12, 19, 3, 5]

// ✅ Also correct - parse strings
data: csvData.map(val => parseFloat(val))
```

### Issue 4: Memory Leaks in SPAs
**Problem:** Charts consume memory when navigating between pages
**Solution:** Always destroy charts before removing from DOM

```javascript
let myChart = new Chart(ctx, config);

// Before unmounting component or removing element
if (myChart) {
  myChart.destroy();
  myChart = null;
}
```

---

## 💡 Pro Tips

- **Performance**: Use `decimation` plugin to downsample large datasets automatically
- **Animations**: Set `animation.duration: 0` for instant rendering when updating frequently
- **Accessibility**: Add `role="img"` and `aria-label` to canvas for screen readers
- **Colors**: Use `rgba()` for transparency, essential for overlapping datasets
- **Tree-shaking**: Import only needed chart types in ES modules to reduce bundle size
- **Gradients**: Create canvas gradients for professional-looking fills
- **Mixed charts**: Combine bar and line charts in one graph for hybrid visualizations

```javascript
// Tree-shaking example (reduces bundle size)
import { Chart, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
```

---

## 🔗 Resources

- [Official Documentation](https://www.chartjs.org/docs/latest/)
- [GitHub Repository](https://github.com/chartjs/Chart.js)
- [npm Package](https://www.npmjs.com/package/chart.js)
- [Chart.js Samples](https://www.chartjs.org/docs/latest/samples/)
- [Community Extensions](https://github.com/chartjs/awesome)

---

## 📊 Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 90+ | Full support, best performance |
| Firefox | 88+ | Full support |
| Safari | 14+ | Full support, requires iOS 14+ |
| Edge | 90+ | Full support |
| iOS Safari | 14+ | Touch-optimized, excellent mobile performance |
| Android Chrome | 90+ | Full support with touch gestures |

**Note:** Requires ES6+ support. No IE11 support in v4.x (use v3.x for legacy browsers)

---

## 🆚 Alternatives

When to consider other libraries:
- **D3.js**: More flexible for complex custom visualizations, but steeper learning curve and larger bundle (500kb+)
- **ApexCharts**: Modern alternative with similar API, includes more chart types out-of-the-box (bar races, heatmaps)
- **ECharts**: Enterprise-grade with 3D support, better for large datasets (10k+ points), larger bundle (900kb)
- **Recharts**: React-specific, declarative JSX syntax, better for React projects
- **Plotly.js**: Scientific charts with 3D, statistical graphs, but much larger (3MB+)

---

## ⚠️ Breaking Changes

### v3.x → v4.x
- **Tree-shaking**: Must explicitly register components in ES modules
- **Type property**: Required on all datasets (was inferred in v3)
- **Removed adapters**: Date adapters now separate packages
- **Animation changes**: New animation system with different configuration
- **Migration guide**: https://www.chartjs.org/docs/latest/migration/v4-migration.html

```javascript
// v3 (auto-registered)
import Chart from 'chart.js/auto';

// v4 (manual registration required)
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
```

### v2.x → v3.x
- Namespace changed from `Chart.` to `chart.`
- Options structure completely redesigned
- Scales configuration syntax changed
- Removed global configuration

---

**Last Updated:** 2024-12-19
**Verified Version:** 4.4.0
