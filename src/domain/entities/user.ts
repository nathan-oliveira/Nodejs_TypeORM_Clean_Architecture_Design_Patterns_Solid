import { TCreateToken } from '@/presentation/contracts'

export type TUserLogin = TCreateToken

export type TUserCreate = {
  name: string
  email: string
  active: boolean
  level: number
  photo: string
}
