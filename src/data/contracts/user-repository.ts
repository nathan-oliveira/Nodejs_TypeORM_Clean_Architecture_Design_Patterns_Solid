import { TUserCreate } from '@/domain/entities'

export type TUserRequest = {
  email: string
  password: string
}

export type TUser = {
  name: string
  email: string
  password: string
  password_confirmation?: string
  photo: string
  active?: boolean
  level?: number
}

export type TUserSearch = {
  id: number
  name: string
  email: string
  password: string
  active: boolean
  photo: string
  level: number
  created_at: Date
  updated_at: Date
}

export type TUserProfile = TUserSearch

export interface IUserRepository {
  toCreate: (dataForm: TUser) => Promise<TUserCreate>
  searchEmail: (email: string) => Promise<TUserSearch[]>
  getById: (id: number) => Promise<TUserProfile[]>
  toUpdate: (id: number, dataForm: any) => Promise<any>
}
