// scripts/update-versions.js
// Checks npm for latest versions (run weekly)

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function getLatestVersion(packageName) {
  try {
    const result = execSync(`npm view ${packageName} version`, { encoding: 'utf8' });
    return result.trim();
  } catch (error) {
    return null;
  }
}

async function checkVersions() {
  const indexData = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../docs/index.json'), 'utf8')
  );

  console.log('Checking for version updates...\n');
  
  const updates = [];
  
  for (const lib of indexData.libraries) {
    if (!lib.docs.npm) continue;
    
    const currentVersion = lib.version;
    const latestVersion = getLatestVersion(lib.docs.npm);
    
    if (latestVersion && latestVersion !== currentVersion) {
      updates.push({
        name: lib.name,
        current: currentVersion,
        latest: latestVersion,
        npm: lib.docs.npm
      });
      console.log(`📦 ${lib.name}: ${currentVersion} → ${latestVersion}`);
    }
  }
  
  if (updates.length > 0) {
    console.log(`\n🔄 ${updates.length} libraries have updates available`);
    
    // Write to file for GitHub Actions to create PR
    fs.writeFileSync(
      path.join(__dirname, '../version-updates.json'),
      JSON.stringify(updates, null, 2)
    );
  } else {
    console.log('\n✅ All libraries are up to date!');
  }
}

checkVersions();