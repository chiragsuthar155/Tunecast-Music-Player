const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

async function createProjectZip() {
  const output = fs.createWriteStream('tunecast-music-app.zip');
  const archive = archiver('zip', {
    zlib: { level: 9 } // Maximum compression
  });

  return new Promise((resolve, reject) => {
    output.on('close', () => {
      console.log(`✅ ZIP file created successfully!`);
      console.log(`📦 Total bytes: ${archive.pointer()}`);
      console.log(`📁 File: tunecast-music-app.zip`);
      resolve();
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);

    // Add all project files except excluded ones
    const excludePatterns = [
      'node_modules/**',
      '.git/**',
      'dist/**',
      'build/**',
      '.env',
      '.env.local',
      '.env.production',
      '*.log',
      '.DS_Store',
      'tunecast-music-app.zip',
      'create-project-zip.js'
    ];

    // Add all files in the current directory
    archive.glob('**/*', {
      ignore: excludePatterns,
      dot: true
    });

    archive.finalize();
  });
}

createProjectZip().catch(console.error);