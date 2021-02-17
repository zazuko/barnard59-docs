#!/usr/bin/env node
import chalk from 'chalk'
import { Command } from 'commander/esm.mjs'
import { infoToMarkdown, manifestToMarkdown, packageInfo, packageManifest, defaults } from '../index.js'


const program = new Command()

program
  .option('--operation-template <filename>', 'ES6 template for an operation')
  .option('--package-template <filename>', 'ES6 template for a package', defaults.packageTemplate)

program.parse(process.argv)

const output = []

for (const name of program.args) {


  let info, manifest
  try {
    info = await packageInfo(name)
    manifest = await packageManifest(name)
  } catch (err) {
    console.warn(chalk.yellow(`Generating doc for ${name} failed. This packaged will be skipped. Error trace:`))
    console.warn(err)
    continue
  }

  output.push(infoToMarkdown(info, program.opts()))
  output.push(manifestToMarkdown(manifest, program.opts()))
}

const markdown = output.join('\n')
process.stdout.write(markdown)
