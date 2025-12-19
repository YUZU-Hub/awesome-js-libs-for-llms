# Howler.js

> Modern JavaScript audio library with Web Audio API and HTML5 Audio fallback

**Version:** 2.2.4
**Category:** audio
**Bundle Size:** 9 kb (minified) / 7 kb (gzipped)
**Dependencies:** None

---

## 🎯 What It Does

Howler.js provides a unified API for playing audio in web applications. It automatically uses Web Audio API for modern browsers and falls back to HTML5 Audio for legacy support, handling cross-browser audio complexities including mobile restrictions and codec compatibility.

**Best for:**
- Game audio and sound effects
- Background music and audio players
- Audio sprites (multiple sounds in one file)
- Spatial/3D audio for games
- Simple audio playback with volume/fade controls

**Not suitable for:**
- Audio synthesis or music generation (use Tone.js)
- Complex audio effects processing (use Web Audio API directly)
- Professional DAW-like applications

---

## 📦 Installation

### CDN (Recommended)

```html
<!-- Full bundle (includes core + spatial) -->
<script src="https://cdn.jsdelivr.net/npm/howler@2.2.4/dist/howler.min.js"></script>

<!-- Core only (no spatial audio) -->
<script src="https://cdn.jsdelivr.net/npm/howler@2.2.4/dist/howler.core.min.js"></script>
```

### npm

```bash
npm install howler
```

```javascript
import { Howl, Howler } from 'howler';
```

---

## ⚡ Quick Start

### Basic Usage

```javascript
// Simple playback
const sound = new Howl({
  src: ['sound.mp3']
});
sound.play();

// With options
const music = new Howl({
  src: ['music.webm', 'music.mp3'], // Multiple formats for compatibility
  autoplay: true,
  loop: true,
  volume: 0.5,
  onend: function() {
    console.log('Finished!');
  }
});
```

### Expected Output / Result

Audio plays immediately. Multiple format fallbacks ensure cross-browser compatibility (webm for Chrome/Firefox, mp3 for Safari/IE).

---

## 🔧 Common Patterns

### Pattern 1: Audio Sprites

```javascript
// Define multiple sounds in one file
const sounds = new Howl({
  src: ['sprites.webm', 'sprites.mp3'],
  sprite: {
    shoot: [0, 500],      // Start at 0ms, duration 500ms
    explode: [1000, 1500], // Start at 1000ms, duration 1500ms
    coin: [3000, 700]
  }
});

// Play specific sprite
sounds.play('shoot');
sounds.play('coin');
```

**When to use:** Loading multiple short sounds efficiently (reduces HTTP requests, better for games)

### Pattern 2: Volume Fading

```javascript
const bgMusic = new Howl({
  src: ['background.mp3'],
  volume: 0.0
});

// Fade in over 3 seconds
bgMusic.play();
bgMusic.fade(0.0, 1.0, 3000);

// Fade out before stopping
bgMusic.fade(1.0, 0.0, 2000);
bgMusic.once('fade', function() {
  bgMusic.stop();
});
```

**When to use:** Smooth audio transitions, menu music, game state changes

### Pattern 3: Preloading & Streaming

```javascript
// Preload small files (default behavior)
const sfx = new Howl({
  src: ['effect.mp3'],
  preload: true // Downloads entire file before playing
});

// Stream large files (avoid waiting for full download)
const podcast = new Howl({
  src: ['episode.mp3'],
  html5: true, // Forces HTML5 Audio for streaming
  preload: true
});
```

**When to use:** Use html5: true for files > 1MB (music, podcasts). Keep Web Audio for short sounds.

### Pattern 4: Spatial Audio

```javascript
const ambientSound = new Howl({
  src: ['wind.mp3'],
  loop: true
});

const soundId = ambientSound.play();

// Position sound in 3D space (x, y, z)
ambientSound.pos(3, 0, -5, soundId);

// Update listener position (camera/player)
Howler.pos(0, 0, 0);
```

**When to use:** 3D games, VR experiences, directional audio cues

---

## 📱 Mobile Considerations

### Touch Support
- ✅ Automatic unlock on first user interaction
- ⚠️ Cannot autoplay without user gesture
- ⚠️ Requires user tap/click before any audio plays

### iOS/Android Autoplay Restrictions

**Critical:** Mobile browsers block audio until user interaction occurs. Howler.js auto-unlocks on first touch, but initial play() must happen after user gesture.

```javascript
// Handle autoplay blocking
const music = new Howl({
  src: ['music.mp3'],
  onplayerror: function() {
    // Audio locked by browser policy
    music.once('unlock', function() {
      music.play(); // Retry after unlock
    });
  }
});

// Try to play (will fail on mobile until user interaction)
music.play();
```

### Checking Audio Context State

```javascript
// Check if audio is locked
if (Howler.ctx && Howler.ctx.state === 'suspended') {
  // Show "tap to enable audio" UI
  document.body.addEventListener('click', function() {
    Howler.ctx.resume();
  });
}
```

---

## 🐛 Common Gotchas

### Issue 1: Mobile Autoplay Not Working
**Problem:** Audio doesn't play on page load on mobile
**Solution:** Always require user interaction first (button click, screen tap)

```javascript
// ❌ Wrong - won't work on mobile
window.addEventListener('load', () => sound.play());

// ✅ Correct - triggered by user
button.addEventListener('click', () => sound.play());
```

### Issue 2: Streaming Not Working
**Problem:** Large files take forever to start playing
**Solution:** Use html5: true for files over 1MB

```javascript
const largeFile = new Howl({
  src: ['song.mp3'],
  html5: true // Enables streaming, but loses some Web Audio features
});
```

### Issue 3: Multiple Instances Playing
**Problem:** Same sound plays multiple times overlapping
**Solution:** Stop previous instance or manage sound IDs

```javascript
// Stop before replaying
if (sound.playing()) sound.stop();
sound.play();

// Or manage individual sound IDs
const id1 = sound.play();
sound.stop(id1); // Stop specific instance
```

---

## 💡 Pro Tips

- Use webm + mp3 formats for best size/quality balance and browser coverage
- Set html5: true only for large files (> 1MB) to maintain Web Audio features
- Pool sounds for frequently played effects to reduce memory usage
- Use audio sprites to reduce HTTP requests (ideal for games)
- Call Howler.unload() to free memory when sounds are no longer needed
- Check Howler.usingWebAudio to conditionally enable advanced features

---

## 🔗 Resources

- [Official Documentation](https://howlerjs.com/)
- [GitHub Repository](https://github.com/goldfire/howler.js)
- [npm Package](https://www.npmjs.com/package/howler)
- [Live Demos](https://howlerjs.com/#demos)
- [cdnjs](https://cdnjs.com/libraries/howler)

---

## 📊 Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 7+ | Full Web Audio support |
| Firefox | 4+ | Full Web Audio support |
| Safari | 5.1.4+ | Full support |
| Edge | All | Full support |
| iOS Safari | 6+ | Requires user interaction first |
| Android Chrome | All | Requires user interaction first |
| IE | 9+ | HTML5 Audio fallback only |

---

## 🆚 Alternatives

When to consider other libraries:
- **Web Audio API**: Direct browser API if you need low-level control and custom audio processing
- **Tone.js**: Better for music synthesis, sequencing, instruments, and complex effects (13kb gzipped)
- **Pizzicato.js**: Simpler API for basic audio manipulation with built-in effects (5kb)
- **SoundJS**: Part of CreateJS suite, better if already using CreateJS for games

---

**Last Updated:** 2025-12-19
**Verified Version:** 2.2.4
