import type { TransformOptions } from 'lightningcss'

type ExtraOptions = Omit<TransformOptions<any>, 'filename' | 'code'>

export type Options = {
  entryPoints: string[] | string
  outputDir?: string
} & ExtraOptions

export type CliOptions = Partial<Pick<Options, 'entryPoints' | 'minify'>>
