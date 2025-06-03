import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AlertsPanel from '../../components/alerts/AlertsPanel';
import { PatientProvider } from '../../contexts/PatientContext';

describe('AlertsPanel', () => {
  it('renders no alerts message when empty', () => {
    render(
      <PatientProvider>
        <AlertsPanel />
      </PatientProvider>
    );
    
    expect(screen.getByText('No active alerts at this time.')).toBeInTheDocument();
  });

  it('renders alerts correctly', () => {
    const mockAlerts = [{
      id: '1',
      patientId: 'P001',
      patientName: 'Test Patient',
      date: '2025-01-01',
      type: 'mobility-decline',
      message: 'Test alert',
      recommendations: ['Test recommendation'],
      dismissed: false,
      severity: 'high',
      category: 'activity'
    }];

    vi.mock('../../contexts/PatientContext', () => ({
      usePatient: () => ({
        alerts: mockAlerts,
        dismissAlert: vi.fn()
      })
    }));

    render(<AlertsPanel />);
    
    expect(screen.getByText('Test Patient')).toBeInTheDocument();
    expect(screen.getByText('Test alert')).toBeInTheDocument();
  });
});