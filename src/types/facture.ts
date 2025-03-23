export enum NatureFactureType {
  Avoir = 'Avoir',
  Facture = 'Facture',
  FactureProforma = 'Facture Proforma',
}

export enum StatusFactureType {
  Paye = 'Paye',
  NonPaye = 'Non Paye',
}

export type FactureType = {
  id?: number
  factureNumber: string
  date: Date
  clientName: string
  nature: NatureFactureType
  totalHT: number
  totalTVA: number
  totalTTC: number
  montantRegle: number
  montantReste: number
  status: StatusFactureType
}