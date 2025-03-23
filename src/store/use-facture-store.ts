import { create } from 'zustand';
import { FactureType, ModeType } from '../types';

interface FactureState {
  factures: FactureType[];
  selectedFacture: FactureType | null;
  formOpen: boolean;
  formMode: "create" | "edit";
  setFactures: (factures: FactureType[]) => void;
  addFacture: (facture: Omit<FactureType, "id">) => void;
  updateFacture: (id: number, facture: Omit<FactureType, "id">) => void;
  deleteFacture: (id: number) => void;
  setSelectedFacture: (facture: FactureType | null) => void;
  setFormOpen: (open: boolean) => void;
  setFormMode: (mode: "create" | "edit") => void;
}

const initialFactures: FactureType[] = [
  {
    id: 1,
    factureNumber: "FAC-2024-001",
    date: new Date(),
    clientId: "CLT001",
    clientName: "Jean Dupont",
    mode: ModeType.Especes,
    totalHT: 2500,
    totalTVA: 500,
    totalTTC: 3000,
    status: "Payée",
    factureDetails: []
  },
  {
    id: 2,
    factureNumber: "FAC-2024-002",
    date: new Date(),
    clientId: "CLT002",
    clientName: "Marie Martin",
    mode: ModeType.Credit,
    totalHT: 1800,
    totalTVA: 360,
    totalTTC: 2160,
    status: "En attente",
    factureDetails: []
  },
  {
    id: 3,
    factureNumber: "FAC-2024-003",
    date: new Date(),
    clientId: "CLT003",
    clientName: "Ahmed Alami",
    mode: ModeType.Cheque,
    totalHT: 3200,
    totalTVA: 640,
    totalTTC: 3840,
    status: "En retard",
    factureDetails: []
  }
];

export const useFactureStore = create<FactureState>((set) => ({
  factures: initialFactures,
  selectedFacture: null,
  formOpen: false,
  formMode: "create",

  setFactures: (factures) => set({ factures }),
  addFacture: (factureData) => set((state) => ({
    factures: [...state.factures, { ...factureData, id: state.factures.length + 1 }]
  })),
  updateFacture: (id, factureData) => set((state) => ({
    factures: state.factures.map(facture => 
      facture.id === id ? { ...factureData, id } : facture
    )
  })),
  deleteFacture: (id) => set((state) => ({
    factures: state.factures.filter(facture => facture.id !== id)
  })),
  setSelectedFacture: (facture) => set({ selectedFacture: facture }),
  setFormOpen: (open) => set({ formOpen: open }),
  setFormMode: (mode) => set({ formMode: mode }),
}));