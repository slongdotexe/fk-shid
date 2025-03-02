import styled, { css } from '@emotion/native'
import { useTheme } from '@emotion/react'
import { ButtonProps, View } from 'react-native'

import { LinkCleaningResult } from '../../hooks/useCleanLink'
import { handleCopy, handleShareLink } from '../../utils'
import { Button } from '../atomic/Buttons'
import { LinkCard } from '../LinkCard'

const StyledView = styled(View)(() => {
  return {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    padding: 16,
  }
})

const InputControls = ({
  processedLink,
  handleClearInput,
}: {
  processedLink: string | null
  handleClearInput: ButtonProps['onPress']
}) => {
  return (
    <StyledView>
      <Button
        disabled={!processedLink}
        size="sm"
        variant="secondary"
        label="Share"
        onPress={() => handleShareLink(processedLink?.toString() ?? null)}
      />
      <Button
        disabled={!processedLink}
        size="sm"
        variant="secondary"
        label="Copy"
        onPress={() => handleCopy(processedLink?.toString() ?? '')}
      />
      <Button
        size="sm"
        variant="destructive"
        label="Clear"
        onPress={handleClearInput}
      />
    </StyledView>
  )
}

interface LinkCleanerLayoutProps {
  linkInput: string | null
  linkCleaningResult: LinkCleaningResult
  clearLinkCleaning: () => void
}

export const LinkCleanerLayout = ({
  clearLinkCleaning,
  linkCleaningResult,
  linkInput,
}: LinkCleanerLayoutProps) => {
  const theme = useTheme()
  const cleanedLink = linkCleaningResult?.link?.toString() ?? null

  return (
    <View style={css({ gap: 16, paddingTop: theme.spacing(6) })}>
      <LinkCard titleText="Input Link" linkText={linkInput} />
      <LinkCard titleText="Cleaned Link" linkText={cleanedLink} />
      <InputControls
        processedLink={cleanedLink}
        handleClearInput={clearLinkCleaning}
      />
    </View>
  )
}
