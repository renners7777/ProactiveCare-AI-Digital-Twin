module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo', '@babel/preset-typescript'],
    plugins: [
      'react-native-reanimated/plugin',
    ],
      [
        'module-resolver',
        {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          alias: {
            common: '../../common/src', 
          },
        },
      ],
  };
};
