const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['src/main.js'],
    bundle: true,
    outfile: 'dist/bundle.js',
    format: 'iife', // Immediately Invoked Function Expression for direct browser injection
    minify: false, // Keep it readable for now
    sourcemap: false,
    target: ['es2020'],
}).then(() => {
    console.log('Build complete: dist/bundle.js');
}).catch(() => process.exit(1));
