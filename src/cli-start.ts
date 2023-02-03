import { cac } from 'cac'
import { version } from '../package.json'
import { build } from './utils'
import { loadConfig } from './config'
import type { CliOptions } from './types'

export const startCli = async (argv = process.argv, options: CliOptions = {}) => {
  const cli = cac('cssup')

  cli
    .command('[entryPoints...]', 'Compile CSS files', {
      ignoreOptionDefaultValue: true,
    })
    .option('-m, --minify', 'Minify output', { default: options.minify ?? false })
    .action(async (entryPoints: Array<string>, flags) => {
      Object.assign(options, flags)

      if (entryPoints)
        options.entryPoints = entryPoints

      const config = await loadConfig()

      const finalOptions = {
        ...config,
        ...options,
      }

      build(finalOptions)
    })

  cli.help()
  cli.version(version)

  cli.parse(argv, { run: false })
  await cli.runMatchedCommand()
}
