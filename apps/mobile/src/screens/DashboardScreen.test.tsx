import React from 'react';
import { describe, it, expect, vi } from '@jest/globals';
import { screen } from '@testing-library/react-native';
import { DashboardScreen } from './DashboardScreen';
import { renderWithProviders } from '../test/utils';
import { useHealthData } from '../hooks/useHealthData';

vi.mock('../hooks/useHealthData');

describe('DashboardScreen', () => {
  it('renders health data', () => {
    vi.mocked(useHealthData).mockReturnValue({
      heartRate: [{ timestamp: new Date(), value: 72 }],
      bloodOxygen: [{ timestamp: new Date(), value: 98 }],
      steps: [{ timestamp: new Date(), value: 5000 }],
    });

    renderWithProviders(<DashboardScreen />);

    expect(screen.getByText('Heart Rate')).toBeTruthy();
    expect(screen.getByText('72 BPM')).toBeTruthy();
  });
});