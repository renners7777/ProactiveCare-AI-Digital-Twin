import React, { createContext, ReactElement, ReactNode, FC } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';

// Define a type for your AuthContext value
interface AuthContextType {
  // Define the shape of your auth context
  // Example:
  // isAuthenticated: boolean;
  // user?: { id: string; name: string };
  // login: () => void;
  // logout: () => void;
  [key: string]: any; // Replace with more specific types for your context
}

// Create the context with a default value or undefined if you handle it
const defaultAuthContextValue: AuthContextType | undefined = undefined;
export const AuthContext = createContext<AuthContextType | undefined>(
  defaultAuthContextValue
);

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  providerProps?: AuthContextType; // providerProps should match AuthContextType or be Partial
}

const customRender = (
  ui: ReactElement,
  { providerProps, ...renderOptions }: CustomRenderOptions = {}
): RenderResult => {
  const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
    return (
      <AuthContext.Provider value={providerProps || defaultAuthContextValue}>
        {children}
      </AuthContext.Provider>
    );
  };
  return render(ui, { wrapper, ...renderOptions });
};

// Re-export everything from testing-library/react
export * from '@testing-library/react';
// Override render method with our custom one
export { customRender as render };