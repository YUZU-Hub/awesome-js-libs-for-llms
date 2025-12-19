# Axios

> Promise-based HTTP client for browser and Node.js

**Version:** 1.13.2  
**Category:** http  
**Bundle Size:** 15.2 kb (minified) / 5.8 kb (gzipped)  
**Dependencies:** None

---

## 🎯 What It Does

Axios is a promise-based HTTP client that simplifies making API requests. It provides a clean API with automatic JSON data transformation, interceptors, and better error handling than the native fetch API.

**Best for:**
- REST API integration
- AJAX requests with automatic JSON parsing
- Request/response interception
- Concurrent requests with proper error handling

**Not suitable for:**
- GraphQL queries (use Apollo Client)
- WebSocket connections (use Socket.io)
- When bundle size is critical and fetch() is sufficient

---

## 📦 Installation

### CDN (Recommended)

```html
<script src="https://cdn.jsdelivr.net/npm/axios@1.12.2/dist/axios.min.js"></script>
```

### npm

```bash
npm install axios
```

---

## ⚡ Quick Start

### Basic GET Request

```javascript
// Simple GET request
axios.get('https://api.example.com/users')
  .then(response => {
    console.log(response.data); // Data is automatically parsed
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
```

### Expected Output
Returns the parsed JSON data directly in `response.data`. No need to call `.json()` like with fetch.

---

## 🔧 Common Patterns

### Pattern 1: GET with Query Parameters

```javascript
axios.get('https://api.example.com/users', {
  params: {
    page: 1,
    limit: 10,
    sort: 'name'
  }
})
.then(response => console.log(response.data))
.catch(error => console.error(error));

// Automatically converts to: /users?page=1&limit=10&sort=name
```

**When to use:** Filtering, pagination, sorting API endpoints

### Pattern 2: POST with JSON Data

```javascript
axios.post('https://api.example.com/users', {
  name: 'John Doe',
  email: 'john@example.com',
  age: 30
})
.then(response => {
  console.log('Created:', response.data);
  console.log('Status:', response.status); // 201
})
.catch(error => {
  if (error.response) {
    // Server responded with error status
    console.error('Error:', error.response.status);
    console.error('Message:', error.response.data);
  }
});
```

**When to use:** Creating resources, submitting forms, sending JSON data

### Pattern 3: Async/Await (Recommended)

```javascript
async function fetchUsers() {
  try {
    const response = await axios.get('https://api.example.com/users');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error.message);
    throw error;
  }
}

// Usage
const users = await fetchUsers();
```

**When to use:** Modern JavaScript, cleaner error handling, sequential requests

### Pattern 4: Instance with Base Configuration

```javascript
const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  }
});

// Now use api instead of axios
const users = await api.get('/users'); // Goes to https://api.example.com/users
const user = await api.post('/users', { name: 'Jane' });
```

**When to use:** Multiple requests to same API, shared configuration

### Pattern 5: Concurrent Requests

```javascript
const [users, posts, comments] = await Promise.all([
  axios.get('/api/users'),
  axios.get('/api/posts'),
  axios.get('/api/comments')
]);

console.log(users.data, posts.data, comments.data);
```

**When to use:** Loading multiple independent resources simultaneously

---

## 📱 Mobile Considerations

### Touch Support
- ✅ Works perfectly on mobile browsers
- ✅ Handles slow connections gracefully
- ✅ Supports request cancellation

### Responsive Behavior
```javascript
// Set timeout for mobile networks
axios.get('/api/data', {
  timeout: 10000 // 10 seconds for mobile
})
```

### iOS/Android Gotchas
- **CORS**: Handled automatically, but server must allow your domain
- **Offline**: Axios throws network error - implement retry logic
- **SSL**: iOS requires HTTPS or special config for HTTP

---

## 🐛 Common Gotchas

### Issue 1: Response Data Location
**Problem:** Trying to access `response` directly instead of `response.data`  
**Solution:** Always use `response.data` to get the actual data
```javascript
// ❌ Wrong
const users = await axios.get('/users'); // Returns full response object

// ✅ Correct
const response = await axios.get('/users');
const users = response.data; // This is what you want
```

### Issue 2: No Timeout by Default
**Problem:** Requests hang forever on slow connections  
**Solution:** Always set a timeout
```javascript
axios.get('/api/data', {
  timeout: 5000 // Fail after 5 seconds
});
```

### Issue 3: Error Response Structure
**Problem:** Not checking if `error.response` exists  
**Solution:** Handle different error types
```javascript
try {
  const response = await axios.get('/api/data');
} catch (error) {
  if (error.response) {
    // Server responded with error status (4xx, 5xx)
    console.error('Status:', error.response.status);
    console.error('Data:', error.response.data);
  } else if (error.request) {
    // Request was made but no response received
    console.error('No response received');
  } else {
    // Something else went wrong
    console.error('Error:', error.message);
  }
}
```

---

## 💡 Pro Tips

- **Use interceptors** for global error handling and auth token injection
- **Cancel requests** when component unmounts to prevent memory leaks
- **Transform responses** with `transformResponse` for data normalization
- **Set base URL** once instead of repeating in every request
- **Enable `validateStatus`** to customize which status codes throw errors

---

## 🔗 Resources

- [Official Documentation](https://axios-http.com/docs/intro)
- [GitHub Repository](https://github.com/axios/axios)
- [npm Package](https://www.npmjs.com/package/axios)
- [Interceptors Guide](https://axios-http.com/docs/interceptors)

---

## 📊 Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 90+ | Full support |
| Firefox | 88+ | Full support |
| Safari | 14+ | Full support |
| Edge | 90+ | Full support |
| iOS Safari | 14+ | Full support |
| Android Chrome | 90+ | Full support |

**Note:** Uses native Promise, so IE11 needs polyfill

---

## 🆚 Alternatives

When to consider other libraries:
- **Fetch API**: Native, smaller, but requires more boilerplate
- **Ky**: Modern, smaller (3kb), but no IE support
- **SuperAgent**: Similar features, but larger bundle

---

## ⚠️ Breaking Changes

### v1.0.0 → v1.12.2
- No major breaking changes in 1.x series
- Mostly bug fixes and TypeScript improvements

### v0.x → v1.0.0
- Changed `axios.success` to `axios.get().then()`
- Removed `$http` reference
- Updated promise implementation

---

**Last Updated:** 2024-12-19  
**Verified Version:** 1.12.2