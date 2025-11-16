import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readdirSync, statSync, existsSync, cpSync, rmSync, unlinkSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Preventing from get root folder dumped with caching files
function cleanOldTimestamps() {
  try {
    const files = readdirSync(__dirname);
    const timestampFiles = files
      .filter(f => f.includes('.timestamp-'))
      .map(f => ({
        name: f,
        path: path.join(__dirname, f),
        time: statSync(path.join(__dirname, f)).mtimeMs
      }))
      .sort((a, b) => b.time - a.time);

    timestampFiles.slice(1).forEach(file => {
      try {
        unlinkSync(file.path);
      } catch (e) {}
    });
  } catch (e) {}
}

cleanOldTimestamps();

function getEntryPoints() {
  const entries = {};
  const srcPath = resolve(__dirname, 'src');
  
  if (!existsSync(srcPath)) {
    return entries;
  }

  // Preventing from break the build when src is empty
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

const entries = getEntryPoints();
const startTime = Date.now();

if (Object.keys(entries).length === 0) {
  const publicPath = resolve(__dirname, 'public');
  const assetsPath = resolve(__dirname, 'assets');
  
  if (existsSync(assetsPath)) {
    rmSync(assetsPath, { recursive: true, force: true });
  }
  
  if (existsSync(publicPath)) {
    cpSync(publicPath, assetsPath, { recursive: true });
    const duration = Date.now() - startTime;
    console.log(`\nBuild done in ${duration}ms`);
  }
  
  process.exit(0);
}

export default defineConfig({
  cacheDir: 'node_modules/.vite',
  publicDir: 'public',
  build: {
    outDir: './assets',
    emptyOutDir: true,
    copyPublicDir: true,
    rollupOptions: {
      input: entries,
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    },
    minify: 'terser',
    sourcemap: false,
    cssMinify: true
  },
  plugins: [
    {
      name: 'build-timer',
      buildStart() {
        this.buildStartTime = Date.now();
      },
      buildEnd() {
        const duration = Date.now() - this.buildStartTime;
        console.log(`\nBuild completed in ${duration}ms`);
      }
    }
  ]
});