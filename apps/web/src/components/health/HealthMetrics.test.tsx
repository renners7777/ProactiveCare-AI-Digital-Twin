import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { HealthMetrics } from './HealthMetrics';
import { renderWithProviders } from '../../test/utils';
import { useHealthData } from '../../hooks/useHealthData';

vi.mock('../../hooks/useHealthData');

describe('HealthMetrics', () => {
  it('renders health metrics charts', () => {
    vi.mocked(useHealthData).mockReturnValue({
      heartRate: [{ timestamp: new Date(), value: 72 }],
      bloodOxygen: [{ timestamp: new Date(), value: 98 }],
      steps: [{ timestamp: new Date(), value: 5000 }],
    });

    renderWithProviders(<HealthMetrics />);

    expect(screen.getByText('Heart Rate')).toBeInTheDocument();
    expect(screen.getByText('Blood Oxygen')).toBeInTheDocument();
    expect(screen.getByText('Steps')).toBeInTheDocument();
  });
});