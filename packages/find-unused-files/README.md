# find-unused-files

A development tool that uses [ts-morph](https://ts-morph.com/) to traverse a TypeScript project's import graph and report files that are not reachable from any entry point.

## How it works

1. A `ts-morph` `Project` is created from the given `tsconfig.json`.
2. Entry-point files are determined either from explicit globs you provide, or by automatically treating every `index.ts` / `index.tsx` file as an entry point.
3. Starting from those entry points the tool performs a **breadth-first traversal** of all `import` and `export … from` declarations.
4. Any source file that was never visited is reported as unused.

## Usage

### CLI

```sh
# Auto-detect entry points (index.ts / index.tsx)
node dist/cli.js --tsconfig=packages/my-lib/tsconfig.json

# Supply explicit entry points
node dist/cli.js src/main.ts --tsconfig=tsconfig.json

# Exclude test files from the unused-files report
node dist/cli.js --tsconfig=tsconfig.json --exclude="**\/*.spec.ts" --exclude="**\/*.test.ts"
```

The CLI exits with code `1` when unused files are found, making it easy to use in CI pipelines.

### Programmatic API

```ts
import { findUnusedFiles } from 'find-unused-files'

const result = findUnusedFiles({
  tsConfigFilePath: 'packages/my-lib/tsconfig.json',
  // Optional: specify entry points explicitly
  entryPoints: ['src/main.ts'],
  // Optional: exclude files matching these globs from the report
  excludePatterns: ['**/*.spec.ts', '**/*.test.ts'],
})

console.log(`Total files  : ${result.totalFiles}`)
console.log(`Reachable    : ${result.reachableFiles.length}`)
console.log(`Unused       : ${result.unusedFiles.length}`)
result.unusedFiles.forEach((f) => console.log(`  - ${f}`))
```

### Root-level convenience script

From the repository root:

```sh
yarn find-unused-files --tsconfig=packages/fk-shid-core/tsconfig.json
```

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `tsConfigFilePath` | `string` | `'tsconfig.json'` (CLI) | Path to the `tsconfig.json` of the project to analyse. |
| `entryPoints` | `string[]` | auto-detect `index.ts`/`index.tsx` | Glob patterns identifying the roots of the import graph. |
| `excludePatterns` | `string[]` | `[]` | Glob patterns; unreachable files matching any of these are omitted from the report. |
