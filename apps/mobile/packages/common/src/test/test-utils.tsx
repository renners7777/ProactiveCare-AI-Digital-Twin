import React from 'react';
import { render, RenderOptions, screen, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from '../contexts/AuthContext';
import { PatientProvider } from '../contexts/PatientContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Configure Jest specific mocks
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn()
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
});

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AuthProvider>
          <PatientProvider>
            {children}
          </PatientProvider>
        </AuthProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });

// Add mock navigation
const Stack = createNativeStackNavigator();
const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

export const navigationMock = {
  navigate: mockNavigate,
  goBack: mockGoBack,
  addListener: jest.fn(),
  removeListener: jest.fn(),
};

// Add custom queries and utilities
const customQueries = {
  findByTestId: async (id: string) => {
    const element = await screen.findByTestId(id);
    return element;
  },
  findByTestIdAndText: async (id: string, text: string) => {
    const elements = await screen.findAllByTestId(id);
    return elements.find(element => element.props.children === text);
  },
  waitForLoading: async () => {
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).toBeNull();
    });
  },
};

export * from '@testing-library/react-native';
export { 
  customRender as render, 
  customQueries, 
  mockNavigate, 
  mockGoBack,
  navigationMock 
};
export { queryClient };

// Add test wrapper for navigation scenarios
export const renderWithNavigation = (
  component: React.ReactElement,
  { initialParams = {}, screenName = 'Test' } = {}
) => {
  return customRender(
    <Stack.Navigator>
      <Stack.Screen
        name={screenName}
        component={() => component}
        initialParams={initialParams}
      />
    </Stack.Navigator>
  );
};

// Add Jest specific test helpers
export const waitForQueryResponse = async () => {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
  });
};

// Update reset utilities for Jest
export const resetTestEnv = () => {
  queryClient.clear();
  mockNavigate.mockClear();
  mockGoBack.mockClear();
  jest.clearAllMocks();
};