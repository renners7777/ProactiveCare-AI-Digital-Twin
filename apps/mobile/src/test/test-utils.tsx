import React from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from '../contexts/AuthContext';
import { PatientProvider } from '../contexts/PatientContext';

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <PatientProvider>
          {children}
        </PatientProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react-native';
export { customRender as render };