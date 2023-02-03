import { expect, it } from 'vitest'
import { loadConfig } from './../src/config'

it('should loadConfig fn works', async () => {
  const config = await loadConfig()
  expect(config).toMatchInlineSnapshot(`
    {
      "entryPoints": "./src/index.css",
      "minify": false,
      "outputDir": "dist",
      "sourceMap": true,
    }
  `)
})
