import { useTheme } from '@emotion/react'
import { View } from 'react-native'

import { PageContainer } from '../components/atomic/PageContainer'
import { Typography } from '../components/atomic/Typography'

const getPermutations = () => {
  const options = {
    sizes: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
    families: ['body', 'caption', 'heading'],
    weights: ['normal', 'medium', 'semibold', 'bold', 'extrabold'],
  }

  const permutations = options.sizes
    .map((size) =>
      options.families.map((family) =>
        options.weights.map((weight) => ({ size, family, weight }))
      )
    )
    .flat(2)

  return permutations
}

const TestPage = () => {
  const theme = useTheme()
  const permutations = getPermutations()
  getPermutations()
  return (
    <PageContainer>
      <View
        style={{
          alignItems: 'center',
          paddingHorizontal: theme.spacing(4),
          gap: theme.spacing(6),
        }}
      >
        {permutations.map((permutation) => {
          const joinedKey =
            permutation.family + permutation.size + permutation.weight
          return (
            // @ts-expect-error -- --
            <Typography key={joinedKey} {...permutation}>
              Testing: {joinedKey}
            </Typography>
          )
        })}
      </View>
    </PageContainer>
  )
}

export default TestPage
