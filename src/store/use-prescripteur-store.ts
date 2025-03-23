import { create } from 'zustand';
import { PrescripteurType, SpecialityType } from '../types';

interface PrescripteurState {
  prescripteurs: PrescripteurType[];
  selectedPrescripteur: PrescripteurType | null;
  formOpen: boolean;
  formMode: "create" | "edit";
  setPrescripteurs: (prescripteurs: PrescripteurType[]) => void;
  addPrescripteur: (prescripteur: Omit<PrescripteurType, "id">) => void;
  updatePrescripteur: (id: number, prescripteur: Omit<PrescripteurType, "id">) => void;
  deletePrescripteur: (id: number) => void;
  setSelectedPrescripteur: (prescripteur: PrescripteurType | null) => void;
  setFormOpen: (open: boolean) => void;
  setFormMode: (mode: "create" | "edit") => void;
}

const initialPrescripteurs: PrescripteurType[] = [
  {
    id: 1,
    prescripteurName: "Dr. Mohammed Benani",
    speciality: SpecialityType.Opthalmologue,
    address: "123 Boulevard Mohammed V",
    ville: "Casablanca",
    phone: "0522123456",
    email: "m.benani@email.ma",
    status: "Actif"
  },
  {
    id: 2,
    prescripteurName: "Dr. Fatima Alaoui",
    speciality: SpecialityType.Opthalmologue,
    address: "45 Rue Hassan II",
    ville: "Rabat",
    phone: "0537234567",
    email: "f.alaoui@email.ma",
    status: "Actif"
  },
  {
    id: 3,
    prescripteurName: "Dr. Ahmed Tazi",
    speciality: SpecialityType.Opthalmologue,
    address: "78 Avenue des FAR",
    ville: "Marrakech",
    phone: "0524345678",
    email: "a.tazi@email.ma",
    status: "Inactif"
  }
];

export const usePrescripteurStore = create<PrescripteurState>((set) => ({
  prescripteurs: initialPrescripteurs,
  selectedPrescripteur: null,
  formOpen: false,
  formMode: "create",

  setPrescripteurs: (prescripteurs) => set({ prescripteurs }),
  addPrescripteur: (prescripteurData) => set((state) => ({
    prescripteurs: [...state.prescripteurs, { ...prescripteurData, id: state.prescripteurs.length + 1 }]
  })),
  updatePrescripteur: (id, prescripteurData) => set((state) => ({
    prescripteurs: state.prescripteurs.map(prescripteur => 
      prescripteur.id === id ? { ...prescripteurData, id } : prescripteur
    )
  })),
  deletePrescripteur: (id) => set((state) => ({
    prescripteurs: state.prescripteurs.filter(prescripteur => prescripteur.id !== id)
  })),
  setSelectedPrescripteur: (prescripteur) => set({ selectedPrescripteur: prescripteur }),
  setFormOpen: (open) => set({ formOpen: open }),
  setFormMode: (mode) => set({ formMode: mode }),
}));