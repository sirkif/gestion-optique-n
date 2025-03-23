export enum SpecialityType {
  Opthalmologue = 'Opthalmologue',
}

export type PrescripteurType = {
  id?: number
  prescripteurName: string
  speciality: SpecialityType
  address: string
  ville: string
  phone: string
  email: string
}