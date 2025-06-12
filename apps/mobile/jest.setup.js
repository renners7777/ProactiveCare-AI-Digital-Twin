import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

// Mock reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock native animated helper
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Set up global mocks
global.window = {};
global.__reanimatedWorkletInit = jest.fn();
global.ReanimatedDataMock = {};

// Mock Expo modules
jest.mock('expo-font', () => ({
  useFonts: () => [true, null],
  loadAsync: jest.fn()
}));

jest.mock('expo-constants', () => ({
  manifest: {
    extra: {
      supabaseUrl: 'test-url',
      supabaseAnonKey: 'test-key'
    }
  }
}));