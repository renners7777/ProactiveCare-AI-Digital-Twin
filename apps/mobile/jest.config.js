module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: [
    './jest.setup.js'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'
  ],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/src/test/__mocks__/svgMock.js',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ]
};