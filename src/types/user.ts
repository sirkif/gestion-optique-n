export enum Role {
  Admin = 'Admin',
  Manager = 'Manager',
  Caisier = 'Caisier',
  Controleur = 'Controleur',
  Invite = 'Invite',
}

export type UserType = {
  id?: number
  password: string
  name: string
  phone: string
  email: string
  image: string
  role: Role
}