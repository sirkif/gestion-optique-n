export enum PieceType {
  Facture = 'Facture',
  BonLivraison = 'Bon Livraison',
}

export type BonCommandeDetailsType = {
  id?: number
  bonCommandeId?: number
  articleId?: number
  refArticle: string
  designation: string
  quantity: number
  pumAchat: number
  tauxTVA: number
  montantHT: number
  montantTVA: number
  montantTTC: number
}

export type BonCommandeType = {
  id?: number
  date: Date
  fournisseurId: number
  pieceNumber: string
  pieceType: PieceType
  totalHT: number
  totalTVA: number
  totalTTC: number
  bcDetails: BonCommandeDetailsType[]
}