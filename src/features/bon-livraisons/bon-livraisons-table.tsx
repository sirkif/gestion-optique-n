import React from "react";
import { GenericTable } from "../../components/generic-table";
import { useBonLivraisonStore } from "../../store/use-bon-livraison-store";
import { BonLivraisonType } from "../../types";
import { CrudModal } from "../../components/crud/crud-modal";
import { BonLivraisonForm } from "./bon-livraison-form";

// Helper function to format enum values
const formatEnumValue = (value: string | undefined) => {
  if (!value) return "-";
  return value.split(/(?=[A-Z])/).join(" ");
};

const bonLivraisonColumns = [
  { key: "id", label: "N° BL" },
  { 
    key: "date", 
    label: "Date",
    render: (value: Date | undefined) => value ? new Date(value).toLocaleDateString() : "-"
  },
  { key: "clientName", label: "Client" },
  { 
    key: "correction", 
    label: "Correction",
    render: (value: string | undefined) => formatEnumValue(value)
  },
  { 
    key: "mode", 
    label: "Mode",
    render: (value: string | undefined) => formatEnumValue(value)
  },
  { 
    key: "totalHT", 
    label: "Total HT",
    render: (value: number | undefined) => value ? `${value.toFixed(2)} DH` : "0.00 DH"
  },
  { 
    key: "totalTTC", 
    label: "Total TTC",
    render: (value: number | undefined) => value ? `${value.toFixed(2)} DH` : "0.00 DH"
  }
];

export function BonLivraisonsTable() {
  const { bonLivraisons, addBonLivraison, updateBonLivraison, deleteBonLivraison, selectedBonLivraison, setSelectedBonLivraison } = useBonLivraisonStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalMode, setModalMode] = React.useState<"create" | "edit" | "delete">("create");
  const [formData, setFormData] = React.useState<Partial<BonLivraisonType>>({});

  const handleAdd = () => {
    setModalMode("create");
    setFormData({
      date: new Date(),
      totalHT: 0,
      totalTVA: 0,
      totalTTC: 0,
      correction: undefined,
      mode: undefined
    });
    setIsModalOpen(true);
  };

  const handleEdit = (bonLivraison: BonLivraisonType) => {
    setModalMode("edit");
    setFormData({
      ...bonLivraison,
      date: bonLivraison.date || new Date(),
      totalHT: bonLivraison.totalHT || 0,
      totalTVA: bonLivraison.totalTVA || 0,
      totalTTC: bonLivraison.totalTTC || 0
    });
    setSelectedBonLivraison(bonLivraison);
    setIsModalOpen(true);
  };

  const handleDelete = (bonLivraison: BonLivraisonType) => {
    setModalMode("delete");
    setSelectedBonLivraison(bonLivraison);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (modalMode === "delete" && selectedBonLivraison?.id) {
      deleteBonLivraison(selectedBonLivraison.id);
    } else if (modalMode === "edit" && selectedBonLivraison?.id) {
      updateBonLivraison(selectedBonLivraison.id, {
        ...formData,
        date: formData.date || new Date(),
        totalHT: formData.totalHT || 0,
        totalTVA: formData.totalTVA || 0,
        totalTTC: formData.totalTTC || 0
      } as BonLivraisonType);
    } else if (modalMode === "create") {
      addBonLivraison({
        ...formData,
        date: formData.date || new Date(),
        totalHT: formData.totalHT || 0,
        totalTVA: formData.totalTVA || 0,
        totalTTC: formData.totalTTC || 0
      } as BonLivraisonType);
    }
    setIsModalOpen(false);
    setSelectedBonLivraison(null);
    setFormData({});
  };

  return (
    <>
      <GenericTable<BonLivraisonType>
        data={bonLivraisons}
        columns={bonLivraisonColumns}
        title="Gestion des Bons de Livraison"
        description="Liste des bons de livraison"
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        filterKey="clientName"
        filterPlaceholder="Rechercher par client..."
        exportFileName="bons-livraison"
      />

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title={
          modalMode === "create" ? "Ajouter un bon de livraison" :
          modalMode === "edit" ? "Modifier un bon de livraison" :
          "Supprimer un bon de livraison"
        }
        mode={modalMode}
      >
        {modalMode === "delete" ? (
          <p>Êtes-vous sûr de vouloir supprimer ce bon de livraison ?</p>
        ) : (
          <BonLivraisonForm
            formData={formData}
            onChange={setFormData}
          />
        )}
      </CrudModal>
    </>
  );
}