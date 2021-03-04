#!/usr/bin/env node
import chalk from 'chalk'
import { Command } from 'commander/esm.mjs'
import { infoToMarkdown, manifestToMarkdown, packageInfo, packageManifest } from '../index.js'

const program = new Command()

program
  .option('--operation-template <filename>', 'ES6 template for an operation')
  .option('--package-template <filename>', 'ES6 template for a package')
  .option('--local', 'Treat arguments as paths to package directories')
  .action(async () => {
    const opts = program.opts()
    const output = []

    for (const name of program.args) {
      let info, manifest
      try {
        info = await packageInfo(name, opts)
        manifest = await packageManifest(name, opts)
      } catch (err) {
        console.warn(chalk.yellow(`Generating doc for ${name} failed. This packaged will be skipped. Error trace:`))
        console.warn(err)
        continue
      }

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
