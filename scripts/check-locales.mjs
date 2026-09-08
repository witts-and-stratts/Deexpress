import { readdir, readFile } from 'node:fs/promises'
import { join, relative } from 'node:path'

const root = new URL('../locales/', import.meta.url).pathname

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? files(path) : entry.name.endsWith('.json') ? [path] : []
  }))
  return nested.flat()
}

function shape(value) {
  if (Array.isArray(value)) return value.map(shape)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).sort(([a], [b]) => a.localeCompare(b)).map(([key, child]) => [key, shape(child)]))
  }
  return typeof value
}

const english = join(root, 'en')
const german = join(root, 'de')
const sourceFiles = await files(english)
const mismatches = []

for (const source of sourceFiles) {
  const file = relative(english, source)
  try {
    const [en, de] = await Promise.all([readFile(source, 'utf8'), readFile(join(german, file), 'utf8')])
    if (JSON.stringify(shape(JSON.parse(en))) !== JSON.stringify(shape(JSON.parse(de)))) mismatches.push(file)
  } catch { mismatches.push(file) }
}

if (mismatches.length) {
  console.error(`Locale schema differs from English: ${mismatches.join(', ')}`)
  process.exit(1)
}

console.log(`Locale schemas match English (${sourceFiles.length} files).`)
