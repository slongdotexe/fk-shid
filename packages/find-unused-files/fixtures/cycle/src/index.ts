// Entry imports a.ts which imports b.ts which imports a.ts (cycle).
import { valueA } from './a'

export const entry = valueA
