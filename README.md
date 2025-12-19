# 🚀 awesome-js-libs-for-llms

> Curated JavaScript library documentation optimized for LLM code generation agents

[![Deploy](https://github.com/yourusername/awesome-js-libs-for-llms/actions/workflows/deploy.yml/badge.svg)](https://github.com/yourusername/awesome-js-libs-for-llms/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 Purpose

This project provides **LLM-optimized documentation** for 50+ popular JavaScript libraries commonly used in web development. Unlike standard documentation, this is specifically designed for consumption by AI code generation agents like Claude, GPT-4, and others.

### Why This Exists

LLMs often:
- ❌ Generate outdated code (wrong CDN links, old API syntax)
- ❌ Hallucinate methods that don't exist
- ❌ Miss mobile-specific considerations
- ❌ Don't know the latest library versions

This project solves these problems by providing:
- ✅ Always up-to-date CDN links
- ✅ Copy-paste ready code examples
- ✅ Mobile-first best practices
- ✅ Common gotchas highlighted
- ✅ Consistent format across all libraries
- ✅ Token-efficient documentation (500-2000 tokens per library)

## 📚 Documentation Format

Each library has:

1. **Quick Overview** - What it does, when to use it
2. **Installation** - CDN links (always current)
3. **Quick Start** - Copy-paste working example
4. **Common Patterns** - Real-world use cases
5. **Mobile Considerations** - Touch support, responsive behavior
6. **Gotchas** - Common mistakes and how to avoid them
7. **Pro Tips** - Best practices
8. **Resources** - Links to official docs

## 🔧 For LLM Developers

### Quick Start

```javascript
// Install the client
const client = new LibraryDocsClient({
  baseUrl: 'https://github.com/YUZU-Hub/awesome-js-libs-for-llms'
});

// Initialize at app startup (loads library index)
await client.init();

// Get minimal table for system prompt (20 top libraries)
const promptTable = client.getPromptTable({ limit: 20 });

// When LLM needs specific docs
const axiosDocs = await client.getDocs('axios');
```

### System Prompt Template

```markdown
You are a code generator with access to 50+ JavaScript libraries.

## Available Libraries
${client.getPromptTable({ limit: 20 })}

For detailed documentation, use: get_library_docs(library_id)
For library search, use: search_libraries(query)
```

### Tool Definitions

```json
{
  "name": "get_library_docs",
  "description": "Get detailed documentation for a JavaScript library",
  "parameters": {
    "library_id": "string (e.g., 'axios', 'chart-js')"
  }
}
```

See [integration guide](docs/INTEGRATION.md) for complete setup.

## 📖 Available Libraries (50)

### HTTP & AJAX
- [Axios](docs/libraries/axios.md) - Promise-based HTTP client
- [Fetch API](docs/libraries/fetch.md) - Native browser API

### Animation
- [GSAP](docs/libraries/gsap.md) - Professional animation library
- [Anime.js](docs/libraries/anime-js.md) - Lightweight animation
- [Lottie](docs/libraries/lottie-web.md) - After Effects animations
- [AOS](docs/libraries/aos.md) - Animate on scroll
- [ScrollReveal](docs/libraries/scrollreveal.md) - Scroll animations

### Charts & Visualization
- [Chart.js](docs/libraries/chart-js.md) - Simple HTML5 charts
- [D3.js](docs/libraries/d3-js.md) - Data-driven visualizations

### UI Frameworks
- [Bootstrap](docs/libraries/bootstrap.md) - CSS framework
- [Alpine.js](docs/libraries/alpine-js.md) - Lightweight reactive

### Sliders & Carousels
- [Swiper](docs/libraries/swiper.md) - Mobile touch slider
- [Glide.js](docs/libraries/glide-js.md) - Lightweight slider
- [Slick](docs/libraries/slick-carousel.md) - Responsive carousel
- [Flickity](docs/libraries/flickity.md) - Touch-friendly gallery

### Mobile & Touch
- [Hammer.js](docs/libraries/hammer-js.md) - Touch gestures
- [Leaflet](docs/libraries/leaflet.md) - Mobile-friendly maps

[See full list →](docs/LIBRARIES.md)

## 🤝 Contributing

We welcome contributions! Here's how:

### Adding a New Library

1. Fork this repo
2. Add metadata to `docs/index.json`
3. Create documentation in `docs/libraries/your-library.md`
4. Follow the [template](templates/library-doc.md)
5. Run validation: `npm run validate`
6. Submit a PR

### Updating Existing Documentation

1. Edit the markdown file in `docs/libraries/`
2. Update version in `docs/index.json` if needed
3. Run validation
4. Submit a PR

### Documentation Guidelines

- **Be concise** - 500-2000 tokens per library
- **Include working examples** - Copy-paste ready
- **Highlight gotchas** - Common mistakes
- **Mobile-first** - Always mention mobile considerations
- **Keep it current** - Latest version and syntax

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 🔄 Automation

This project includes automated workflows:

- ✅ **Deploy on merge** - Auto-deploys to GitHub Pages
- ✅ **Validation on PR** - Checks schemas, links, format
- ✅ **Weekly version check** - Monitors for library updates
- ✅ **Monthly link check** - Verifies all CDNs are alive

## 📊 Project Stats

- 50+ libraries documented
- 20+ categories
- 100% CDN link validation
- Auto-updated weekly
- MIT Licensed

## 🌟 Who Uses This?

- AI code generation agents (Claude, GPT-4, etc.)
- Developer tools with AI features
- Code completion engines
- Educational platforms
- Any tool that generates JavaScript code

## 🔗 Resources

- **Live Documentation**: https://yuzu-hub.github.com/awesome-js-libs-for-llms/
- **API Endpoint**: `https://yuzu-hub.github.com/awesome-js-libs-for-llms/index.json`

## 📜 License

MIT License - see [LICENSE](LICENSE) for details

## 🙏 Acknowledgments

- All the amazing library maintainers
- CDN providers (jsDelivr, unpkg, Cloudflare)
- Contributors who keep docs updated

## 💬 Community

- **Issues**: [Report bugs or request libraries](https://github.com/YUZU-Hub/awesome-js-libs-for-llms/issues)
- **Discussions**: [Ask questions or share ideas](https://github.com/YUZU-Hub/awesome-js-libs-for-llms/discussions)
- **Twitter**: [@stefanlh](https://twitter.com/stefanlh)

---

**Made with ❤️ for the AI code generation community**

*If this helped your project, give it a ⭐ to help others discover it!*