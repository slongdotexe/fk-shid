import { registerRootComponent } from 'expo'
import { RootSiblingParent } from 'react-native-root-siblings'

import App from './App'

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
// registerRootComponent(App)
const AppRoot = () => (
  <RootSiblingParent>
    <App />
  </RootSiblingParent>
)

registerRootComponent(AppRoot)
