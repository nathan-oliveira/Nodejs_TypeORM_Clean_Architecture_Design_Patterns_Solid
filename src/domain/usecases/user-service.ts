import { TUser } from '@/data/contracts'

export type TUserRequestCreate = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface IUserService {
  create: (dataForm: TUser) => Promise<any>
}
