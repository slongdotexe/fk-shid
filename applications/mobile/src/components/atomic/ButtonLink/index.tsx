import { useRouter, Link } from 'expo-router'
import { forwardRef } from 'react'

import { Button, ButtonProps } from '../Buttons'

// export const ButtonLink = ({
//   href,
//   label,
// }: {
//   href: string
//   label: string
// }) => {
//   const router = useRouter()
//   const onPress = () => router.navigate(href)
//   return <Button variant="outline" label={label} onPress={onPress} />
// }

interface ButtonLinkProps extends ButtonProps {
  href: string
}

export const ButtonLink = forwardRef<
  React.ElementRef<typeof Link>,
  ButtonLinkProps
>(({ href, ...restProps }) => {
  const router = useRouter()
  const onPress = () => router.navigate(href)
  return <Button variant="outline" onPress={onPress} {...restProps} />
})

ButtonLink.displayName = 'ButtonLink'
