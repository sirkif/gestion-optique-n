import React from "react";
import { GenericTable } from "../../components/generic-table";
import { useBonCommandeStore } from "../../store/use-bon-commande-store";
import { BonCommandeType } from "../../types";
import { CrudModal } from "../../components/crud/crud-modal";
import { BonCommandeForm } from "./bon-commande-form";

const bonCommandeColumns = [
  { key: "id", label: "ID" },
  { key: "pieceNumber", label: "N° Pièce" },
  { 
    key: "date", 
    label: "Date",
    render: (value: Date | undefined) => value ? new Date(value).toLocaleDateString() : "-"
  },
  { key: "pieceType", label: "Type" },
  { 
    key: "totalHT", 
    label: "Total HT",
    render: (value: number | undefined) => value ? `${value.toFixed(2)} DH` : "0.00 DH"
  },
  { 
    key: "totalTVA", 
    label: "TVA",
    render: (value: number | undefined) => value ? `${value.toFixed(2)} DH` : "0.00 DH"
  },
  { 
    key: "totalTTC", 
    label: "Total TTC",
    render: (value: number | undefined) => value ? `${value.toFixed(2)} DH` : "0.00 DH"
  }
];

export function BonCommandesTable() {
  const { bonCommandes, addBonCommande, updateBonCommande, deleteBonCommande, selectedBonCommande, setSelectedBonCommande } = useBonCommandeStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalMode, setModalMode] = React.useState<"create" | "edit" | "delete">("create");
  const [formData, setFormData] = React.useState<Partial<BonCommandeType>>({});

  const handleAdd = () => {
    setModalMode("create");
    setFormData({
      date: new Date(),
      totalHT: 0,
      totalTVA: 0,
      totalTTC: 0
    });
    setIsModalOpen(true);
  };

  const handleEdit = (bonCommande: BonCommandeType) => {
    setModalMode("edit");
    setFormData(bonCommande);
    setSelectedBonCommande(bonCommande);
    setIsModalOpen(true);
  };

  const handleDelete = (bonCommande: BonCommandeType) => {
    setModalMode("delete");
    setSelectedBonCommande(bonCommande);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (modalMode === "delete" && selectedBonCommande?.id) {
      deleteBonCommande(selectedBonCommande.id);
    } else if (modalMode === "edit" && selectedBonCommande?.id) {
      updateBonCommande(selectedBonCommande.id, {
        ...formData,
        date: formData.date || new Date(),
        totalHT: formData.totalHT || 0,
        totalTVA: formData.totalTVA || 0,
        totalTTC: formData.totalTTC || 0
      } as BonCommandeType);
    } else if (modalMode === "create") {
      addBonCommande({
        ...formData,
        date: formData.date || new Date(),
        totalHT: formData.totalHT || 0,
        totalTVA: formData.totalTVA || 0,
        totalTTC: formData.totalTTC || 0
      } as BonCommandeType);
    }
    setIsModalOpen(false);
    setSelectedBonCommande(null);
    setFormData({});
  };

  return (
    <>
      <GenericTable<BonCommandeType>
        data={bonCommandes}
        columns={bonCommandeColumns}
        title="Gestion des Bons de Commande"
        description="Liste des bons de commande"
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        filterKey="pieceNumber"
        filterPlaceholder="Rechercher par numéro..."
        exportFileName="bons-commande"
      />

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title={
          modalMode === "create" ? "Ajouter un bon de commande" :
          modalMode === "edit" ? "Modifier un bon de commande" :
          "Supprimer un bon de commande"
        }
        mode={modalMode}
      >
        {modalMode === "delete" ? (
          <p>Êtes-vous sûr de vouloir supprimer ce bon de commande ?</p>
        ) : (
          <BonCommandeForm
            formData={formData}
            onChange={setFormData}
          />
        )}
      </CrudModal>
    </>
  );
}