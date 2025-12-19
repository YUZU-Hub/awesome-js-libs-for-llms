// scripts/validate-schema.js
// Validates all JSON files against schemas

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Load schemas
const indexSchema = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../schema/library.schema.json'), 'utf8')
);

// Compile schema
const validateIndex = ajv.compile(indexSchema);

// Load and validate index.json
const indexData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../docs/index.json'), 'utf8')
);

console.log('Validating index.json...');
const valid = validateIndex(indexData);

if (!valid) {
  console.error('❌ Validation failed!');
  console.error(JSON.stringify(validateIndex.errors, null, 2));
  process.exit(1);
}

// Verify all referenced markdown files exist
console.log('\nChecking markdown files...');
let missingFiles = 0;

indexData.libraries.forEach(lib => {
  const mdPath = path.join(__dirname, '../docs', lib.docs.local);
  if (!fs.existsSync(mdPath)) {
    console.error(`❌ Missing: ${lib.docs.local} for ${lib.name}`);
    missingFiles++;
  }
});

if (missingFiles > 0) {
  console.error(`\n❌ ${missingFiles} markdown files are missing!`);
  process.exit(1);
}

console.log('✅ All validations passed!');
console.log(`✅ ${indexData.libraries.length} libraries validated`);
console.log(`✅ All markdown files exist`);