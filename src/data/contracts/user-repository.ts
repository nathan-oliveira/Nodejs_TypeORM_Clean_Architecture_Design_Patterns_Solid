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

export interface IUserRepository {
  toCreate: (dataForm: TUser) => Promise<TUserCreate>
  searchEmail: (email: string) => Promise<object[]>
}
