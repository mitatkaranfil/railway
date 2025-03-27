const fs = require('fs-extra');
const { execSync } = require('child_process');
const path = require('path');

// React uygulamasını build et
console.log('Frontend uygulaması build ediliyor...');
execSync('cd telo-mini-fronted && npm run build', { stdio: 'inherit' });

// Build klasörünü Laravel public klasörüne kopyala
console.log('Build dosyaları backend/public klasörüne kopyalanıyor...');
fs.copySync(
  path.join(__dirname, 'telo-mini-fronted', 'build'),
  path.join(__dirname, 'telo-mini-backend', 'public'),
  { overwrite: true }
);

console.log('Frontend ve backend başarıyla birleştirildi!');
