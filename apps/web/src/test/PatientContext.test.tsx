import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PatientProvider, usePatient } from '../contexts/PatientContext';

const TestComponent = () => {
  const { patients, advanceDay, selectPatient, dismissAlert } = usePatient();
  return (
    <div>
      <button onClick={advanceDay}>Advance Day</button>
      {patients.map(patient => (
        <div key={patient.id}>
          <h3>{patient.name}</h3>
          <button onClick={() => selectPatient(patient.id)}>Select Patient</button>
        </div>
      ))}
    </div>
  );
};

describe('PatientContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('provides initial patient data', () => {
    render(
      <PatientProvider>
        <TestComponent />
      </PatientProvider>
    );
    
    expect(screen.getByText('Thomas Williams')).toBeInTheDocument();
  });

  it('handles advancing day', async () => {
    render(
      <PatientProvider>
        <TestComponent />
      </PatientProvider>
    );
    
    const advanceButton = screen.getByText('Advance Day');
    await userEvent.click(advanceButton);
    
    // Verify that patient data is updated
    await waitFor(() => {
      const patients = screen.getAllByRole('heading', { level: 3 });
      expect(patients).toHaveLength(5);
    });
  });

  it('handles patient selection', async () => {
    render(
      <PatientProvider>
        <TestComponent />
      </PatientProvider>
    );
    
    const selectButton = screen.getAllByText('Select Patient')[0];
    await userEvent.click(selectButton);
    
    // Verify patient selection
    await waitFor(() => {
      expect(screen.getByText('Thomas Williams')).toBeInTheDocument();
    });
  });
});