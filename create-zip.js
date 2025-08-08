const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

// Create a file to stream archive data to
const output = fs.createWriteStream('tunecast-music-app.zip');
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level
});

// Listen for all archive data to be written
output.on('close', function() {
  console.log('✅ Zip file created successfully!');
  console.log(`📦 Total size: ${archive.pointer()} bytes`);
  console.log('📁 File: tunecast-music-app.zip');
});

// Good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    console.warn('Warning:', err);
  } else {
    throw err;
  }
});

// Good practice to catch this error explicitly
archive.on('error', function(err) {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Files and directories to exclude
const excludePatterns = [
  'node_modules',
  '.git',
  'dist',
  'build',
  '.env',
  '.env.local',
  '.env.production',
  '.env.development',
  '*.log',
  '.DS_Store',
  'tunecast-music-app.zip',
  'create-zip.js'
];

// Function to check if a file/directory should be excluded
function shouldExclude(filePath) {
  return excludePatterns.some(pattern => {
    if (pattern.includes('*')) {
      // Handle wildcard patterns
      const regex = new RegExp(pattern.replace('*', '.*'));
      return regex.test(path.basename(filePath));
    }
    return filePath.includes(pattern);
  });
}

// Add all files and directories recursively, excluding specified patterns
function addDirectory(dirPath, zipPath = '') {
  const items = fs.readdirSync(dirPath);
  
  items.forEach(item => {
    const fullPath = path.join(dirPath, item);
    const relativePath = zipPath ? path.join(zipPath, item) : item;
    
    if (shouldExclude(fullPath)) {
      console.log(`⏭️  Skipping: ${relativePath}`);
      return;
    }
    
    const stats = fs.statSync(fullPath);
    
    if (stats.isDirectory()) {
      addDirectory(fullPath, relativePath);
    } else {
      archive.file(fullPath, { name: relativePath });
      console.log(`📄 Adding: ${relativePath}`);
    }
  });
}

console.log('🚀 Creating zip file...');
addDirectory('.');

// Finalize the archive (ie we are done appending files but streams have to finish yet)
archive.finalize();