export enum CorrectionType {
  Verre = 'Verre',
  Lentille = 'Lentille',
}

export enum ModeType {
  Especes = 'Especes',
  Credit = 'Credit',
}

export type BonLivraisonType = {
  id?: number
  date: Date
  idClient: string
  clientName: string
  correction: CorrectionType
  mode: ModeType
  totalHT: number
  totalTVA: number
  totalTTC: number
}