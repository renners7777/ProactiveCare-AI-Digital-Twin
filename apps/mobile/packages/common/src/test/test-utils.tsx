import React from 'react';
import { render, RenderOptions, screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from '../contexts/AuthContext';
import { PatientProvider } from '../contexts/PatientContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

// Add custom queries and utilities
const customQueries = {
  findByTestId: async (id: string) => {
    const element = await screen.findByTestId(id);
    return element;
  },
};

export * from '@testing-library/react-native';
export { customRender as render, customQueries };
export { queryClient };