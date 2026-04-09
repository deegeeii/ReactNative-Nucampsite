// ─── Babel Configuration ─────────────────────────────────────────────────────
// Configures the JavaScript transpiler used by Metro bundler.
// babel-preset-expo handles JSX, modern JS, and Expo-specific transforms.
// react-native-reanimated/plugin is required for the Reanimated animation library
// and must be listed last among plugins.
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
