#!/usr/bin/env node
/**
 * CLI wrapper for find-unused-files.
 *
 * Usage:
 *   find-unused-files [entry-glob...] [--tsconfig=<path>] [--exclude=<glob>...]
 *
 * Examples:
 *   # Use default entry-point detection (index.ts / index.tsx files)
 *   find-unused-files --tsconfig=packages/my-lib/tsconfig.json
 *
 *   # Supply explicit entry points via positional arguments
 *   find-unused-files "src/main.ts" --tsconfig=tsconfig.json
 *
 *   # Exclude test files from the unused-files report
 *   find-unused-files --tsconfig=tsconfig.json --exclude="**\/*.spec.ts" --exclude="**\/*.test.ts"
 */

import { findUnusedFiles } from './index'

const args = process.argv.slice(2)

const tsConfigArg = args.find((a) => a.startsWith('--tsconfig='))
const tsConfigFilePath =
  tsConfigArg?.replace('--tsconfig=', '') ?? 'tsconfig.json'

const excludePatterns = args
  .filter((a) => a.startsWith('--exclude='))
  .map((a) => a.replace('--exclude=', ''))

const entryPoints = args.filter((a) => !a.startsWith('--'))

const result = findUnusedFiles({ tsConfigFilePath, entryPoints, excludePatterns })

console.log(`\nProject : ${tsConfigFilePath}`)
console.log(`Total   : ${result.totalFiles} source file(s)`)
console.log(`Reached : ${result.reachableFiles.length} file(s)`)

if (result.unusedFiles.length === 0) {
  console.log('\n✅ No unused files found!\n')
} else {
  console.log(`\n⚠️  ${result.unusedFiles.length} unused file(s):\n`)
  result.unusedFiles.forEach((f) => console.log(`  - ${f}`))
  console.log()
  process.exit(1)
}
