import { TUserCreate, TUserProfile } from '@/domain/entities'

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

export type TUserPhoto = {
  photo: string
};

export interface IUserRepository {
  toCreate: (dataForm: TUser) => Promise<TUserCreate>
  searchEmail: (email: string) => Promise<TUserProfile[]>
  getById: (id: number) => Promise<TUserProfile[]>
  toUpdate: (dataForm: TUser, profile: any) => Promise<TUserProfile>
  toUpdatePhoto: (dataForm: TUserPhoto, profile: any) => Promise<TUserProfile>
}
