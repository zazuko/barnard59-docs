#!/usr/bin/env node
import { Command } from 'commander/esm.mjs'
import { getJson, infoToMarkdown, defaults } from '../index.js'

const program = new Command()

program
    .option('--package-template <filename>', 'ES6 template for a package', defaults.packageListTemplate)

program.parse(process.argv)

const data = await getJson("https://api.github.com/users/zazuko/repos")

const output = []
for (const repo of data) {
    if (repo.name.includes("barnard59")) {
        output.push(infoToMarkdown(repo, program.opts()))
    }
}

const markdown = output.join('\n')
process.stdout.write(markdown)