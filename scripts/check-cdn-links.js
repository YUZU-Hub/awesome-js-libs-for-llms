// scripts/check-cdn-links.js
// Verifies all CDN links are accessible

const fs = require('fs');
const path = require('path');
const https = require('https');

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { method: 'HEAD' }, (res) => {
      resolve({ url, status: res.statusCode, ok: res.statusCode === 200 });
    }).on('error', (err) => {
      resolve({ url, status: 0, ok: false, error: err.message });
    });
  });
}

async function checkAllLinks() {
  const indexData = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../docs/index.json'), 'utf8')
  );

  console.log('Checking CDN links...\n');
  
  const results = [];
  
  for (const lib of indexData.libraries) {
    // Check JS CDN
    const jsResult = await checkUrl(lib.cdn.js);
    results.push({ library: lib.name, type: 'JS', ...jsResult });
    
    // Check CSS CDN if exists
    if (lib.cdn.css) {
      const cssResult = await checkUrl(lib.cdn.css);
      results.push({ library: lib.name, type: 'CSS', ...cssResult });
    }
    
    process.stdout.write('.');
  }
  
  console.log('\n');
  
  const failed = results.filter(r => !r.ok);
  
  if (failed.length > 0) {
    console.error('❌ Some CDN links failed:\n');
    failed.forEach(f => {
      console.error(`  ${f.library} (${f.type}): ${f.url}`);
      console.error(`    Status: ${f.status} ${f.error || ''}\n`);
    });
    process.exit(1);
  }
  
  console.log(`✅ All ${results.length} CDN links are accessible!`);
  process.exit(0);
}

checkAllLinks();