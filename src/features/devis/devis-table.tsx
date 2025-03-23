import React from 'react'
import { GenericTable } from '../../components/generic-table'
import { useDevisStore } from '../../store/use-devis-store'
import { DevisType } from '../../types'
import { CrudModal } from '../../components/crud/crud-modal'
import { DevisForm } from './devis-form'
import { addToast } from '@heroui/react'

const devisColumns = [
  { key: 'devisNumber', label: 'N° Devis' },
  {
    key: 'date',
    label: 'Date',
    render: (value: Date) => new Date(value).toLocaleDateString(),
  },
  { key: 'clientName', label: 'Client' },
  {
    key: 'validUntil',
    label: "Valide jusqu'au",
    render: (value: Date) => new Date(value).toLocaleDateString(),
  },
  {
    key: 'totalHT',
    label: 'Total HT',
    render: (value: number) => `${value.toFixed(2)} DH`,
  },
  {
    key: 'totalTVA',
    label: 'TVA',
    render: (value: number) => `${value.toFixed(2)} DH`,
  },
  {
    key: 'totalTTC',
    label: 'Total TTC',
    render: (value: number) => `${value.toFixed(2)} DH`,
  },
  {
    key: 'status',
    label: 'Statut',
    render: (value: string) => (
      <div
        className={`px-2 py-1 rounded-full text-xs ${
          value === 'Accepté'
            ? 'bg-success-100 text-success-700'
            : value === 'En attente'
            ? 'bg-warning-100 text-warning-700'
            : value === 'Expiré'
            ? 'bg-danger-100 text-danger-700'
            : 'bg-default-100 text-default-700'
        }`}
      >
        {value}
      </div>
    ),
  },
]

export function DevisTable() {
  const { devis, addDevis, updateDevis, deleteDevis } = useDevisStore()
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [modalMode, setModalMode] = React.useState<
    'create' | 'edit' | 'delete'
  >('create')
  const [selectedDevis, setSelectedDevis] = React.useState<DevisType | null>(
    null
  )
  const [formData, setFormData] = React.useState<Partial<DevisType>>({})
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.devisNumber?.trim()) {
      newErrors.devisNumber = 'Le numéro de devis est requis'
    }
    if (!formData.clientName?.trim()) {
      newErrors.clientName = 'Le nom du client est requis'
    }
    if (!formData.validUntil) {
      newErrors.validUntil = 'La date de validité est requise'
    }
    if (!formData.totalHT || formData.totalHT < 0) {
      newErrors.totalHT = 'Le total HT doit être positif'
    }
    if (!formData.status) {
      newErrors.status = 'Le statut est requis'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAdd = () => {
    setModalMode('create')
    setFormData({
      date: new Date(),
      totalHT: 0,
      totalTVA: 0,
      totalTTC: 0,
      status: 'En attente',
    })
    setErrors({})
    setIsModalOpen(true)
  }

  const handleEdit = (devis: DevisType) => {
    setModalMode('edit')
    setSelectedDevis(devis)
    setFormData(devis)
    setErrors({})
    setIsModalOpen(true)
  }

  const handleDelete = (devis: DevisType) => {
    setModalMode('delete')
    setSelectedDevis(devis)
    setIsModalOpen(true)
  }

  const handleConfirm = () => {
    if (modalMode === 'delete' && selectedDevis?.id) {
      deleteDevis(selectedDevis.id)
      addToast({
        title: 'Succès',
        description: 'Devis supprimé avec succès',
        color: 'success',
      })
      setIsModalOpen(false)
      return
    }

    if (!validateForm()) {
      addToast({
        title: 'Erreur',
        description: 'Veuillez remplir tous les champs requis correctement',
        color: 'danger',
      })
      return
    }

    if (modalMode === 'edit' && selectedDevis?.id) {
      updateDevis(selectedDevis.id, {
        ...formData,
        date: formData.date || new Date(),
        totalHT: formData.totalHT || 0,
        totalTVA: formData.totalTVA || 0,
        totalTTC: formData.totalTTC || 0,
      } as DevisType)
      addToast({
        title: 'Succès',
        description: 'Devis modifié avec succès',
        color: 'success',
      })
    } else if (modalMode === 'create') {
      addDevis({
        ...formData,
        date: formData.date || new Date(),
        totalHT: formData.totalHT || 0,
        totalTVA: formData.totalTVA || 0,
        totalTTC: formData.totalTTC || 0,
        devisDetails: [],
      } as DevisType)
      addToast({
        title: 'Succès',
        description: 'Devis ajouté avec succès',
        color: 'success',
      })
    }

    setIsModalOpen(false)
    setSelectedDevis(null)
    setFormData({})
    setErrors({})
  }

  return (
    <>
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

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title={
          modalMode === 'create'
            ? 'Ajouter un devis'
            : modalMode === 'edit'
            ? 'Modifier un devis'
            : 'Supprimer un devis'
        }
        mode={modalMode}
      >
        {modalMode === 'delete' ? (
          <p>Êtes-vous sûr de vouloir supprimer ce devis ?</p>
        ) : (
          <DevisForm
            formData={formData}
            onChange={setFormData}
            errors={errors}
          />
        )}
      </CrudModal>
    </>
  )
}
