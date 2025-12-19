# Leaflet

> Lightweight, mobile-friendly interactive maps

**Version:** 1.9.4
**Category:** maps
**Bundle Size:** 42 kb (minified) / 14 kb (gzipped)
**Dependencies:** None

---

## 🎯 What It Does

Leaflet is the leading open-source JavaScript library for mobile-friendly interactive maps. It uses tile-based rendering with OpenStreetMap or custom tile providers, supporting markers, popups, and GeoJSON data.

**Best for:**
- Interactive maps with markers and popups
- OpenStreetMap-based applications
- Location pickers and store locators
- GeoJSON data visualization
- Mobile-friendly map interfaces

**Not suitable for:**
- 3D globe visualization (use Cesium)
- Google Maps integration (use Google Maps API)
- Heavy real-time data streams (consider Mapbox GL)

---

## 📦 Installation

### CDN (Recommended)

```html
<!-- CSS (Required) -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      crossorigin="">

<!-- JavaScript -->
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossorigin=""></script>
```

### npm

```bash
npm install leaflet
```

```javascript
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
```

---

## ⚡ Quick Start

### Basic Map

```html
<!-- Container MUST have defined height -->
<div id="map" style="height: 400px;"></div>

<script>
  // Initialize map centered on London
  const map = L.map('map').setView([51.505, -0.09], 13);

  // Add OpenStreetMap tile layer
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  // Add marker with popup
  L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('Hello! I am a popup.')
    .openPopup();
</script>
```

### Expected Output

An interactive map centered on London with a marker and open popup. Users can pan, zoom, and interact with the map.

---

## 🔧 Common Patterns

### Pattern 1: Map with Markers

```javascript
const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

// Add multiple markers
const locations = [
  { lat: 51.5, lng: -0.09, name: 'Location 1' },
  { lat: 51.51, lng: -0.1, name: 'Location 2' },
  { lat: 51.49, lng: -0.08, name: 'Location 3' }
];

locations.forEach(loc => {
  L.marker([loc.lat, loc.lng])
    .addTo(map)
    .bindPopup(`<b>${loc.name}</b>`);
});
```

**When to use:** Store locators, points of interest, location lists

### Pattern 2: User Location (Geolocation)

```javascript
const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

// Request user location
map.locate({ setView: true, maxZoom: 16 });

map.on('locationfound', function(e) {
  const radius = e.accuracy / 2;

  L.marker(e.latlng).addTo(map)
    .bindPopup(`You are within ${radius} meters`).openPopup();

  L.circle(e.latlng, radius).addTo(map);
});

map.on('locationerror', function(e) {
  alert('Location access denied or unavailable');
});
```

**When to use:** "Find my location", nearby search, delivery apps

### Pattern 3: GeoJSON Data

```javascript
const geojsonData = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "name": "Central Park" },
      "geometry": {
        "type": "Point",
        "coordinates": [-73.965355, 40.782865]
      }
    }
  ]
};

L.geoJSON(geojsonData, {
  onEachFeature: function(feature, layer) {
    if (feature.properties && feature.properties.name) {
      layer.bindPopup(feature.properties.name);
    }
  }
}).addTo(map);
```

**When to use:** Data visualization, boundaries, routes, regions

### Pattern 4: Custom Markers

```javascript
const customIcon = L.icon({
  iconUrl: 'marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

L.marker([51.5, -0.09], { icon: customIcon })
  .addTo(map)
  .bindPopup('Custom marker!');

// Or use DivIcon for HTML markers
const htmlIcon = L.divIcon({
  className: 'custom-div-icon',
  html: '<div class="marker-pin"></div>',
  iconSize: [30, 42],
  iconAnchor: [15, 42]
});
```

**When to use:** Branded markers, category icons, custom styling

### Pattern 5: Map Events

```javascript
// Click on map to get coordinates
map.on('click', function(e) {
  console.log('Clicked at:', e.latlng.lat, e.latlng.lng);

  // Add marker at clicked location
  L.marker(e.latlng).addTo(map);
});

// Zoom change event
map.on('zoomend', function() {
  console.log('Current zoom:', map.getZoom());
});

// Map move event
map.on('moveend', function() {
  console.log('Center:', map.getCenter());
});
```

**When to use:** Location pickers, click-to-add, map interactions

---

## 📱 Mobile Considerations

### Touch Support
- ✅ Built-in touch gestures (pan, pinch-zoom)
- ✅ Tap for markers and popups
- ✅ Hardware-accelerated smooth scrolling

### Responsive Behavior

```javascript
// Handle window resize
window.addEventListener('resize', function() {
  map.invalidateSize();
});

// Mobile-friendly options
const map = L.map('map', {
  tap: true,           // Enable tap for mobile
  touchZoom: true,     // Pinch to zoom
  dragging: true,      // Touch panning
  zoomControl: true    // Show zoom buttons
});
```

### iOS/Android Gotchas
- **Container height required**: Map won't show without explicit height
- **invalidateSize()**: Call after container size changes or showing hidden map
- **Coordinate order**: Leaflet uses `[lat, lng]` not GeoJSON's `[lng, lat]`
- **iOS Safari**: Smooth panning may require `touch-action: none` on container

---

## 🐛 Common Gotchas

### Issue 1: Map Container Has No Height

```html
<!-- ❌ Wrong - map won't display -->
<div id="map"></div>

<!-- ✅ Correct - explicit height required -->
<div id="map" style="height: 400px;"></div>

<!-- ✅ Or use CSS -->
<style>
  #map { height: 100vh; }
</style>
```

### Issue 2: Map Looks Broken After Show/Hide

```javascript
// ❌ Wrong - map tiles misaligned after showing
$('#map-container').show();

// ✅ Correct - invalidate size after visibility change
$('#map-container').show();
map.invalidateSize();

// For modals/tabs
$('#myModal').on('shown.bs.modal', function() {
  map.invalidateSize();
});
```

### Issue 3: Coordinate Order Confusion

```javascript
// ❌ Wrong - GeoJSON order [lng, lat]
L.marker([-0.09, 51.5]).addTo(map);

// ✅ Correct - Leaflet uses [lat, lng]
L.marker([51.5, -0.09]).addTo(map);
```

### Issue 4: Missing Marker Icons (npm)

```javascript
// ❌ Wrong - icons don't load with bundlers
import L from 'leaflet';

// ✅ Correct - fix icon paths for Webpack/Vite
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});
```

### Issue 5: Attribution Required

```javascript
// ❌ Wrong - violates OSM terms
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// ✅ Correct - always include attribution
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);
```

---

## 💡 Pro Tips

- **Use `fitBounds()`** to auto-zoom to show all markers
- **Cluster markers** with Leaflet.markercluster for many points
- **Use `maxBounds`** to restrict panning area
- **Set `maxZoom`** on tile layer to prevent over-zooming
- **Lazy load** maps only when container is visible
- **Use vector tiles** (Mapbox GL Leaflet) for better performance

---

## 🔗 Resources

- [Official Documentation](https://leafletjs.com/reference.html)
- [GitHub Repository](https://github.com/Leaflet/Leaflet)
- [npm Package](https://www.npmjs.com/package/leaflet)
- [Plugins Directory](https://leafletjs.com/plugins.html)

---

## 📊 Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 60+ | Full support |
| Firefox | 55+ | Full support |
| Safari | 11+ | Full support |
| Edge | 79+ | Full support |
| iOS Safari | 11+ | Touch optimized |
| Android Chrome | 60+ | Touch optimized |

---

## 🆚 Alternatives

When to consider other libraries:
- **Google Maps**: Better for business listings, Street View, Places API
- **Mapbox GL JS**: Better for custom styling, vector tiles, 3D terrain
- **OpenLayers**: More features but heavier, better for GIS applications
- **Cesium**: For 3D globes and terrain visualization

---

## ⚠️ Breaking Changes

### v1.8.x → v1.9.4
- No breaking changes, bug fixes only
- Improved touch handling
- Better TypeScript definitions

### v1.7.x → v1.8.0
- Minor API adjustments
- Improved accessibility
- Better event handling

---

**Last Updated:** 2024-12-19
**Verified Version:** 1.9.4
