// ─── Metro Bundler Configuration ─────────────────────────────────────────────
// Metro is the JavaScript bundler for React Native.
// getDefaultConfig pulls in Expo's recommended Metro settings (asset handling,
// resolver extensions, etc.) which are applied as the base configuration.
// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

module.exports = getDefaultConfig(__dirname);
