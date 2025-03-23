import React from "react";
import { GenericTable } from "../../components/generic-table";
import { usePatientStore } from "../../store/use-patient-store";
import { PatientType } from "../../types";
import { CrudModal } from "../../components/crud/crud-modal";
import { PatientForm } from "./patient-form";

const patientColumns = [
  { key: "clientName", label: "Nom" },
  { key: "category", label: "Catégorie" },
  { key: "assurance", label: "Assurance" },
  { key: "phone", label: "Téléphone" },
  { key: "email", label: "Email" },
  { key: "ville", label: "Ville" },
  { key: "periodiciteVisite", label: "Périodicité" },
];

export function PatientsTable() {
  const { patients, addPatient, updatePatient, deletePatient, selectedPatient, setSelectedPatient } = usePatientStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalMode, setModalMode] = React.useState<"create" | "edit" | "delete">("create");
  const [formData, setFormData] = React.useState<Partial<PatientType>>({});

  const handleAdd = () => {
    setModalMode("create");
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (patient: PatientType) => {
    setModalMode("edit");
    setFormData(patient);
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleDelete = (patient: PatientType) => {
    setModalMode("delete");
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (modalMode === "delete" && selectedPatient?.id) {
      deletePatient(selectedPatient.id);
    } else if (modalMode === "edit" && selectedPatient?.id) {
      updatePatient(selectedPatient.id, formData as Omit<PatientType, "id">);
    } else if (modalMode === "create") {
      addPatient(formData as Omit<PatientType, "id">);
    }
    setIsModalOpen(false);
    setSelectedPatient(null);
    setFormData({});
  };

  return (
    <>
      <GenericTable<PatientType>
        data={patients}
        columns={patientColumns}
        title="Gestion des Patients"
        description="Liste des patients"
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        filterKey="clientName"
        filterPlaceholder="Rechercher par nom..."
        exportFileName="patients"
      />

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title={
          modalMode === "create" ? "Ajouter un patient" :
          modalMode === "edit" ? "Modifier un patient" :
          "Supprimer un patient"
        }
        mode={modalMode}
      >
        {modalMode === "delete" ? (
          <p>Êtes-vous sûr de vouloir supprimer ce patient ?</p>
        ) : (
          <PatientForm
            formData={formData}
            onChange={setFormData}
          />
        )}
      </CrudModal>
    </>
  );
}