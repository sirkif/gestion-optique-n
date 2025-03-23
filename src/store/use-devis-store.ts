import { create } from 'zustand';
import { DevisType } from '../types';

interface DevisState {
  devis: DevisType[];
  selectedDevis: DevisType | null;
  formOpen: boolean;
  formMode: "create" | "edit";
  setDevis: (devis: DevisType[]) => void;
  addDevis: (devis: Omit<DevisType, "id">) => void;
  updateDevis: (id: number, devis: Omit<DevisType, "id">) => void;
  deleteDevis: (id: number) => void;
  setSelectedDevis: (devis: DevisType | null) => void;
  setFormOpen: (open: boolean) => void;
  setFormMode: (mode: "create" | "edit") => void;
}

// Helper function to add days to a date
const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const initialDevis: DevisType[] = [
  {
    id: 1,
    devisNumber: "DEV-2024-001",
    date: new Date(),
    validUntil: addDays(new Date(), 30),
    clientId: "CLT001",
    clientName: "Jean Dupont",
    totalHT: 3500,
    totalTVA: 700,
    totalTTC: 4200,
    status: "En attente",
    devisDetails: []
  },
  {
    id: 2,
    devisNumber: "DEV-2024-002",
    date: new Date(),
    validUntil: addDays(new Date(), 30),
    clientId: "CLT002",
    clientName: "Marie Martin",
    totalHT: 2800,
    totalTVA: 560,
    totalTTC: 3360,
    status: "Accepté",
    devisDetails: []
  },
  {
    id: 3,
    devisNumber: "DEV-2024-003",
    date: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000), // 40 days ago
    validUntil: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    clientId: "CLT003",
    clientName: "Ahmed Alami",
    totalHT: 4200,
    totalTVA: 840,
    totalTTC: 5040,
    status: "Expiré",
    devisDetails: []
  }
];

export const useDevisStore = create<DevisState>((set) => ({
  devis: initialDevis,
  selectedDevis: null,
  formOpen: false,
  formMode: "create",

  setDevis: (devis) => set({ devis }),
  addDevis: (devisData) => set((state) => ({
    devis: [...state.devis, { ...devisData, id: state.devis.length + 1 }]
  })),
  updateDevis: (id, devisData) => set((state) => ({
    devis: state.devis.map(devis => 
      devis.id === id ? { ...devisData, id } : devis
    )
  })),
  deleteDevis: (id) => set((state) => ({
    devis: state.devis.filter(devis => devis.id !== id)
  })),
  setSelectedDevis: (devis) => set({ selectedDevis: devis }),
  setFormOpen: (open) => set({ formOpen: open }),
  setFormMode: (mode) => set({ formMode: mode }),
}));