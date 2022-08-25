import { TUserProfile } from '@/domain/entities'
import { TUserModel } from '@/data/models'

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

export type TUserProfileDAO = {
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

export type TUserPhoto = {
  photo: string
}

export interface IUserRepository {
  toCreate: (dataForm: TUser) => Promise<TUserModel>
  searchEmail: (email: string) => Promise<TUserModel[]>
  getById: (id: number) => Promise<TUserModel[]>
  toUpdate: (dataForm: TUser, profile: TUserProfile) => Promise<TUserModel>
  toUpdatePhoto: (dataForm: TUserPhoto, profile: TUserProfile) => Promise<TUserModel>
}
