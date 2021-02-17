import { readFile } from 'fs/promises'
import fetch from '@rdfjs/fetch'
import clownface from 'clownface-io'
import namespace from '@rdfjs/namespace'
import path from 'path'

const defaults = {
  language: ['en', '*'],
  operationTemplate: await readFile(new URL('./operation.template', import.meta.url)),
  packageTemplate: await readFile(new URL('./package.template', import.meta.url))
}

const ns = {
  code: namespace('https://code.described.at/'),
  pipeline: namespace('https://pipeline.described.at/'),
  rdf: namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#'),
  rdfs: namespace('http://www.w3.org/2000/01/rdf-schema#')
}

async function packageInfo (name, { local }) {
  if (local) {
    const buffer = await readFile(path.resolve(process.cwd(), name, 'package.json'))
    return JSON.parse(buffer.toString())
  }

  const res = await fetch(`https://unpkg.com/${name}/package.json`)

  if (!res.ok) {
    throw new Error(`${res.status}: ${res.statusText}`)
  }

  return res.json()
}

async function packageManifest (name, { local }) {
  const manifestPtr = local
    ? clownface().namedNode(`file:${path.resolve(process.cwd(), name, 'manifest.ttl')}`)
    : clownface().namedNode(`https://unpkg.com/${name}/manifest.ttl`)

  const res = await manifestPtr.fetch()

  for (const { response } of res.failures.values()) {
    throw new Error(`${response.status}: ${response.statusText}`)
  }

  return res
}

function operationToMarkdown (operation, { language, template }) {
  const label = operation.out(ns.rdfs.label, { language }).value
  const comment = operation.out(ns.rdfs.comment, { language }).value
  const ecmaScriptLink = operation.out(ns.code.implementedBy).has(ns.rdf.type, ns.code.EcmaScript).out(ns.code.link)
  const snippet = `<> a p:Step;\n  code:implementedBy [ a code:EcmaScript;\n  code:link <${ecmaScriptLink.value}>\n].`

  return eval(`\`${template}\``)
}

function manifestToMarkdown (manifest, {
  language = defaults.language,
  operationTemplate = defaults.operationTemplate
} = {}) {
  return manifest
    .any()
    .has(ns.rdf.type, ns.pipeline.Operation)
    .map(operation => operationToMarkdown(operation, { language, template: operationTemplate }))
    .join('\n')
}

function infoToMarkdown (info, { template = defaults.packageTemplate }) {
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
