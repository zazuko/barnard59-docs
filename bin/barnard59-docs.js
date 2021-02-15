#!/usr/bin/env node

import { Command } from 'commander/esm.mjs'
import { infoToMarkdown, manifestToMarkdown, packageInfo, packageManifest } from '../index.js'

const program = new Command()

program
  .option('--operation-template <filename>', 'ES6 template for an operation')
  .option('--package-template <filename>', 'ES6 template for a package')

program.parse(process.argv)

const output = []

for (const name of program.args) {
  const info = await packageInfo(name)
  const manifest = await packageManifest(name)

  output.push(infoToMarkdown(info, program.opts()))
  output.push(manifestToMarkdown(manifest, program.opts()))
}

const markdown = output.join('\n')

process.stdout.write(markdown)
