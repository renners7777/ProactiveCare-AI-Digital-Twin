import React from 'react';
import { render, screen, fireEvent } from '../test/test-utils';
import { HomeScreen } from '../screens/HomeScreen';

describe('HomeScreen', () => {
  it('renders correctly', () => {
    render(<HomeScreen />);
    
    expect(screen.getByText('Welcome')).toBeTruthy();
  });

  it('handles navigation', () => {
    const mockNavigate = jest.fn();
    render(<HomeScreen navigation={{ navigate: mockNavigate }} />);
    
    fireEvent.press(screen.getByText('View Health Data'));
    
    expect(mockNavigate).toHaveBeenCalledWith('HealthData');
  });
});