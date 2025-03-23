import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@heroui/react";
import { useUserStore } from "../store/use-user-store";

export const UserFormModal: React.FC = () => {
  const {
    userFormOpen,
    selectedUser,
    formMode,
    setUserFormOpen,
    addUser,
    updateUser,
  } = useUserStore();

  const [formData, setFormData] = React.useState({
    name: "",
    role: "",
    team: "",
    status: "Actif"
  });

  React.useEffect(() => {
    if (selectedUser) {
      setFormData({
        name: selectedUser.name,
        role: selectedUser.role,
        team: selectedUser.team,
        status: selectedUser.status
      });
    } else {
      setFormData({
        name: "",
        role: "",
        team: "",
        status: "Actif"
      });
    }
  }, [selectedUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formMode === "create") {
      addUser(formData);
    } else if (selectedUser) {
      updateUser(selectedUser.id, formData);
    }
    setUserFormOpen(false);
  };

  return (
    <Modal isOpen={userFormOpen} onClose={() => setUserFormOpen(false)}>
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">
            {formMode === "create" ? "Ajouter un utilisateur" : "Modifier l'utilisateur"}
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <Input
                label="Nom"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label="Rôle"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              />
              <Input
                label="Équipe"
                value={formData.team}
                onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                required
              />
              <select
                className="w-full px-3 py-2 rounded-md border border-default-200"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                required
              >
                <option value="Actif">Actif</option>
                <option value="En pause">En pause</option>
                <option value="En congé">En congé</option>
              </select>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={() => setUserFormOpen(false)}>
              Annuler
            </Button>
            <Button color="primary" type="submit">
              {formMode === "create" ? "Ajouter" : "Modifier"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};