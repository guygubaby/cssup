# cssup

[![NPM version](https://img.shields.io/npm/v/@bryce-loskie/cssup?color=a1b858&label=)](https://www.npmjs.com/package/@bryce-loskie/cssup)

## Get Started

### Install

```bash
pnpm i @bryce-loskie/cssup -D
```

### In `cssup.config.ts`

```ts
import { defineConfig } from '@bryce-loskie/cssup'

export default defineConfig({
  entryPoints: './src/index.css',
  outputDir: 'dist',
  minify: false,
  sourceMap: true,
})
```

## License

[MIT](./LICENSE) License © 2023 [guygubaby](https://github.com/guygubaby)
