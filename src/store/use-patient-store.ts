import { create } from 'zustand';
import { PatientType, CategoryType, AssuranceType, PeriodiciteVisiteType } from '../types';

interface PatientState {
  patients: PatientType[];
  selectedPatient: PatientType | null;
  setPatients: (patients: PatientType[]) => void;
  addPatient: (patient: Omit<PatientType, "id">) => void;
  updatePatient: (id: number, patient: Omit<PatientType, "id">) => void;
  deletePatient: (id: number) => void;
  setSelectedPatient: (patient: PatientType | null) => void;
}

const initialPatients: PatientType[] = [
  {
    id: 1,
    clientName: "John Doe",
    category: CategoryType.Particulier,
    assurance: AssuranceType.CNOPS,
    address: "123 Rue Example",
    ville: "Casablanca",
    phone: "0600000001",
    email: "john@example.com",
    periodiciteVisite: PeriodiciteVisiteType.One
  },
  {
    id: 2,
    clientName: "Jane Smith",
    category: CategoryType.Entreprise,
    assurance: AssuranceType.AMO,
    address: "456 Avenue Test",
    ville: "Rabat",
    phone: "0600000002",
    email: "jane@example.com",
    periodiciteVisite: PeriodiciteVisiteType.Two
  }
];

export const usePatientStore = create<PatientState>((set) => ({
  patients: initialPatients,
  selectedPatient: null,

  setPatients: (patients) => set({ patients }),
  addPatient: (patientData) => set((state) => ({
    patients: [...state.patients, { ...patientData, id: state.patients.length + 1 }]
  })),
  updatePatient: (id, patientData) => set((state) => ({
    patients: state.patients.map(patient => 
      patient.id === id ? { ...patientData, id } : patient
    )
  })),
  deletePatient: (id) => set((state) => ({
    patients: state.patients.filter(patient => patient.id !== id)
  })),
  setSelectedPatient: (patient) => set({ selectedPatient: patient }),
}));