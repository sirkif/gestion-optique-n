export enum CategoryType {
  Entreprise = 'Entreprise',
  Particulier = 'Particulier',
  Association = 'Association',
  OrganismePublique = 'Organisme Publique',
}

export enum AssuranceType {
  Aucune = 'Aucune',
  CNOPS = 'CNOPS',
  AMO = 'AMO',
  Axa = 'AXA',
  AmaneAssurance = 'Amane Assurance',
  AtlantaSanad = 'Atlanta Sanad',
  SaadaAssurance = 'Saada Assurance',
  FAR = 'F.A.R',
  WafaAssurance = 'Wafa Assurance',
  Saham = 'Saham',
  Sanlam = 'Sanlam',
  Autre = 'Autre',
}

export enum PeriodiciteVisiteType {
  Zero = '0 an',
  One = '1 an',
  Two = '2 ans',
}

export type PatientType = {
  id?: number
  clientName: string
  category: CategoryType
  assurance: AssuranceType
  address: string
  ville: string
  phone: string
  email: string
  periodiciteVisite: PeriodiciteVisiteType
}