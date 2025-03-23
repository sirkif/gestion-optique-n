import { create } from 'zustand';
import { FournisseurType } from '../types';

interface FournisseurState {
  fournisseurs: FournisseurType[];
  selectedFournisseur: FournisseurType | null;
  formOpen: boolean;
  formMode: "create" | "edit";
  setFournisseurs: (fournisseurs: FournisseurType[]) => void;
  addFournisseur: (fournisseur: Omit<FournisseurType, "id">) => void;
  updateFournisseur: (id: number, fournisseur: Omit<FournisseurType, "id">) => void;
  deleteFournisseur: (id: number) => void;
  setSelectedFournisseur: (fournisseur: FournisseurType | null) => void;
  setFormOpen: (open: boolean) => void;
  setFormMode: (mode: "create" | "edit") => void;
}

const initialFournisseurs: FournisseurType[] = [
  {
    id: 1,
    fournisseurName: "OptiVision SARL",
    address: "123 Zone Industrielle",
    ville: "Casablanca",
    phone: "0522123456",
    email: "contact@optivision.ma"
  },
  {
    id: 2,
    fournisseurName: "LentillesPlus",
    address: "45 Rue Mohammed V",
    ville: "Rabat",
    phone: "0537234567",
    email: "info@lentillesplus.ma"
  },
  {
    id: 3,
    fournisseurName: "VisionTech",
    address: "78 Avenue Hassan II",
    ville: "Marrakech",
    phone: "0524345678",
    email: "contact@visiontech.ma"
  }
];

export const useFournisseurStore = create<FournisseurState>((set) => ({
  fournisseurs: initialFournisseurs,
  selectedFournisseur: null,
  formOpen: false,
  formMode: "create",

  setFournisseurs: (fournisseurs) => set({ fournisseurs }),
  addFournisseur: (fournisseurData) => set((state) => ({
    fournisseurs: [...state.fournisseurs, { ...fournisseurData, id: state.fournisseurs.length + 1 }]
  })),
  updateFournisseur: (id, fournisseurData) => set((state) => ({
    fournisseurs: state.fournisseurs.map(fournisseur => 
      fournisseur.id === id ? { ...fournisseurData, id } : fournisseur
    )
  })),
  deleteFournisseur: (id) => set((state) => ({
    fournisseurs: state.fournisseurs.filter(fournisseur => fournisseur.id !== id)
  })),
  setSelectedFournisseur: (fournisseur) => set({ selectedFournisseur: fournisseur }),
  setFormOpen: (open) => set({ formOpen: open }),
  setFormMode: (mode) => set({ formMode: mode }),
}));