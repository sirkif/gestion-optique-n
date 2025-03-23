import { create } from 'zustand';
import { BonLivraisonType, CorrectionType, ModeType } from '../types';

interface BonLivraisonState {
  bonLivraisons: BonLivraisonType[];
  selectedBonLivraison: BonLivraisonType | null;
  formOpen: boolean;
  formMode: "create" | "edit";
  setBonLivraisons: (bonLivraisons: BonLivraisonType[]) => void;
  addBonLivraison: (bonLivraison: Omit<BonLivraisonType, "id">) => void;
  updateBonLivraison: (id: number, bonLivraison: Omit<BonLivraisonType, "id">) => void;
  deleteBonLivraison: (id: number) => void;
  setSelectedBonLivraison: (bonLivraison: BonLivraisonType | null) => void;
  setFormOpen: (open: boolean) => void;
  setFormMode: (mode: "create" | "edit") => void;
}

const initialBonLivraisons: BonLivraisonType[] = [
  {
    id: 1,
    date: new Date(),
    idClient: "CLT001",
    clientName: "Jean Dupont",
    correction: CorrectionType.Verre,
    mode: ModeType.Especes,
    totalHT: 1500,
    totalTVA: 300,
    totalTTC: 1800
  },
  {
    id: 2,
    date: new Date(),
    idClient: "CLT002",
    clientName: "Marie Martin",
    correction: CorrectionType.Lentille,
    mode: ModeType.Credit,
    totalHT: 2500,
    totalTVA: 500,
    totalTTC: 3000
  }
];

export const useBonLivraisonStore = create<BonLivraisonState>((set) => ({
  bonLivraisons: initialBonLivraisons,
  selectedBonLivraison: null,
  formOpen: false,
  formMode: "create",

  setBonLivraisons: (bonLivraisons) => set({ bonLivraisons }),
  addBonLivraison: (bonLivraisonData) => set((state) => ({
    bonLivraisons: [...state.bonLivraisons, { ...bonLivraisonData, id: state.bonLivraisons.length + 1 }]
  })),
  updateBonLivraison: (id, bonLivraisonData) => set((state) => ({
    bonLivraisons: state.bonLivraisons.map(bonLivraison => 
      bonLivraison.id === id ? { ...bonLivraisonData, id } : bonLivraison
    )
  })),
  deleteBonLivraison: (id) => set((state) => ({
    bonLivraisons: state.bonLivraisons.filter(bonLivraison => bonLivraison.id !== id)
  })),
  setSelectedBonLivraison: (bonLivraison) => set({ selectedBonLivraison: bonLivraison }),
  setFormOpen: (open) => set({ formOpen: open }),
  setFormMode: (mode) => set({ formMode: mode }),
}));