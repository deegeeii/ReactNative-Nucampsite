// ─── App Entry Point ─────────────────────────────────────────────────────────
// This is the first file executed by React Native / Expo.
// registerRootComponent mounts the App component and sets up the environment
// correctly for both Expo Go and native production builds.
import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
