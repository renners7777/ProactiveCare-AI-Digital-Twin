module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'], // Defines the root for module resolution, e.g., for aliases within this app
          extensions: [ // Order can matter for platform-specific files
            '.ios.ts', '.android.ts', '.ts',
            '.ios.tsx', '.android.tsx', '.tsx',
            '.jsx', '.js', '.json'
          ],
          alias: {
            // This alias helps resolve imports from your shared 'common' package.
            // It assumes 'babel.config.js' is in 'apps/mobile/' and your
            // common package source is at 'packages/common/src/' relative
            // to your monorepo root.
            "common": "../../packages/common/src",
            // You can add other aliases here for paths within the 'mobile' app, for example:
            // "@components": "./src/components",
            // "@screens": "./src/screens",
          }
        }
      ],
      // According to the react-native-reanimated documentation,
      // this plugin should be listed last.
      'react-native-reanimated/plugin',
    ],
  };
};
