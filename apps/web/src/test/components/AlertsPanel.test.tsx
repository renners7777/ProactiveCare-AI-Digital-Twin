import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AlertsPanel } from '../../components/alerts/AlertsPanel';
import { PatientProvider, usePatient } from '../../contexts/PatientContext';

const mockAlerts = [
  { id: 1, message: 'Test Alert 1', severity: 'high' },
  { id: 2, message: 'Test Alert 2', severity: 'medium' }
];

vi.mock('../../contexts/PatientContext', () => ({
  PatientProvider: ({ children }) => children,
  usePatient: () => ({
    alerts: mockAlerts,
    dismissAlert: vi.fn()
  })
}));

describe('AlertsPanel', () => {
  it('renders no alerts message when empty', () => {
    vi.mocked(usePatient).mockReturnValueOnce({
      alerts: [],
      dismissAlert: vi.fn()
    });

    render(
      <PatientProvider>
        <AlertsPanel />
      </PatientProvider>
    );

    expect(screen.getByText(/no alerts/i)).toBeInTheDocument();
  });

  it('renders alerts correctly', () => {
    render(
      <PatientProvider>
        <AlertsPanel />
      </PatientProvider>
    );

    expect(screen.getByText('Test Alert 1')).toBeInTheDocument();
    expect(screen.getByText('Test Alert 2')).toBeInTheDocument();
  });
});