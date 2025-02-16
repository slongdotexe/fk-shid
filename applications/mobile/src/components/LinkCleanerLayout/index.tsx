import styled, { css } from '@emotion/native'
import { useTheme } from '@emotion/react'
import {
  matchUrlActionObject,
  runUrlActions,
  urlActionsList,
} from 'fk-shid-core'
import { IUrlDomainActionObject } from 'fk-shid-core/pack/esm/url-cleaners/actions/types'
import { ButtonProps, View } from 'react-native'

import { handleCopy, handleShareLink } from '../../utils'
import { Button } from '../atomic/Buttons'
import { LinkCard } from '../atomic/LinkCard'

import { TProcessedLink } from './types'

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
  processedLink: URL | null
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

const DEFAULT_ACTIONS: IUrlDomainActionObject = {
  actions: [{ type: 'stripQueryString', params: null }],
  domainPattern: '',
}

const handleCleanLink = (link: string | null) => {
  if (link === null) {
    return { link: null, error: 'No link provided' }
  }
  const urlLink = new URL(link)

  const matchedActionsObject = matchUrlActionObject(urlLink, urlActionsList)
  if (matchedActionsObject === null) {
    const cleanedLink = runUrlActions(urlLink, DEFAULT_ACTIONS.actions)
    return { link: cleanedLink, fallback: true, error: null }
  }
  const cleanedLink = runUrlActions(urlLink, matchedActionsObject.actions)
  return { link: cleanedLink, fallback: false, error: null }
}

interface LinkCleanerLayoutProps {
  linkInput: string | null
  setInputLink: (link: string | null) => void
  setLinkCleanerResult: (param0: TProcessedLink) => void
}

export const LinkCleanerLayout = ({
  linkInput,
  setLinkCleanerResult,
  setInputLink,
}: LinkCleanerLayoutProps) => {
  const linkCleaningResult = handleCleanLink(linkInput)
  setLinkCleanerResult(linkCleaningResult)
  const theme = useTheme()

  return (
    <View style={css({ gap: 16, paddingTop: theme.spacing(6) })}>
      <LinkCard titleText="Input Link:" linkText={linkInput} />
      <LinkCard
        titleText="Cleaned Link:"
        linkText={linkCleaningResult?.link?.toString()}
      />
      <InputControls
        processedLink={linkCleaningResult?.link ?? null}
        handleClearInput={() => setInputLink(null)}
      />
    </View>
  )
}
