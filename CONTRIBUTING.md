# Contributing to awesome-js-libs-for-llms

Thank you for contributing! This project aims to be the definitive resource for LLM code generation with JavaScript libraries.

## 🎯 What We're Looking For

- **New library documentation** - Popular, mobile-friendly JS libraries
- **Updates to existing docs** - New versions, API changes, better examples
- **Improvements** - Better formatting, clearer explanations, more examples
- **Bug fixes** - Broken links, incorrect info, typos

## ⚡ Quick Contribution

### Adding a New Library

1. **Check if it's suitable:**
   - ✅ Popular (10K+ npm weekly downloads OR 1K+ GitHub stars)
   - ✅ Mobile-friendly (works well on touch devices)
   - ✅ Available via CDN (jsDelivr, unpkg, etc.)
   - ✅ Actively maintained (updated in last 6 months)
   - ✅ Stable (not alpha/beta unless clearly marked)

2. **Fork and clone:**
   ```bash
   git clone https://github.com/YUZU-Hub/awesome-js-libs-for-llms.git
   cd awesome-js-libs-for-llms
   npm install
   ```

3. **Add to index.json:**
   ```json
   {
     "id": "your-library",
     "name": "Your Library",
     "version": "1.2.3",
     "description": "One-line description (max 100 chars)",
     "category": "appropriate-category",
     "tags": ["tag1", "tag2"],
     "cdn": {
       "js": "https://cdn.jsdelivr.net/npm/...",
       "css": "https://cdn.jsdelivr.net/npm/..." // if applicable
     },
     "docs": {
       "local": "libraries/your-library.md",
       "official": "https://...",
       "npm": "package-name"
     },
     "mobile": {
       "friendly": true,
       "touch": true,
       "responsive": true
     },
     "dependencies": []
   }
   ```

4. **Create documentation:**
   ```bash
   cp templates/library-doc.md docs/libraries/your-library.md
   # Edit the file following the template
   ```

5. **Validate:**
   ```bash
   npm run validate
   npm run check-links
   ```

6. **Submit PR:**
   - Create a descriptive PR title: `feat: add [Library Name]`
   - Include why this library is useful
   - Mention any special considerations

## 📝 Documentation Guidelines

### Structure (Required)

Every library doc MUST have these sections in this order:

1. **Header** - Name, version, category, size, dependencies
2. **🎯 What It Does** - Purpose, best uses, not suitable for
3. **📦 Installation** - CDN links (both CSS and JS if needed)
4. **⚡ Quick Start** - Minimal working example (5-10 lines)
5. **🔧 Common Patterns** - 3-5 real-world examples
6. **📱 Mobile Considerations** - Touch, responsive, iOS/Android gotchas
7. **🐛 Common Gotchas** - Mistakes and solutions
8. **💡 Pro Tips** - Best practices (optional but encouraged)
9. **🔗 Resources** - Official docs, GitHub, npm
10. **📊 Browser Support** - Compatibility table
11. **🆚 Alternatives** - When to use other libraries
12. **⚠️ Breaking Changes** - Major version changes

### Writing Style

**DO:**
- ✅ Write for LLMs (concise, structured, token-efficient)
- ✅ Use working, copy-paste ready code examples
- ✅ Include comments in code explaining what it does
- ✅ Highlight common mistakes with ❌ and solutions with ✅
- ✅ Use emojis for visual scanning (🎯 📱 🐛 etc.)
- ✅ Keep examples realistic (actual use cases, not foo/bar)
- ✅ Test all code examples before submitting

**DON'T:**
- ❌ Write long prose paragraphs (LLMs prefer structured info)
- ❌ Include every possible API method (focus on 80% use cases)
- ❌ Copy-paste from official docs (summarize and optimize)
- ❌ Use placeholders like "your-api-key" without context
- ❌ Forget mobile considerations
- ❌ Include outdated syntax or deprecated methods

### Code Examples

```javascript
// ✅ GOOD: Real example with context
async function fetchUsers() {
  try {
    const response = await axios.get('https://api.example.com/users');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch:', error.message);
    throw error;
  }
}

// ❌ BAD: Too abstract
axios.get(url).then(callback).catch(errorCallback);
```

### Token Efficiency

Target: 500-2000 tokens per library

- **Short libraries** (simple utilities): 500-800 tokens
- **Medium libraries** (most cases): 800-1500 tokens  
- **Complex libraries** (3D, charts, frameworks): 1500-2000 tokens

Use this prompt to check token count:
```
Count tokens in this markdown: [paste your doc]
```

## 🔍 Review Process

1. **Automated checks** run on your PR:
   - JSON schema validation
   - CDN link verification
   - Markdown format check
   - Token count check

2. **Human review** looks for:
   - Accuracy of information
   - Quality of examples
   - Completeness of mobile considerations
   - Writing clarity and structure

3. **Approval** - Once approved, it auto-deploys!

## 🐛 Updating Existing Documentation

### Version Updates

When a library releases a new version:

1. Update `version` in `docs/index.json`
2. Update CDN links if they changed
3. Check if API changed (read changelog)
4. Update code examples if syntax changed
5. Add to "Breaking Changes" section if major version
6. Update "Last Updated" date at bottom

### Fixing Errors

1. Open an issue describing the problem
2. Submit a PR with the fix
3. Reference the issue in your PR

## 📊 Categories

Use one of these existing categories:

- `http` - AJAX, fetch, API clients
- `animation` - Animations, transitions, effects
- `charts` - Data visualization, graphs
- `ui-framework` - CSS frameworks, component libraries
- `slider-carousel` - Sliders, carousels, galleries
- `forms` - Form validation, input formatting
- `maps` - Mapping libraries
- `media` - Video, audio players
- `utilities` - Helper functions, data manipulation
- `2d-graphics` - 2D rendering, Canvas, sprites
- `3d-graphics` - 3D rendering, WebGL
- `game-engine` - Game frameworks, physics engines
- `physics` - Physics simulation, collision detection
- `audio` - Sound effects, music playback
- `touch-gestures` - Touch/gesture recognition
- `notifications` - Toast, alerts, notifications
- `date-time` - Date/time handling
- `drag-drop` - Drag and drop functionality
- `modals-alerts` - Modals, dialogs, popups
- `lazy-loading` - Lazy loading images/content
- `syntax-highlighting` - Code syntax highlighting
- `lightbox-gallery` - Image lightboxes
- `scrolling` - Scroll effects, parallax
- `validation` - Form/data validation
- `storage` - Client-side storage, offline data
- `backend` - Backend-as-a-service clients
- `communication` - WebRTC, VoIP, real-time
- `pwa` - Progressive Web App utilities
- `other` - Doesn't fit above

## ✅ Checklist Before Submitting

- [ ] Library is popular and actively maintained
- [ ] Added to `docs/index.json` with all required fields
- [ ] Created documentation following template
- [ ] All code examples tested and working
- [ ] Mobile considerations included
- [ ] Common gotchas documented
- [ ] CDN links verified working
- [ ] Token count is 500-2000
- [ ] Ran `npm run validate` successfully
- [ ] Ran `npm run check-links` successfully
- [ ] No linting errors
- [ ] PR title follows format: `feat: add LibraryName` or `fix: update LibraryName`

## 🎨 Style Guide

### Markdown Formatting

```markdown
# Library Name (H1 - only once at top)

## 🎯 Section Name (H2 - for main sections)

### Subsection (H3 - for subsections)

**Bold** for emphasis
`code` for inline code
```

### Emoji Usage

Use these standard emojis:

- 🎯 What It Does
- 📦 Installation
- ⚡ Quick Start
- 🔧 Common Patterns
- 📱 Mobile Considerations
- 🐛 Common Gotchas
- 💡 Pro Tips
- 🔗 Resources
- 📊 Browser Support
- 🆚 Alternatives
- ⚠️ Breaking Changes

For inline:
- ✅ Correct way
- ❌ Wrong way
- 📝 Note
- 🔴 Important

## 🚫 What We Don't Accept

- Libraries with < 1K GitHub stars AND < 5K weekly npm downloads
- Abandoned projects (no updates in 1+ year)
- Libraries that only work on desktop
- Beta/alpha software (unless extremely popular)
- Frameworks (React, Vue, Angular) - too complex for this format
- Build tools (Webpack, Vite) - different use case
- Backend-only libraries - this is for browser JavaScript

## 💬 Questions?

- **GitHub Discussions**: For general questions
- **Issues**: For specific problems or suggestions
- **Twitter**: [@stefanlh](https://twitter.com/stefanlh)

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for making the web more accessible for AI code generation! 🚀