/* eslint-disable no-console */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import { transform as cssTransformer } from 'lightningcss'
import { cyan, green, magenta, yellow } from 'picocolors'
import type { Options } from './types'

const cwd = process.cwd()

const preflight = async (outDir: string) => {
  const destDir = resolve(cwd, outDir)

  if (existsSync(destDir))
    await rm(destDir, { recursive: true })
  await mkdir(destDir)
}

const calcFileSize = (file: string) => {
  const size = Buffer.byteLength(file, 'utf-8')
  const kb = (size / 1024).toFixed(2)
  return `${kb} KB`
}

export const build = async (options?: Options) => {
  const { entryPoints, outputDir = 'dist', ...extra } = options || {}
  if (!entryPoints)
    throw new Error('No entries provided')

  console.log(yellow('✨'), 'Building CSS using', yellow('LightningCSS'), '\n')

  const start = Date.now()

  await preflight(outputDir)

  const entries = Array.isArray(entryPoints) ? entryPoints : [entryPoints]

  const maxLen = Math.max(...entries.map(e => basename(e).length))

  const transform = (code: string, id: string) => {
    const { code: css } = cssTransformer({
      code: Buffer.from(code),
      filename: id,
      ...extra,
    })

    const res = css.toString()

    console.log(yellow('⚡'), magenta(basename(id).padEnd(maxLen + 2, ' ')), cyan(calcFileSize(res)))

    return res
  }

  for (const entry of entries) {
    const srcPath = resolve(cwd, entry)
    const outPath = resolve(cwd, outputDir, basename(entry))

    const rawCode = await readFile(srcPath, 'utf-8')
    const css = transform(rawCode, srcPath)
    await writeFile(outPath, css)
  }

  const end = Date.now()

  console.log('')
  console.log(green('✔'), ' Build success in', cyan(`${end - start}ms`))
  console.log('')
}
