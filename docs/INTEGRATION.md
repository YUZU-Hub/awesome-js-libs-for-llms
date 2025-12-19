# Integration Guide

Complete guide for integrating this library documentation into your LLM-powered application.

## Quick Start

```javascript
const client = new LibraryDocsClient({
  baseUrl: 'https://yuzuhub.github.io/awesome-js-libs-for-llms'
});

await client.init();
```

## System Prompt Setup

Include the library table in your system prompt to give the LLM awareness of available libraries:

```javascript
const systemPrompt = `You are a code generator with access to JavaScript library documentation.

## Available Libraries
${client.getPromptTable({ limit: 20 })}

When you need detailed documentation for a library, use the get_library_docs tool.
When searching for libraries by functionality, use the search_libraries tool.
`;
```

## Tool Definitions

### get_library_docs

```json
{
  "name": "get_library_docs",
  "description": "Get detailed documentation for a JavaScript library including CDN links, code examples, and mobile considerations",
  "parameters": {
    "type": "object",
    "properties": {
      "library_id": {
        "type": "string",
        "description": "Library ID (e.g., 'axios', 'chart-js', 'gsap')"
      }
    },
    "required": ["library_id"]
  }
}
```

### search_libraries

```json
{
  "name": "search_libraries",
  "description": "Search JavaScript libraries by name, category, or keyword",
  "parameters": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "Search term (name, category, or keyword)"
      }
    },
    "required": ["query"]
  }
}
```

### get_libraries_by_category

```json
{
  "name": "get_libraries_by_category",
  "description": "Get all libraries in a specific category",
  "parameters": {
    "type": "object",
    "properties": {
      "category": {
        "type": "string",
        "enum": [
          "http", "animation", "charts", "ui-framework",
          "slider-carousel", "forms", "maps", "media",
          "utilities", "3d-graphics", "touch-gestures",
          "notifications", "date-time", "drag-drop",
          "modals-alerts", "lazy-loading", "syntax-highlighting",
          "lightbox-gallery", "scrolling", "validation"
        ]
      }
    },
    "required": ["category"]
  }
}
```

## Tool Handler Implementation

```javascript
const client = new LibraryDocsClient();

async function handleToolCall(toolName, parameters) {
  if (!client.index) {
    await client.init();
  }

  switch (toolName) {
    case "search_libraries":
      return client.search(parameters.query);

    case "get_library_docs":
      const docs = await client.getDocs(parameters.library_id);
      return docs.markdown;

    case "get_libraries_by_category":
      return client.getByCategory(parameters.category);

    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}
```

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/index.json` | Full library index with metadata |
| `/quick-reference.json` | Minimal data for prompt inclusion |
| `/libraries/{id}.md` | Full documentation for a library |

## Client Methods

| Method | Description |
|--------|-------------|
| `init()` | Load library index (call once at startup) |
| `getLibraryList()` | Get all library metadata |
| `search(query)` | Search by name, description, or tags |
| `getByCategory(category)` | Get libraries in a category |
| `getDocs(libraryId)` | Fetch full markdown documentation |
| `getBulkDocs(ids)` | Fetch multiple docs at once |
| `getPromptTable(options)` | Get formatted table for system prompt |

## Caching

The client automatically caches fetched documentation. To clear:

```javascript
client.clearCache();
```

## Error Handling

```javascript
try {
  const docs = await client.getDocs('unknown-library');
} catch (error) {
  if (error.message.includes('not found')) {
    // Library doesn't exist - suggest alternatives
    const similar = client.search('unknown');
  }
}
```

## Best Practices

1. **Initialize once** - Call `init()` at app startup, not per request
2. **Use prompt table** - Include top libraries in system prompt for awareness
3. **Fetch on demand** - Only fetch full docs when LLM requests specific library
4. **Handle mobile** - Check `mobile.friendly` flag when generating mobile code
5. **Check dependencies** - Some libraries require others (e.g., Slick requires jQuery)
