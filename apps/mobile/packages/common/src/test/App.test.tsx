import { describe, it, expect } from '@jest/globals';
import { render } from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
  it('renders correctly', () => {
    const { getByText } = render(<App />);
    expect(getByText('Welcome to ProactiveCare Mobile')).toBeTruthy();
  });

  it('renders navigation container', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('navigation-container')).toBeTruthy();
  });
});