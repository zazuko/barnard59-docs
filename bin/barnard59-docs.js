#!/usr/bin/env node

import { Command } from 'commander/esm.mjs'
import { infoToMarkdown, manifestToMarkdown, packageInfo, packageManifest } from '../index.js'

const program = new Command()

program
  .option('--operation-template <filename>', 'ES6 template for an operation')
  .option('--package-template <filename>', 'ES6 template for a package')

program.command('npm <packages...>')
  .action(async (packages) => {
    const output = []

    for (const name of packages) {
      const info = await packageInfo({ name })
      const manifest = await packageManifest({ name })

      output.push(infoToMarkdown(info, program.opts()))
      output.push(manifestToMarkdown(manifest, program.opts()))
    }

    const markdown = output.join('\n')

    process.stdout.write(markdown)
  })

program.command('local [dir]')
  .description('Load local package from given directory (relative to working dir)')
  .option('--manifest <manifest>', 'Path to manifest.ttl relative to <dir>', 'manifest.ttl')
  .action(async (dir = '.', opts) => {
    const output = []

    const info = await packageInfo({ dir })
    const manifest = await packageManifest({ dir, manifest: opts.manifest })

    output.push(infoToMarkdown(info, program.opts()))
    output.push(manifestToMarkdown(manifest, program.opts()))

    const markdown = output.join('\n')

    process.stdout.write(markdown)
  })

program.parseAsync(process.argv)
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
