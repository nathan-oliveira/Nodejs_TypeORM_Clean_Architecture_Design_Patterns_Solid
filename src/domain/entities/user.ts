import { TCreateToken } from '@/presentation/contracts'

export type TUserLogin = TCreateToken

export type TUserCreate = {
  name: string
  email: string
  active: boolean
  level: number
  photo: string
}

export type TUserProfile = {
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
