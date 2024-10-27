import { Theme } from '@emotion/react'

import { StylesProp } from '../../components/types'

export const handleStyleOverrides = (
  styles: StylesProp | undefined | null,
  theme: Theme
) => {
  return typeof styles === 'function' ? styles(theme) : styles
}
