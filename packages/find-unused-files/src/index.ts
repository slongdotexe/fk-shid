import path from 'node:path'
import { minimatch } from 'minimatch'
import { Project, SourceFile } from 'ts-morph'

export interface FindUnusedFilesOptions {
  /**
   * Path to the tsconfig.json file for the project to analyse.
   * Relative paths are resolved from the current working directory.
   */
  tsConfigFilePath: string
  /**
   * Glob patterns (relative to the project root) that identify the entry
   * points from which the import graph traversal starts.
   *
   * When omitted every `index.ts` / `index.tsx` file included by the
   * tsconfig is treated as an entry point.
   */
  entryPoints?: string[]
  /**
   * Glob patterns used to exclude files from the *unused* report.
   * Files matching any of these patterns are silently removed from
   * `unusedFiles` (they are still traversed normally if reachable).
   *
   * @example
   * ```ts
   * // Exclude test files from the unused-files report
   * excludePatterns: ['**\/*.spec.ts', '**\/*.test.ts']
   * ```
   */
  excludePatterns?: string[]
}

export interface FindUnusedFilesResult {
  /** Total number of source files discovered by the tsconfig. */
  totalFiles: number
  /** Absolute paths of files that are not reachable from any entry point. */
  unusedFiles: string[]
  /** Absolute paths of files that are reachable from at least one entry point. */
  reachableFiles: string[]
}

/**
 * Performs a breadth-first traversal of the import graph starting from
 * `entryPoints` and returns the set of absolute file paths that were visited.
 */
function collectReachableFiles(entryPoints: SourceFile[]): Set<string> {
  const reachable = new Set<string>()
  const queue: SourceFile[] = [...entryPoints]

  while (queue.length > 0) {
    const current = queue.shift() as SourceFile
    const filePath = current.getFilePath()

    if (reachable.has(filePath)) {
      continue
    }

    reachable.add(filePath)

    for (const importDecl of current.getImportDeclarations()) {
      const importedFile = importDecl.getModuleSpecifierSourceFile()
      if (importedFile && !reachable.has(importedFile.getFilePath())) {
        queue.push(importedFile)
      }
    }

    for (const exportDecl of current.getExportDeclarations()) {
      const exportedFile = exportDecl.getModuleSpecifierSourceFile()
      if (exportedFile && !reachable.has(exportedFile.getFilePath())) {
        queue.push(exportedFile)
      }
    }
  }

  return reachable
}

/**
 * Returns `true` when `filePath` matches at least one of the given glob
 * `patterns`.  Both absolute and relative paths are tested.
 */
function matchesAny(filePath: string, patterns: string[]): boolean {
  return patterns.some(
    (pattern) =>
      minimatch(filePath, pattern) || minimatch(path.basename(filePath), pattern),
  )
}

/**
 * Traverses the TypeScript import graph of a project and returns files that
 * are not reachable from any entry point.
 *
 * @example
 * ```ts
 * import { findUnusedFiles } from 'find-unused-files'
 *
 * const result = findUnusedFiles({
 *   tsConfigFilePath: 'packages/my-lib/tsconfig.json',
 *   // Exclude test files from the report
 *   excludePatterns: ['**\/*.spec.ts', '**\/*.test.ts'],
 * })
 *
 * console.log(result.unusedFiles)
 * ```
 */
export function findUnusedFiles(
  options: FindUnusedFilesOptions,
): FindUnusedFilesResult {
  const {
    tsConfigFilePath,
    entryPoints: entryGlobs = [],
    excludePatterns = [],
  } = options

  const project = new Project({
    tsConfigFilePath: path.resolve(tsConfigFilePath),
  })

  const sourceFiles = project.getSourceFiles()

  let entryPoints: SourceFile[]

  if (entryGlobs.length > 0) {
    entryPoints = project.getSourceFiles(entryGlobs)
  } else {
    entryPoints = sourceFiles.filter((f) => {
      const basename = path.basename(f.getFilePath())
      return basename === 'index.ts' || basename === 'index.tsx'
    })
  }

  const reachable = collectReachableFiles(entryPoints)

  const unreachable = sourceFiles.filter((f) => !reachable.has(f.getFilePath()))

  const unusedFiles = (
    excludePatterns.length > 0
      ? unreachable.filter((f) => !matchesAny(f.getFilePath(), excludePatterns))
      : unreachable
  ).map((f) => f.getFilePath())

  return {
    totalFiles: sourceFiles.length,
    unusedFiles,
    reachableFiles: Array.from(reachable),
  }
}

