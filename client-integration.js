/**
 * Library Documentation Client
 * Fetches curated JS library documentation for LLM code generation
 * 
 * Usage:
 *   const client = new LibraryDocsClient();
 *   await client.init(); // Load index at startup
 *   const docs = await client.getDocs('axios');
 */

class LibraryDocsClient {
  constructor(options = {}) {
    // Default to GitHub Pages URL, can be overridden
    this.baseUrl = options.baseUrl || 'https://yourusername.github.io/awesome-js-libs-for-llms';
    this.cache = new Map();
    this.index = null;
    this.quickRef = null;
  }

  /**
   * Initialize - load library index at app startup
   * Call this once when your app starts
   */
  async init() {
    console.log('Loading library index...');
    
    try {
      const response = await fetch(`${this.baseUrl}/index.json`);
      if (!response.ok) {
        throw new Error(`Failed to load index: ${response.status}`);
      }
      
      this.index = await response.json();
      console.log(`✅ Loaded ${this.index.libraries.length} libraries`);
      
      // Also load quick reference for prompt usage
      const quickRefResponse = await fetch(`${this.baseUrl}/quick-reference.json`);
      this.quickRef = await quickRefResponse.json();
      
      return this.index;
    } catch (error) {
      console.error('Failed to initialize library docs:', error);
      throw error;
    }
  }

  /**
   * Get list of all libraries (requires init() first)
   */
  getLibraryList() {
    if (!this.index) {
      throw new Error('Client not initialized. Call init() first.');
    }
    return this.index.libraries;
  }

  /**
   * Get quick reference (minimal info for prompt inclusion)
   */
  getQuickReference() {
    if (!this.quickRef) {
      throw new Error('Client not initialized. Call init() first.');
    }
    return this.quickRef;
  }

  /**
   * Get libraries by category
   */
  getByCategory(category) {
    if (!this.quickRef) {
      throw new Error('Client not initialized. Call init() first.');
    }
    return this.quickRef.categories[category] || [];
  }

  /**
   * Search libraries by name or tags
   */
  search(query) {
    if (!this.index) {
      throw new Error('Client not initialized. Call init() first.');
    }
    
    const lowerQuery = query.toLowerCase();
    
    return this.index.libraries.filter(lib => 
      lib.name.toLowerCase().includes(lowerQuery) ||
      lib.id.includes(lowerQuery) ||
      lib.description.toLowerCase().includes(lowerQuery) ||
      lib.tags.some(tag => tag.includes(lowerQuery))
    );
  }

  /**
   * Get library metadata by ID
   */
  getLibraryMeta(libraryId) {
    if (!this.index) {
      throw new Error('Client not initialized. Call init() first.');
    }
    
    return this.index.libraries.find(lib => lib.id === libraryId);
  }

  /**
   * Get full documentation for a library (markdown)
   * Returns cached version if available
   */
  async getDocs(libraryId) {
    // Check cache first
    if (this.cache.has(libraryId)) {
      return this.cache.get(libraryId);
    }

    const meta = this.getLibraryMeta(libraryId);
    if (!meta) {
      throw new Error(`Library not found: ${libraryId}`);
    }

    try {
      const response = await fetch(`${this.baseUrl}/${meta.docs.local}`);
      if (!response.ok) {
        throw new Error(`Failed to load docs: ${response.status}`);
      }

      const markdown = await response.text();
      
      // Cache it
      this.cache.set(libraryId, {
        id: libraryId,
        name: meta.name,
        version: meta.version,
        markdown,
        meta
      });

      return this.cache.get(libraryId);
    } catch (error) {
      console.error(`Failed to load docs for ${libraryId}:`, error);
      throw error;
    }
  }

  /**
   * Get documentation for multiple libraries at once
   */
  async getBulkDocs(libraryIds) {
    const results = await Promise.allSettled(
      libraryIds.map(id => this.getDocs(id))
    );

    return results.map((result, index) => ({
      id: libraryIds[index],
      success: result.status === 'fulfilled',
      data: result.status === 'fulfilled' ? result.value : null,
      error: result.status === 'rejected' ? result.reason.message : null
    }));
  }

  /**
   * Get minimal info formatted for LLM prompt
   * Returns a compact table suitable for system prompt
   */
  getPromptTable(options = {}) {
    if (!this.quickRef) {
      throw new Error('Client not initialized. Call init() first.');
    }

    const { category, limit } = options;
    let libs = this.quickRef.libraries;

    // Filter by category if specified
    if (category) {
      libs = this.quickRef.categories[category] || [];
    }

    // Limit if specified
    if (limit) {
      libs = libs.slice(0, limit);
    }

    // Format as markdown table
    let table = '| Name | Version | Category | CDN | Description |\n';
    table += '|------|---------|----------|-----|-------------|\n';

    libs.forEach(lib => {
      table += `| ${lib.name} | ${lib.version} | ${lib.category} | [CDN](${lib.cdn}) | ${lib.description} |\n`;
    });

    return table;
  }

  /**
   * Clear cache (useful if you want to force refresh)
   */
  clearCache() {
    this.cache.clear();
    console.log('Cache cleared');
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// Export for various module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LibraryDocsClient;
}
if (typeof window !== 'undefined') {
  window.LibraryDocsClient = LibraryDocsClient;
}

// ===== USAGE EXAMPLES =====

async function exampleUsage() {
  // Initialize the client
  const client = new LibraryDocsClient({
    baseUrl: 'https://yourusername.github.io/awesome-js-libs-for-llms'
  });

  // Load index at app startup (do this once)
  await client.init();

  // ===== For LLM System Prompt =====
  
  // Get minimal table for prompt (all libraries)
  const promptTable = client.getPromptTable();
  
  // Or just animation libraries
  const animationTable = client.getPromptTable({ 
    category: 'animation' 
  });
  
  // Or top 20 most common
  const top20 = client.getPromptTable({ 
    limit: 20 
  });

  // ===== For On-Demand Documentation =====
  
  // When LLM needs full docs
  const axiosDocs = await client.getDocs('axios');
  console.log(axiosDocs.markdown); // Full markdown documentation
  
  // Search for libraries
  const chartLibs = client.search('chart');
  console.log(chartLibs); // Returns Chart.js, D3.js, etc.
  
  // Get by category
  const sliders = client.getByCategory('slider-carousel');
  console.log(sliders); // Returns Swiper, Glide.js, Slick, etc.
  
  // Load multiple docs at once
  const docs = await client.getBulkDocs(['axios', 'chart-js', 'gsap']);
  docs.forEach(doc => {
    if (doc.success) {
      console.log(`Loaded: ${doc.data.name}`);
    }
  });
}

// ===== INTEGRATION WITH LLM TOOLS =====

/**
 * Tool definition for Claude/GPT function calling
 */
const libraryDocsTools = [
  {
    name: "search_libraries",
    description: "Search JavaScript libraries by name, category, or use case",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search term (name, category, or keyword)"
        }
      },
      required: ["query"]
    }
  },
  {
    name: "get_library_docs",
    description: "Get detailed documentation for a specific library",
    parameters: {
      type: "object",
      properties: {
        library_id: {
          type: "string",
          description: "Library ID (e.g., 'axios', 'chart-js')"
        }
      },
      required: ["library_id"]
    }
  },
  {
    name: "get_libraries_by_category",
    description: "Get all libraries in a specific category",
    parameters: {
      type: "object",
      properties: {
        category: {
          type: "string",
          enum: [
            "http", "animation", "charts", "ui-framework",
            "slider-carousel", "forms", "maps", "media",
            "utilities", "3d-graphics", "touch-gestures",
            "notifications", "date-time", "drag-drop",
            "modals-alerts", "lazy-loading", "syntax-highlighting",
            "lightbox-gallery", "scrolling", "validation"
          ]
        }
      },
      required: ["category"]
    }
  }
];

/**
 * Tool handler functions
 */
const client = new LibraryDocsClient();

async function handleToolCall(toolName, parameters) {
  // Make sure client is initialized
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