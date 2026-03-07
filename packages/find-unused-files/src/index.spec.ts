import path from 'node:path'
import { findUnusedFiles } from './index'

const fixtureDir = path.join(__dirname, '..', 'fixtures')

const fixture = (name: string) =>
  path.join(fixtureDir, name, 'tsconfig.json')

describe('findUnusedFiles', () => {
  describe('simple fixture — one orphan file', () => {
    it('detects the unused file', () => {
      const result = findUnusedFiles({ tsConfigFilePath: fixture('simple') })

      expect(result.totalFiles).toBe(3)
      expect(result.unusedFiles).toHaveLength(1)
      expect(result.unusedFiles[0]).toMatch(/orphan\.ts$/)
    })

    it('reports the correct reachable count', () => {
      const result = findUnusedFiles({ tsConfigFilePath: fixture('simple') })

      expect(result.reachableFiles).toHaveLength(2)
    })

    it('includes both index.ts and helper.ts as reachable', () => {
      const result = findUnusedFiles({ tsConfigFilePath: fixture('simple') })

      const names = result.reachableFiles.map((f) => path.basename(f))
      expect(names).toContain('index.ts')
      expect(names).toContain('helper.ts')
    })
  })

  describe('no-unused fixture — every file is reachable', () => {
    it('returns an empty unusedFiles array', () => {
      const result = findUnusedFiles({
        tsConfigFilePath: fixture('no-unused'),
      })

      expect(result.unusedFiles).toHaveLength(0)
    })

    it('marks all files as reachable', () => {
      const result = findUnusedFiles({
        tsConfigFilePath: fixture('no-unused'),
      })

      expect(result.reachableFiles).toHaveLength(result.totalFiles)
    })
  })

  describe('cycle fixture — circular imports', () => {
    it('does not loop forever and finds no unused files', () => {
      const result = findUnusedFiles({ tsConfigFilePath: fixture('cycle') })

      expect(result.unusedFiles).toHaveLength(0)
      expect(result.totalFiles).toBe(3)
    })
  })

  describe('excludePatterns', () => {
    it('excludes files matching the given glob from unusedFiles', () => {
      const result = findUnusedFiles({
        tsConfigFilePath: fixture('simple'),
        excludePatterns: ['**/*orphan*'],
      })

      expect(result.unusedFiles).toHaveLength(0)
    })

    it('does not affect reachable files', () => {
      const result = findUnusedFiles({
        tsConfigFilePath: fixture('simple'),
        excludePatterns: ['**/*orphan*'],
      })

      expect(result.reachableFiles).toHaveLength(2)
    })

    it('only excludes files that match the pattern', () => {
      const result = findUnusedFiles({
        tsConfigFilePath: fixture('simple'),
        // This pattern matches nothing — orphan.ts should still appear
        excludePatterns: ['**/*.test.ts'],
      })

      expect(result.unusedFiles).toHaveLength(1)
      expect(result.unusedFiles[0]).toMatch(/orphan\.ts$/)
    })
  })

  describe('explicit entry points', () => {
    it('uses the supplied glob instead of auto-detecting index files', () => {
      const tsConfigFilePath = fixture('simple')
      const projectDir = path.dirname(tsConfigFilePath)

      const result = findUnusedFiles({
        tsConfigFilePath,
        entryPoints: [path.join(projectDir, 'src/index.ts')],
      })

      expect(result.unusedFiles).toHaveLength(1)
      expect(result.unusedFiles[0]).toMatch(/orphan\.ts$/)
    })

    it('treats every file as unused when a non-existent entry is given', () => {
      const result = findUnusedFiles({
        tsConfigFilePath: fixture('simple'),
        entryPoints: ['does-not-exist.ts'],
      })

      expect(result.unusedFiles).toHaveLength(result.totalFiles)
    })
  })
})
