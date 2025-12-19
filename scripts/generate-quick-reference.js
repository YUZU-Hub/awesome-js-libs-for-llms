// scripts/generate-quick-reference.js
// Creates minimal quick-reference.json for prompt inclusion

const fs = require('fs');
const path = require('path');

function generateQuickReference() {
  const indexData = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../docs/index.json'), 'utf8')
  );

  const quickRef = {
    version: indexData.version,
    updated: indexData.updated,
    libraries: indexData.libraries.map(lib => ({
      id: lib.id,
      name: lib.name,
      version: lib.version,
      category: lib.category,
      cdn: lib.cdn.js,
      description: lib.description
    }))
  };
  
  // Group by category
  const byCategory = {};
  quickRef.libraries.forEach(lib => {
    if (!byCategory[lib.category]) {
      byCategory[lib.category] = [];
    }
    byCategory[lib.category].push(lib);
  });
  
  quickRef.categories = byCategory;
  
  fs.writeFileSync(
    path.join(__dirname, '../docs/quick-reference.json'),
    JSON.stringify(quickRef, null, 2)
  );
  
  console.log('✅ Generated quick-reference.json');
  console.log(`   ${quickRef.libraries.length} libraries organized into ${Object.keys(byCategory).length} categories`);
}

generateQuickReference();