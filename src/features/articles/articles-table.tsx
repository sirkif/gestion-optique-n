import React from "react";
import { GenericTable } from "../../components/generic-table";
import { useArticleStore } from "../../store/use-article-store";
import { ArticleType } from "../../types";
import { CrudModal } from "../../components/crud/crud-modal";
import { ArticleForm } from "./article-form";

const articleColumns = [
  { key: "refArticle", label: "Référence" },
  { key: "designation", label: "Désignation" },
  { key: "natureArticle", label: "Nature" },
  { key: "type", label: "Type" },
  { 
    key: "stockFinal", 
    label: "Stock",
    render: (value: number | undefined) => value?.toString() || "0"
  },
  { key: "etatStock", label: "État" },
  { 
    key: "vente", 
    label: "Prix Vente",
    render: (value: number | undefined) => value ? `${value.toFixed(2)} DH` : "0.00 DH"
  },
];

export function ArticlesTable() {
  const { articles, addArticle, updateArticle, deleteArticle } = useArticleStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalMode, setModalMode] = React.useState<"create" | "edit" | "delete">("create");
  const [selectedArticle, setSelectedArticle] = React.useState<ArticleType | null>(null);
  const [formData, setFormData] = React.useState<Partial<ArticleType>>({});

  const handleAdd = () => {
    setModalMode("create");
    setFormData({
      stockFinal: 0,
      entree: 0,
      sortie: 0,
      totalStock: 0,
      vente: 0
    });
    setIsModalOpen(true);
  };

  const handleEdit = (article: ArticleType) => {
    setModalMode("edit");
    setSelectedArticle(article);
    setFormData({
      ...article,
      stockFinal: article.stockFinal || 0,
      entree: article.entree || 0,
      sortie: article.sortie || 0,
      totalStock: article.totalStock || 0,
      vente: article.vente || 0
    });
    setIsModalOpen(true);
  };

  const handleDelete = (article: ArticleType) => {
    setModalMode("delete");
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (modalMode === "delete" && selectedArticle?.id) {
      deleteArticle(selectedArticle.id);
    } else if (modalMode === "edit" && selectedArticle?.id) {
      updateArticle(selectedArticle.id, {
        ...formData,
        stockFinal: formData.entree || 0 - (formData.sortie || 0),
        totalStock: formData.stockFinal || 0,
        vente: formData.vente || 0
      } as ArticleType);
    } else if (modalMode === "create") {
      addArticle({
        ...formData,
        stockFinal: formData.entree || 0 - (formData.sortie || 0),
        totalStock: formData.stockFinal || 0,
        vente: formData.vente || 0
      } as ArticleType);
    }
    setIsModalOpen(false);
    setSelectedArticle(null);
    setFormData({});
  };

  return (
    <>
      <GenericTable<ArticleType>
        data={articles}
        columns={articleColumns}
        title="Gestion des Articles"
        description="Liste des articles en stock"
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        filterKey="designation"
        filterPlaceholder="Rechercher par désignation..."
        exportFileName="articles"
      />

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title={
          modalMode === "create" ? "Ajouter un article" :
          modalMode === "edit" ? "Modifier un article" :
          "Supprimer un article"
        }
        mode={modalMode}
      >
        {modalMode === "delete" ? (
          <p>Êtes-vous sûr de vouloir supprimer cet article ?</p>
        ) : (
          <ArticleForm
            formData={formData}
            onChange={setFormData}
          />
        )}
      </CrudModal>
    </>
  );
}