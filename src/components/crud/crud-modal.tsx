import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";

interface CrudModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
  mode: "create" | "edit" | "delete";
}

export function CrudModal({ isOpen, onClose, onConfirm, title, children, mode }: CrudModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              {children}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Annuler
              </Button>
              <Button 
                color={mode === "delete" ? "danger" : "primary"} 
                onPress={() => {
                  onConfirm();
                  onClose();
                }}
              >
                {mode === "create" ? "Créer" : mode === "edit" ? "Modifier" : "Supprimer"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}