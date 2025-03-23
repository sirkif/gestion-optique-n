import React from "react";
import { GenericTable } from "../../components/generic-table";
import { useFactureStore } from "../../store/use-facture-store";
import { FactureType } from "../../types";

const factureColumns = [
  { key: "factureNumber", label: "N° Facture" },
  { 
    key: "date", 
    label: "Date",
    render: (value: Date) => new Date(value).toLocaleDateString()
  },
  { key: "clientName", label: "Client" },
  { key: "mode", label: "Mode de paiement" },
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
        value === 'Payée' ? 'bg-success-100 text-success-700' : 
        value === 'En attente' ? 'bg-warning-100 text-warning-700' : 
        'bg-danger-100 text-danger-700'
      }`}>
        {value}
      </div>
    )
  }
];

export function FacturesTable() {
  const { factures, addFacture, updateFacture, deleteFacture } = useFactureStore();

  const handleAdd = () => {
    console.log("Add facture");
  };

  const handleEdit = (facture: FactureType) => {
    console.log("Edit facture", facture);
  };

  const handleDelete = (facture: FactureType) => {
    console.log("Delete facture", facture);
  };

  return (
    <GenericTable<FactureType>
      data={factures}
      columns={factureColumns}
      title="Gestion des Factures"
      description="Liste des factures"
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      filterKey="factureNumber"
      filterPlaceholder="Rechercher par numéro..."
      exportFileName="factures"
    />
  );
}