// for iOS deeplink redirect to this unmatched page
// catched link: exposhareintentexample:///dataUrl=exposhareintentexampleShareKey
import { useHandleShareIntent } from '../hooks/useHandleShareIntent'

import Home from './index'

export default function Page() {
  useHandleShareIntent()
  return <Home />
}
