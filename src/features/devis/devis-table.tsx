import React from "react";
import { GenericTable } from "../../components/generic-table";
import { useDevisStore } from "../../store/use-devis-store";
import { DevisType } from "../../types";

const devisColumns = [
  { key: "devisNumber", label: "N° Devis" },
  { 
    key: "date", 
    label: "Date",
    render: (value: Date) => new Date(value).toLocaleDateString()
  },
  { key: "clientName", label: "Client" },
  { 
    key: "validUntil", 
    label: "Valide jusqu'au",
    render: (value: Date) => new Date(value).toLocaleDateString()
  },
  { 
    key: "totalHT", 
    label: "Total HT",
    render: (value: number) => `${value.toFixed(2)} DH`
  },
  { 
    key: "totalTVA", 
    label: "TVA",
    render: (value: number) => `${value.toFixed(2)} DH`
  },
  { 
    key: "totalTTC", 
    label: "Total TTC",
    render: (value: number) => `${value.toFixed(2)} DH`
  },
  { 
    key: "status", 
    label: "Statut",
    render: (value: string) => (
      <div className={`px-2 py-1 rounded-full text-xs ${
        value === 'Accepté' ? 'bg-success-100 text-success-700' : 
        value === 'En attente' ? 'bg-warning-100 text-warning-700' : 
        value === 'Expiré' ? 'bg-danger-100 text-danger-700' :
        'bg-default-100 text-default-700'
      }`}>
        {value}
      </div>
    )
  }
];

export function DevisTable() {
  const { devis, addDevis, updateDevis, deleteDevis } = useDevisStore();

  const handleAdd = () => {
    console.log("Add devis");
  };

  const handleEdit = (devis: DevisType) => {
    console.log("Edit devis", devis);
  };

  const handleDelete = (devis: DevisType) => {
    console.log("Delete devis", devis);
  };

  return (
    <GenericTable<DevisType>
      data={devis}
      columns={devisColumns}
      title="Gestion des Devis"
      description="Liste des devis"
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      filterKey="devisNumber"
      filterPlaceholder="Rechercher par numéro..."
      exportFileName="devis"
    />
  );
}