#!/usr/bin/env node
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { readdir, readFile, writeFile, unlink } from 'node:fs/promises'
import path from 'node:path'

const run = promisify(execFile)

const IMAGE_DIR = 'public/images'
const SOURCE_DIRS = ['app', 'components', 'lib']
const SOURCE_EXTENSIONS = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs',
  '.css', '.scss', '.json', '.md', '.mdx', '.html',
])
const QUALITY = 82
const IMG_PATTERN = /\.(jpe?g|png)$/i
const REF_PATTERN = /(\/images\/[A-Za-z0-9_-]+)\.(jpe?g|png)/g

async function listImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const images = []

  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      images.push(...await listImages(full))
    } else if (entry.isFile() && IMG_PATTERN.test(entry.name)) {
      images.push(full)
    }
  }

  return images
}

async function compressToWebp(imgPath) {
  const webpPath = imgPath.replace(IMG_PATTERN, '.webp')
  await run('cwebp', ['-quiet', '-q', String(QUALITY), imgPath, '-o', webpPath])
  return webpPath
}

async function walkSources(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await walkSources(full, files)
    } else if (SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(full)
    }
  }
  return files
}

async function main() {
  const imgs = await listImages(IMAGE_DIR)
  if (imgs.length === 0) {
    console.log('No jpg/jpeg/ or png files found in', IMAGE_DIR)
    return
  }

  let converted = 0
  let failed = 0
  const failedFiles = []
  for (const img of imgs) {
    try {
      await compressToWebp(img)
      converted++
      console.log(`Converted: ${img} -> ${img.replace(IMG_PATTERN, '.webp')}`)
    } catch (err) {
      failed++
      failedFiles.push(img)
      console.error(`Failed: ${img}: ${err.message}`)
    }
  }

  const sourceFiles = (
    await Promise.all(SOURCE_DIRS.map((dir) => walkSources(dir)))
  ).flat()

  let updatedFiles = 0
  let updatedRefs = 0
  for (const file of sourceFiles) {
    const original = await readFile(file, 'utf8')
    let count = 0
    const updated = original.replace(REF_PATTERN, (_, p1) => {
      count++
      return `${p1}.webp`
    })
    if (count > 0) {
      await writeFile(file, updated, 'utf8')
      updatedFiles++
      updatedRefs += count
      console.log(`Updated refs in: ${file} (${count})`)
    }
  }

  for (const img of imgs) {
    if (!failedFiles.includes(img)) {
      await unlink(img)
    }
  }

  console.log(
    `\nDone: ${converted} converted, ${failed} failed, ` +
      `${updatedRefs} references renamed in ${updatedFiles} files, ` +
      `${imgs.length - failedFiles.length} images deleted.`
  )
  if (failed > 0) process.exitCode = 1
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
