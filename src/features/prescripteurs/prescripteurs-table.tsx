import React from "react";
import { GenericTable } from "../../components/generic-table";
import { usePrescripteurStore } from "../../store/use-prescripteur-store";
import { PrescripteurType } from "../../types";

const prescripteurColumns = [
  { key: "prescripteurName", label: "Nom" },
  { key: "speciality", label: "Spécialité" },
  { key: "address", label: "Adresse" },
  { key: "ville", label: "Ville" },
  { key: "phone", label: "Téléphone" },
  { key: "email", label: "Email" },
  { 
    key: "status", 
    label: "Statut",
    render: (value: string) => (
      <div className={`px-2 py-1 rounded-full text-xs ${
        value === 'Actif' ? 'bg-success-100 text-success-700' : 
        'bg-default-100 text-default-700'
      }`}>
        {value}
      </div>
    )
  }
];

export function PrescripteursTable() {
  const { prescripteurs, addPrescripteur, updatePrescripteur, deletePrescripteur } = usePrescripteurStore();

  const handleAdd = () => {
    console.log("Add prescripteur");
  };

  const handleEdit = (prescripteur: PrescripteurType) => {
    console.log("Edit prescripteur", prescripteur);
  };

  const handleDelete = (prescripteur: PrescripteurType) => {
    console.log("Delete prescripteur", prescripteur);
  };

  return (
    <GenericTable<PrescripteurType>
      data={prescripteurs}
      columns={prescripteurColumns}
      title="Gestion des Prescripteurs"
      description="Liste des médecins prescripteurs"
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      filterKey="prescripteurName"
      filterPlaceholder="Rechercher par nom..."
      exportFileName="prescripteurs"
    />
  );
}