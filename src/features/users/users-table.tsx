import React from "react";
import { GenericTable } from "../../components/generic-table";
import { useUserStore } from "../../store/use-user-store";
import { UserType, Role } from "../../types";
import { Avatar, Input, Select, SelectItem } from "@heroui/react";
import { CrudModal } from "../../components/crud/crud-modal";

const userColumns = [
  { 
    key: "image",
    label: "Photo",
    render: (value: string, user: UserType) => (
      <Avatar
        src={value || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
        alt={user.name}
        size="sm"
        className="transition-transform"
      />
    )
  },
  { key: "name", label: "Nom" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Téléphone" },
  { 
    key: "role", 
    label: "Rôle",
    render: (value: Role) => (
      <div className={`px-2 py-1 rounded-full text-xs ${
        value === Role.Admin ? 'bg-primary-100 text-primary-700' :
        value === Role.Manager ? 'bg-success-100 text-success-700' :
        value === Role.Caisier ? 'bg-warning-100 text-warning-700' :
        value === Role.Controleur ? 'bg-secondary-100 text-secondary-700' :
        'bg-default-100 text-default-700'
      }`}>
        {value}
      </div>
    )
  },
  { 
    key: "status", 
    label: "Statut",
    render: (value: string) => (
      <div className={`px-2 py-1 rounded-full text-xs ${
        value === 'Actif' ? 'bg-success-100 text-success-700' : 
        'bg-danger-100 text-danger-700'
      }`}>
        {value}
      </div>
    )
  }
];

export function UsersTable() {
  const { users, addUser, updateUser, deleteUser, selectedUser, setSelectedUser } = useUserStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalMode, setModalMode] = React.useState<"create" | "edit" | "delete">("create");
  const [formData, setFormData] = React.useState<Partial<UserType>>({});

  const handleAdd = () => {
    setModalMode("create");
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (user: UserType) => {
    setModalMode("edit");
    setFormData(user);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (user: UserType) => {
    setModalMode("delete");
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    switch (modalMode) {
      case "create":
        addUser(formData as Omit<UserType, "id">);
        break;
      case "edit":
        if (selectedUser?.id) {
          updateUser(selectedUser.id, formData as Omit<UserType, "id">);
        }
        break;
      case "delete":
        if (selectedUser?.id) {
          deleteUser(selectedUser.id);
        }
        break;
    }
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const renderModalContent = () => {
    if (modalMode === "delete") {
      return (
        <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
      );
    }

    return (
      <div className="flex flex-col gap-4">
        <Input
          label="Nom"
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Input
          label="Email"
          type="email"
          value={formData.email || ""}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          label="Téléphone"
          value={formData.phone || ""}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <Select
          label="Rôle"
          selectedKeys={formData.role ? [formData.role] : []}
          onChange={(e) => setFormData({ ...formData, role: e.target.value as Role })}
        >
          {Object.values(Role).map((role) => (
            <SelectItem key={role} value={role}>
              {role}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Statut"
          selectedKeys={formData.status ? [formData.status] : []}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <SelectItem key="Actif" value="Actif">Actif</SelectItem>
          <SelectItem key="Inactif" value="Inactif">Inactif</SelectItem>
        </Select>
      </div>
    );
  };

  return (
    <>
      <GenericTable<UserType>
        data={users}
        columns={userColumns}
        title="Gestion des Utilisateurs"
        description="Liste des utilisateurs du système"
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        filterKey="name"
        filterPlaceholder="Rechercher par nom..."
        exportFileName="users"
      />

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title={
          modalMode === "create" ? "Ajouter un utilisateur" :
          modalMode === "edit" ? "Modifier un utilisateur" :
          "Supprimer un utilisateur"
        }
        mode={modalMode}
      >
        {renderModalContent()}
      </CrudModal>
    </>
  );
}