import styled from '@emotion/native'

export const PageContainer = styled.View(({ theme }) => {
  return {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: theme.backgroundColor.background,
    paddingHorizontal: theme.spacing(4),
  }
})
