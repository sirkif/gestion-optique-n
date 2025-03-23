import { create } from 'zustand';
import { BonCommandeType, PieceType } from '../types';

interface BonCommandeState {
  bonCommandes: BonCommandeType[];
  selectedBonCommande: BonCommandeType | null;
  formOpen: boolean;
  formMode: "create" | "edit";
  setBonCommandes: (bonCommandes: BonCommandeType[]) => void;
  addBonCommande: (bonCommande: Omit<BonCommandeType, "id">) => void;
  updateBonCommande: (id: number, bonCommande: Omit<BonCommandeType, "id">) => void;
  deleteBonCommande: (id: number) => void;
  setSelectedBonCommande: (bonCommande: BonCommandeType | null) => void;
  setFormOpen: (open: boolean) => void;
  setFormMode: (mode: "create" | "edit") => void;
}

const initialBonCommandes: BonCommandeType[] = [
  {
    id: 1,
    date: new Date(),
    fournisseurId: 1,
    pieceNumber: "BC001",
    pieceType: PieceType.Facture,
    totalHT: 1000,
    totalTVA: 200,
    totalTTC: 1200,
    bcDetails: []
  },
  {
    id: 2,
    date: new Date(),
    fournisseurId: 2,
    pieceNumber: "BC002",
    pieceType: PieceType.BonLivraison,
    totalHT: 2000,
    totalTVA: 400,
    totalTTC: 2400,
    bcDetails: []
  }
];

export const useBonCommandeStore = create<BonCommandeState>((set) => ({
  bonCommandes: initialBonCommandes,
  selectedBonCommande: null,
  formOpen: false,
  formMode: "create",

  setBonCommandes: (bonCommandes) => set({ bonCommandes }),
  addBonCommande: (bonCommandeData) => set((state) => ({
    bonCommandes: [...state.bonCommandes, { ...bonCommandeData, id: state.bonCommandes.length + 1 }]
  })),
  updateBonCommande: (id, bonCommandeData) => set((state) => ({
    bonCommandes: state.bonCommandes.map(bonCommande => 
      bonCommande.id === id ? { ...bonCommandeData, id } : bonCommande
    )
  })),
  deleteBonCommande: (id) => set((state) => ({
    bonCommandes: state.bonCommandes.filter(bonCommande => bonCommande.id !== id)
  })),
  setSelectedBonCommande: (bonCommande) => set({ selectedBonCommande: bonCommande }),
  setFormOpen: (open) => set({ formOpen: open }),
  setFormMode: (mode) => set({ formMode: mode }),
}));