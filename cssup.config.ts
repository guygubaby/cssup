import { defineConfig } from './src/config'

export default defineConfig({
  entryPoints: './src/index.css',
  outputDir: 'dist',
  minify: false,
  sourceMap: true,
})
