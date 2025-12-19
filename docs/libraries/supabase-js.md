# @supabase/supabase-js

> Isomorphic JavaScript client for Supabase - Query Postgres databases, handle auth, realtime subscriptions, and file storage

**Version:** 2.88.0
**Category:** Backend-as-a-Service
**Bundle Size:** ~50kb (minified) / ~15kb (gzipped)
**Dependencies:** None (standalone)

---

## 🎯 What It Does

Supabase is an open-source Firebase alternative providing a complete backend solution. The JavaScript client enables direct database access via auto-generated REST APIs, real-time subscriptions, authentication, and file storage - all with Row Level Security (RLS) built-in.

**Best for:**
- Rapid prototyping with full-stack features
- Apps requiring real-time updates (chat, collaborative tools)
- Projects needing SQL database with type-safe queries
- Mobile apps with React Native support

**Not suitable for:**
- Offline-first apps (requires third-party sync solutions)
- Complex multi-tenant architectures without careful RLS design
- Applications requiring Firebase's extensive mobile SDK ecosystem

---

## 📦 Installation

### CDN

```html
<!-- Global variable -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- ES Module -->
<script type="module">
  import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
</script>
```

### npm

```bash
npm install @supabase/supabase-js
```

---

## ⚡ Quick Start

### Basic Setup

```javascript
import { createClient } from '@supabase/supabase-js'

// Initialize client (get URL and key from Supabase dashboard)
const supabase = createClient(
  'https://xyzcompany.supabase.co',
  'your-anon-key'
)

// Query data
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .limit(10)

if (error) console.error('Error:', error)
else console.log('Posts:', data)
```

### Expected Output

Returns an object with `data` (array of records) and `error` (null on success). All operations follow this pattern for consistent error handling.

---

## 🔧 Common Patterns

### Pattern 1: CRUD Operations

```javascript
// Create
const { data, error } = await supabase
  .from('users')
  .insert({ name: 'Alice', email: '[email protected]' })
  .select() // Add .select() to return inserted rows

// Read with filters
const { data } = await supabase
  .from('posts')
  .select('id, title, author:users(name)')
  .eq('published', true)
  .order('created_at', { ascending: false })
  .limit(20)

// Update
await supabase
  .from('posts')
  .update({ title: 'New Title' })
  .eq('id', postId)
  .select()

// Delete
await supabase
  .from('posts')
  .delete()
  .eq('id', postId)
```

**When to use:** All database interactions. Remember to add `.select()` to return modified rows.

### Pattern 2: Authentication

```javascript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: '[email protected]',
  password: 'secure-password'
})

// Sign in
const { data } = await supabase.auth.signInWithPassword({
  email: '[email protected]',
  password: 'secure-password'
})

// OAuth
await supabase.auth.signInWithOAuth({
  provider: 'google'
})

// Get current user
const { data: { user } } = await supabase.auth.getUser()

// Sign out
await supabase.auth.signOut()

// Listen to auth changes
supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session) // SIGNED_IN, SIGNED_OUT, etc.
})
```

**When to use:** User management flows. Note: Verify email is enabled by default (session is null until verified).

### Pattern 3: Realtime Subscriptions

```javascript
// Subscribe to database changes
const channel = supabase
  .channel('posts-channel')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'posts',
      filter: 'author_id=eq.123' // Optional filter
    },
    (payload) => {
      console.log('New post:', payload.new)
    }
  )
  .subscribe()

// Cleanup
channel.unsubscribe()
```

**When to use:** Real-time features. Enable replication on tables in dashboard first. Use filters client-side AND server-side (RLS) for security.

### Pattern 4: File Storage

```javascript
// Upload file
const file = event.target.files[0]
const { data, error } = await supabase.storage
  .from('avatars')
  .upload(`public/${user.id}/avatar.png`, file, {
    cacheControl: '3600',
    upsert: true // Overwrite if exists
  })

// Download file
const { data } = await supabase.storage
  .from('avatars')
  .download('public/avatar.png')

// Get public URL
const { data } = supabase.storage
  .from('avatars')
  .getPublicUrl('public/avatar.png')
```

**When to use:** File uploads. Use standard upload for <6MB, TUS resumable for larger files. React Native requires ArrayBuffer format.

---

## 📱 Mobile Considerations

### React Native Support
- ✅ Full support with official SDK
- ⚠️ Requires `@react-native-async-storage/async-storage` and `react-native-url-polyfill`
- ⚠️ File uploads must use ArrayBuffer (not Blob/FormData)

### Offline Handling
- ❌ No native offline support
- ⚠️ Third-party solutions required (WatermelonDB, PowerSync, RxDB)
- ⚠️ Auth sessions expire offline, logging users out

### Setup

```bash
npx expo install @supabase/supabase-js @react-native-async-storage/async-storage react-native-url-polyfill
```

---

## 🐛 Common Gotchas

### Issue 1: RLS Policies Not Set
**Problem:** Queries return empty arrays even with data present
**Solution:** Enable RLS and create policies for each operation (SELECT, INSERT, UPDATE, DELETE)
```sql
-- Example policy allowing users to read their own data
CREATE POLICY "Users can read own data" ON posts
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
```

### Issue 2: Performance with RLS
**Problem:** Slow queries with RLS policies
**Solution:** Wrap auth functions in SELECT for caching and add client-side filters
```javascript
// Add explicit filter matching RLS policy
const { data } = await supabase
  .from('posts')
  .select()
  .eq('user_id', userId) // Client filter + RLS = faster
```

### Issue 3: Insert/Update Returns No Data
**Problem:** CRUD operations return null data
**Solution:** Add `.select()` to return modified rows (default behavior changed in v2)
```javascript
const { data } = await supabase
  .from('posts')
  .insert({ title: 'Hello' })
  .select() // Required to get inserted row
```

### Issue 4: Service Role Key Misuse
**Problem:** Using service role key bypasses RLS but causes auth issues
**Solution:** Use separate clients for admin operations vs user operations. Never expose service key on frontend.

---

## 💡 Pro Tips

- Always add client-side filters that match your RLS policies for better performance
- Use `select('*')` sparingly - specify only needed columns
- Enable email confirmation in production but disable for development
- Use `upsert: true` on storage uploads to avoid "already exists" errors
- Realtime subscriptions count toward connection limits - clean up unused channels
- For IN queries in RLS, filter by parent ID not child ID for performance

---

## 🔗 Resources

- [Official Documentation](https://supabase.com/docs/reference/javascript/introduction)
- [GitHub Repository](https://github.com/supabase/supabase-js)
- [npm Package](https://www.npmjs.com/package/@supabase/supabase-js)
- [RLS Best Practices](https://supabase.com/docs/guides/database/postgres/row-level-security)

---

## 📊 Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 90+ | Full support (native fetch/WebSocket) |
| Firefox | 88+ | Full support |
| Safari | 14+ | Full support |
| Edge | 90+ | Full support |
| iOS Safari | 14+ | Full support |
| Android Chrome | 90+ | Full support |
| Node.js | 20+ | Node 18 EOL (April 2025), use v2.78.0 for Node 18 |
| Bun | Latest | Full support |

---

## 🆚 Alternatives

When to consider other libraries:
- **Firebase**: Better if you need Google ecosystem integration, extensive mobile SDKs, and proven scalability at massive scale
- **PocketBase**: Lighter and simpler for prototypes, single-binary deployment, and solo projects without scaling needs
- **Appwrite**: Better multi-language SDK support (Flutter, Swift, Kotlin), built-in pagination, simpler permission abstraction

---

## ⚠️ Breaking Changes

### v1 → v2
- `.insert()`, `.update()`, `.delete()` no longer return rows by default (add `.select()`)
- Auth methods restructured (`.signIn()` → `.signInWithPassword()`)
- Realtime channel API redesigned
- TypeScript improvements require proper generic types

### Node.js 18 Support Dropped
- Node 18 EOL: April 30, 2025
- Dropped in v2.79.0
- Use v2.78.0 if Node 18 required

---

**Last Updated:** 2025-12-19
**Verified Version:** 2.88.0
