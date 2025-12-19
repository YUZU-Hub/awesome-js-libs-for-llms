# SIP.js

> JavaScript SIP signaling library for WebRTC-powered VoIP applications

**Version:** 0.16.0
**Category:** webrtc
**Bundle Size:** ~280 KB (minified) / 1.25 MB (unpacked)
**Dependencies:** None (tree-shakeable)

---

## 🎯 What It Does

SIP.js is an open-source JavaScript library that adds SIP (Session Initiation Protocol) signaling to WebRTC applications. It enables real-time audio/video calls, instant messaging, and presence features through SIP over WebSocket, making it ideal for building browser-based VoIP softphones and communication apps.

**Best for:**
- WebRTC-based softphones and VoIP web applications
- SIP call control (hold, transfer, DTMF, early media)
- Integrating with SIP servers (Asterisk, FreeSWITCH, Kamailio)

**Not suitable for:**
- Peer-to-peer WebRTC without SIP infrastructure
- Multiple concurrent sessions in simple use cases (use SessionManager)
- Native mobile apps (consider React Native with native WebRTC libraries)

---

## 📦 Installation

### CDN (Recommended)

```html
<script src="https://sipjs.com/download/sip-0.16.0.min.js"></script>
```

### npm

```bash
npm install sip.js@0.16.0
```

---

## ⚡ Quick Start

### Basic Audio Call with SimpleUser

```javascript
import { Web } from "sip.js";

// HTML: <audio id="remoteAudio" autoplay></audio>

const server = "wss://sip.example.com";
const options = {
  aor: "sip:alice@example.com",
  media: {
    constraints: { audio: true, video: false },
    remote: {
      audio: document.getElementById("remoteAudio")
    }
  },
  userAgentOptions: {
    authorizationUsername: "alice",
    authorizationPassword: "password123"
  }
};

const simpleUser = new Web.SimpleUser(server, options);

// Connect and place call
simpleUser.connect()
  .then(() => simpleUser.call("sip:bob@example.com"))
  .catch((error) => console.error("Call failed:", error));

// Hangup
simpleUser.hangup();
```

### Expected Output

Establishes an audio-only SIP call to bob@example.com with audio playback through the HTML audio element. The call connects via WebRTC with SIP signaling over WebSocket.

---

## 🔧 Common Patterns

### Pattern 1: UserAgent Setup with Registration

```javascript
import { UserAgent, Registerer } from "sip.js";

const uri = UserAgent.makeURI("sip:alice@example.com");
const userAgent = new UserAgent({
  uri,
  authorizationUsername: "alice",
  authorizationPassword: "password123",
  transportOptions: {
    server: "wss://sip.example.com:8443"
  }
});

const registerer = new Registerer(userAgent);

// Start and register to receive calls
userAgent.start().then(() => {
  registerer.register();
});
```

**When to use:** For authenticated SIP registration required to receive inbound calls. Anonymous UserAgents can only make outbound calls.

### Pattern 2: Receiving Inbound Calls

```javascript
import { Web } from "sip.js";

const simpleUser = new Web.SimpleUser(server, options);

// Handle incoming calls
simpleUser.delegate = {
  onCallReceived: async () => {
    console.log("Incoming call!");
    await simpleUser.answer(); // Auto-answer
  }
};

// Connect and register
await simpleUser.connect();
await simpleUser.register();
```

**When to use:** Applications that need to accept incoming calls, not just initiate them. Requires a registered UserAgent.

### Pattern 3: Video Call Configuration

```javascript
const options = {
  aor: "sip:alice@example.com",
  media: {
    constraints: { audio: true, video: true },
    local: {
      video: document.getElementById("localVideo")
    },
    remote: {
      video: document.getElementById("remoteVideo")
    }
  },
  userAgentOptions: {
    authorizationUsername: "alice",
    authorizationPassword: "password123"
  }
};

// HTML needed:
// <video id="localVideo" muted autoplay></video>
// <video id="remoteVideo" autoplay></video>
```

**When to use:** Two-way video calls. Always mute the local video element to prevent audio feedback.

### Pattern 4: Send DTMF Tones

```javascript
// During active call session
const dtmfOptions = {
  requestOptions: {
    body: {
      contentDisposition: "render",
      contentType: "application/dtmf-relay",
      content: "Signal=5\r\nDuration=100"
    }
  }
};

session.info(dtmfOptions);
```

**When to use:** IVR systems, dialpad input during calls. SIP.js supports both RFC 2833 (SIP INFO) and in-band DTMF.

---

## 📱 Mobile Considerations

### Browser Support
- ✅ Chrome and Safari on iOS 14+ (WebRTC support)
- ✅ Chrome and Firefox on Android (full WebRTC support)
- ⚠️ Background activity suspended by battery optimization

### Mobile Gotchas
- **WebSocket Connection**: Mobile browsers may close WebSocket connections when app is backgrounded
- **Permissions**: Request microphone/camera permissions before initiating calls
- **Cordova**: Official Cordova plugin is deprecated and no longer maintained

### Best Practices
- For production mobile apps, use React Native or Flutter with native WebRTC libraries
- Test extensively on mobile Safari (iOS) as WebRTC implementation differs from desktop
- Handle reconnection logic for suspended WebSocket connections

---

## 🐛 Common Gotchas

### Issue 1: Session Description Handler Errors
**Problem:** "SESSION_DESCRIPTION_HANDLER_ERROR: Error with Session Description Handler"
**Solution:** Ensure user has granted microphone/camera permissions. This error often occurs when WebRTC PeerConnection cannot access media devices.
```javascript
// Request permissions first
navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then(() => simpleUser.call(destination))
  .catch((error) => console.error("Permission denied:", error));
```

### Issue 2: Early Media with Call Forking
**Problem:** SIP.js only supports early media if calls don't fork. Forking causes errors.
**Solution:** Use `inviteWithoutSdp: true` option to delay SDP negotiation
```javascript
const inviter = new Inviter(userAgent, target, {
  inviteWithoutSdp: true
});
```

### Issue 3: Registration State Management
**Problem:** Cannot receive calls despite calling `register()`
**Solution:** Ensure UserAgent is started before registering and has valid auth credentials
```javascript
// Correct order
await userAgent.start();
await registerer.register();
// Now can receive calls
```

---

## 💡 Pro Tips

- SimpleUser is limited to one concurrent session - use SessionManager for multiple calls
- SIP.js is SIP-compliant and supports call forking (unlike JsSIP)
- Enable in-band DTMF explicitly via UserAgent config (beta feature as of v0.10.0)
- Use `UserAgent.makeURI()` static helper to safely create SIP URIs
- SIP.js is fully tree-shakeable - only import what you need to reduce bundle size
- Test with TLS (WSS) and SRTP for production to ensure encrypted calls

---

## 🔗 Resources

- [Official Documentation](https://sipjs.com/)
- [GitHub Repository](https://github.com/onsip/sip.js)
- [npm Package](https://www.npmjs.com/package/sip.js)
- [User Agent Guide](https://sipjs.com/guides/user-agent/)
- [SimpleUser Guide](https://sipjs.com/guides/simple-user/)
- [API Reference](https://sipjs.com/api/0.21.0/)

---

## 📊 Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 90+ | Full support (WebRTC + WebSocket) |
| Firefox | 88+ | Full support |
| Safari | 14+ | Full support, test extensively |
| Edge | 90+ | Full support (Chromium-based) |
| iOS Safari | 14+ | WebRTC supported, watch for backgrounding |
| Android Chrome | 90+ | Full support |

**Requirements:** WebSockets and WebRTC support. SIP server must support SIP over WebSocket.

---

## 🆚 Alternatives

When to consider other libraries:
- **JsSIP**: More low-level control, shorter setup time, preferred for customizable SIP signaling (does not support call forking)
- **PeerJS**: Better for simple peer-to-peer WebRTC without SIP infrastructure (data/media only, no SIP)
- **simple-peer**: Lightweight WebRTC abstraction for Node.js and browser (no SIP signaling)
- **sipML5**: Open-source JavaScript SIP client with WebRTC media stack

---

## ⚠️ Breaking Changes

### v0.20.0 → v0.21.0
- SessionManager OPTIONS ping support added
- Registration expires handling fixed
- Requires migration if using custom Registerer configuration

### v0.15.0 → v0.20.0
- Major API restructuring toward SIP-compliant terminology
- SimpleUser introduced as high-level API
- Legacy API deprecated - migrate to UserAgent/Session patterns
- Failure and end causes moved to new namespace

---

**Last Updated:** 2025-12-19
**Verified Version:** 0.21.2
