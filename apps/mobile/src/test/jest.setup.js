import 'react-native-gesture-handler/jestSetup';

// Mock window and global objects needed by Expo
global.window = {};
global.__reanimatedWorkletInit = jest.fn();
global.ReanimatedDataMock = {};

// Mock Reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock native modules
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn()
}));

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