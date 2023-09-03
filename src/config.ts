import { loadConfig as loadConfigFn } from 'unconfig'
import type { Options } from './types'

/**
 * Define the cssup config
 */
export const defineConfig = (options: Options) => options

export async function loadConfig() {
  const { config } = await loadConfigFn<Options>({
    sources: [
      {
        files: 'cssup.config',
        extensions: ['ts', 'mjs', 'cjs', 'js', 'json'],
      },
      {
        files: 'package.json',
        extensions: [],
        rewrite(config: any) {
          return config?.cssup
        },
      },
    ],
    merge: false,
  })

  return config
}
