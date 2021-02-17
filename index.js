import { readFile } from 'fs/promises'
import fetch from '@rdfjs/fetch'
import namespace from '@rdfjs/namespace'
import clownface from 'clownface'
import rdf from 'rdf-ext'

const defaults = {
  language: ['en', '*'],
  operationTemplate: await readFile('operation.template'),
  packageTemplate: await readFile('package.template')
}

const ns = {
  code: namespace('https://code.described.at/'),
  pipeline: namespace('https://pipeline.described.at/'),
  rdf: namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#'),
  rdfs: namespace('http://www.w3.org/2000/01/rdf-schema#')
}

async function packageInfo(name) {
  const res = await fetch(`https://unpkg.com/${name}/package.json`)

  if (!res.ok) {
    throw new Error(`The package.json file doesn't exist for ${name}. Check if the package is published. ${res.status}: ${res.statusText}`)
  }

  return res.json()
}

async function packageManifest(name) {
  const res = await fetch(`https://unpkg.com/${name}/manifest.ttl`, { factory: rdf })
  if (!res.ok) {
    throw new Error(`The manifest.ttl file doesn't exist for ${name}. ${res.status}: ${res.statusText}`)
  }

  return clownface({ dataset: await res.dataset() })
}

function operationToMarkdown(operation, { language, template }) {
  const label = operation.out(ns.rdfs.label, { language }).value
  const comment = operation.out(ns.rdfs.comment, { language }).value
  const ecmaScriptLink = operation.out(ns.code.implementedBy).has(ns.rdf.type, ns.code.EcmaScript).out(ns.code.link)
  const snippet = `<> a p:Step;\n  code:implementedBy [ a code:EcmaScript;\n  code:link <${ecmaScriptLink.value}>\n].`

  return eval(`\`${template}\``)
}

function manifestToMarkdown(manifest, {
  language = defaults.language,
  operationTemplate = defaults.operationTemplate
} = {}) {
  return manifest
    .any()
    .has(ns.rdf.type, ns.pipeline.Operation)
    .map(operation => operationToMarkdown(operation, { language, template: operationTemplate }))
    .join('\n')
}

function infoToMarkdown(info, { template = defaults.packageTemplate }) {
  return eval(`\`${template}\``)
}

export {
  defaults,
  infoToMarkdown,
  manifestToMarkdown,
  ns,
  packageInfo,
  packageManifest
}
