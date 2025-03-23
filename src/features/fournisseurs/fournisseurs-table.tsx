import React from "react";
import { GenericTable } from "../../components/generic-table";
import { useFournisseurStore } from "../../store/use-fournisseur-store";
import { FournisseurType } from "../../types";

const fournisseurColumns = [
  { key: "fournisseurName", label: "Nom" },
  { key: "address", label: "Adresse" },
  { key: "ville", label: "Ville" },
  { key: "phone", label: "Téléphone" },
  { key: "email", label: "Email" }
];

export function FournisseursTable() {
  const { fournisseurs, addFournisseur, updateFournisseur, deleteFournisseur } = useFournisseurStore();

  const handleAdd = () => {
    console.log("Add fournisseur");
  };

  const handleEdit = (fournisseur: FournisseurType) => {
    console.log("Edit fournisseur", fournisseur);
  };

  const handleDelete = (fournisseur: FournisseurType) => {
    console.log("Delete fournisseur", fournisseur);
  };

  return (
    <GenericTable<FournisseurType>
      data={fournisseurs}
      columns={fournisseurColumns}
      title="Gestion des Fournisseurs"
      description="Liste des fournisseurs"
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      filterKey="fournisseurName"
      filterPlaceholder="Rechercher par nom..."
      exportFileName="fournisseurs"
    />
  );
}