export enum NatureArticleType {
  Monture = 'Monture',
  Verre = 'Verre',
  Lentille = 'Lentille',
  ProductionEntretien = 'Production Entretien',
  Autre = 'Autre',
}

export enum EtatStock {
  Disponible = 'Disponible',
  NonDisponible = 'Non Disponible',
  Commandez = 'Commandez-le',
}

export type ArticleType = {
  id?: number
  refArticle: string
  type: string
  natureArticle: NatureArticleType
  designation: string
  tva: number
  stockMin: string
  entree: number
  sortie: number
  achat: number
  vente: number
  stockFinal: number
  totalStock: number
  etatStock: string
}