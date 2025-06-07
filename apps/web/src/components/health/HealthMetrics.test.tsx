import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HealthMetrics } from './HealthMetrics';
import { AuthProvider } from '../../contexts/AuthContext';
import { useHealthData } from '../../hooks/useHealthData';

// Mock supabase
vi.mock('common/src/supabase', () => ({
  supabase: {
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: { id: '123' } } })
    }
  }
}));

// Mock health data hook
vi.mock('../../hooks/useHealthData', () => ({
  useHealthData: vi.fn()
}));

describe('HealthMetrics', () => {
  it('renders health data charts', () => {
    vi.mocked(useHealthData).mockReturnValue({
      heartRate: [{ timestamp: new Date(), value: 72 }],
      bloodOxygen: [{ timestamp: new Date(), value: 98 }],
      steps: [{ timestamp: new Date(), value: 5000 }]
    });

    render(
      <AuthProvider>
        <HealthMetrics />
      </AuthProvider>
    );

    expect(screen.getByText('Heart Rate')).toBeInTheDocument();
    expect(screen.getByText('Blood Oxygen')).toBeInTheDocument();
    expect(screen.getByText('Steps')).toBeInTheDocument();
  });
});