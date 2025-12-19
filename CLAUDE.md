# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a documentation repository providing LLM-optimized documentation for 50+ popular JavaScript libraries. The documentation is designed for AI code generation agents, featuring token-efficient content (500-2000 tokens per library), up-to-date CDN links, and mobile-first best practices.

## Repository Structure

- `docs/index.json` - Main library index with metadata for all libraries (follows `schema/library.schema.json`)
- `docs/libraries/*.md` - Individual library documentation files
- `templates/library-doc.md` - Template for new library docs (required sections and format)
- `schema/library.schema.json` - JSON Schema for validating index.json
- `scripts/` - Validation and automation scripts
- `client-integration.js` - JavaScript client for fetching documentation

## Common Commands

```bash
# Validate all JSON schemas and check markdown files exist
node scripts/validate-schema.js

# Verify all CDN links are accessible
node scripts/check-cdn-links.js

# Install dependencies for scripts (ajv, ajv-formats)
cd scripts && npm install ajv ajv-formats
```

## Adding a New Library

1. Add entry to `docs/index.json` with required fields:
   - `id`: kebab-case unique identifier
   - `name`, `version`, `description` (max 100 chars), `category`
   - `cdn`: object with `js` URL (required), `css` URL (optional)
   - `docs`: object with `local` path (`libraries/name.md`), `official` URL
   - `mobile`: object with `friendly` (required), `touch`, `responsive` booleans

2. Create documentation at `docs/libraries/{id}.md` using `templates/library-doc.md`

3. Required markdown sections (in order):
   - Header with version, category, size, dependencies
   - 🎯 What It Does (best for/not suitable for)
   - 📦 Installation (CDN links)
   - ⚡ Quick Start
   - 🔧 Common Patterns
   - 📱 Mobile Considerations
   - 🐛 Common Gotchas
   - 💡 Pro Tips
   - 🔗 Resources
   - 📊 Browser Support
   - 🆚 Alternatives
   - ⚠️ Breaking Changes

## Library Categories

Valid categories in index.json: `http`, `animation`, `charts`, `ui-framework`, `slider-carousel`, `forms`, `maps`, `media`, `utilities`, `3d-graphics`, `touch-gestures`, `notifications`, `date-time`, `drag-drop`, `modals-alerts`, `lazy-loading`, `syntax-highlighting`, `lightbox-gallery`, `scrolling`, `validation`, `other`

## Documentation Guidelines

- Target 500-2000 tokens per library (500-800 for simple, 800-1500 for medium, 1500-2000 for complex)
- All code examples must be copy-paste ready and tested
- Use emojis for visual scanning (🎯 📱 🐛 💡 etc.)
- Mark correct approaches with ✅ and wrong approaches with ❌
- Always include mobile considerations and common gotchas
- Keep CDN links current (jsDelivr, unpkg, Cloudflare)

## CI/CD Workflows

- `validate.yml` - Runs on PRs: validates JSON schemas, CDN links, markdown format
- `deploy.yml` - Auto-deploys to GitHub Pages on merge to main
- `weekly-update.yml` - Monitors for library version updates
- `link-check.yml` - Monthly CDN link verification
