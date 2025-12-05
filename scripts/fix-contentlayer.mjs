import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const indexPath = join(__dirname, '../.contentlayer/generated/index.mjs')

try {
  let content = readFileSync(indexPath, 'utf-8')
  content = content.replace(/assert \{ type: 'json' \}/g, "with { type: 'json' }")
  writeFileSync(indexPath, content, 'utf-8')
} catch (error) {
  console.error('Error fixing contentlayer:', error.message)
  process.exit(1)
}
