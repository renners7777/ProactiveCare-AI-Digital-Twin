import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatient } from '../contexts/PatientContext';
import PatientSummaryCard from '../components/patients/PatientSummaryCard';

const PatientsPage: React.FC = () => {
  const { patients } = usePatient();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-800">Patients</h1>
        <p className="text-neutral-500 mt-1">Manage and monitor your patients</p>
      </div>

      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="space-y-4">
          {patients.map(patient => (
            <PatientSummaryCard 
              key={patient.id}
              patient={patient}
              onClick={() => navigate(`/patient/${patient.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientsPage;