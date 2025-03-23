import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
import { useUserStore } from "../store/use-user-store";

export const DeleteConfirmModal: React.FC = () => {
  const {
    deleteModalOpen,
    selectedUser,
    setDeleteModalOpen,
    deleteUser,
  } = useUserStore();

  const handleConfirm = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id);
      setDeleteModalOpen(false);
    }
  };

  return (
    <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Confirmer la suppression</ModalHeader>
        <ModalBody>
          <p>Êtes-vous sûr de vouloir supprimer l'utilisateur {selectedUser?.name} ?</p>
          <p className="text-sm text-default-400">Cette action est irréversible.</p>
        </ModalBody>
        <ModalFooter>
          <Button color="default" variant="light" onPress={() => setDeleteModalOpen(false)}>
            Annuler
          </Button>
          <Button color="danger" onPress={handleConfirm}>
            Supprimer
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};