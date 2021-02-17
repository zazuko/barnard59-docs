#!/usr/bin/env node

import { Command } from 'commander/esm.mjs'
import { infoToMarkdown, manifestToMarkdown, packageInfo, packageManifest } from '../index.js'

const program = new Command()

program
  .option('--operation-template <filename>', 'ES6 template for an operation')
  .option('--package-template <filename>', 'ES6 template for a package')
  .option('--local', 'Treat arguments as paths to package directories')
  .option('--manifest <manifest>', 'Path to manifest.ttl relative to package.json', 'manifest.ttl')
  .action(async () => {
    const opts = program.opts()
    const output = []

    for (const name of program.args) {
      const info = await packageInfo(name, opts)
      const manifest = await packageManifest(name, opts)

      output.push(infoToMarkdown(info, opts))
      output.push(manifestToMarkdown(manifest, opts))
    }

    const markdown = output.join('\n')

    process.stdout.write(markdown)
  })

program.parseAsync(process.argv)
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
