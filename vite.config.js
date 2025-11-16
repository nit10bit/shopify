import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readdirSync, statSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getEntryPoints() {
  const entries = {};
  const srcPath = resolve(__dirname, 'src');
  
  if (!existsSync(srcPath)) {
    console.warn('/src/ must exist.');
    return entries;
  }
  
  function scanDirectory(dir, prefix = '') {
    const items = readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = statSync(fullPath);
      
      if (stat.isFile() && (item.endsWith('.js') || item.endsWith('.css'))) {
        const name = path.parse(item).name;
        const entryName = prefix ? `${prefix}-${name}` : name;
        entries[entryName] = fullPath;
      } else if (stat.isDirectory()) {
        scanDirectory(fullPath, prefix ? `${prefix}-${item}` : item);
      }
    });
  }
  
  scanDirectory(srcPath);

  return entries;
}

export default defineConfig({
  publicDir: 'public',
  build: {
    outDir: './assets',
    emptyOutDir: true,
    copyPublicDir: true,
    rollupOptions: {
      input: getEntryPoints(),
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    },
    minify: 'terser',
    sourcemap: false,
    cssMinify: true
  }
});