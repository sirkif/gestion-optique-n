import { create } from 'zustand';
import { UserType, Role } from '../types';

interface UserState {
  users: UserType[];
  selectedUser: UserType | null;
  formOpen: boolean;
  formMode: "create" | "edit";
  setUsers: (users: UserType[]) => void;
  addUser: (user: Omit<UserType, "id">) => void;
  updateUser: (id: number, user: Omit<UserType, "id">) => void;
  deleteUser: (id: number) => void;
  setSelectedUser: (user: UserType | null) => void;
  setFormOpen: (open: boolean) => void;
  setFormMode: (mode: "create" | "edit") => void;
}

const initialUsers: UserType[] = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    phone: "0600000001",
    password: "encrypted_password",
    image: "https://i.pravatar.cc/150?u=admin@example.com",
    role: Role.Admin,
    status: "Actif"
  },
  {
    id: 2,
    name: "Manager User",
    email: "manager@example.com",
    phone: "0600000002",
    password: "encrypted_password",
    image: "https://i.pravatar.cc/150?u=manager@example.com",
    role: Role.Manager,
    status: "Actif"
  },
  {
    id: 3,
    name: "Caissier User",
    email: "caissier@example.com",
    phone: "0600000003",
    password: "encrypted_password",
    image: "https://i.pravatar.cc/150?u=caissier@example.com",
    role: Role.Caisier,
    status: "Actif"
  },
  {
    id: 4,
    name: "Controleur User",
    email: "controleur@example.com",
    phone: "0600000004",
    password: "encrypted_password",
    image: "https://i.pravatar.cc/150?u=controleur@example.com",
    role: Role.Controleur,
    status: "Inactif"
  }
];

export const useUserStore = create<UserState>((set) => ({
  users: initialUsers,
  selectedUser: null,
  formOpen: false,
  formMode: "create",

  setUsers: (users) => set({ users }),
  addUser: (userData) => set((state) => ({
    users: [...state.users, { ...userData, id: state.users.length + 1 }]
  })),
  updateUser: (id, userData) => set((state) => ({
    users: state.users.map(user => 
      user.id === id ? { ...userData, id } : user
    )
  })),
  deleteUser: (id) => set((state) => ({
    users: state.users.filter(user => user.id !== id)
  })),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setFormOpen: (open) => set({ formOpen: open }),
  setFormMode: (mode) => set({ formMode: mode }),
}));