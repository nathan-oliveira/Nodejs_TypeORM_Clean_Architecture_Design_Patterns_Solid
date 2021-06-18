import { TUserCreate } from '@/domain/entities'
import { TUser } from '@/data/contracts'

export interface IUserService {
  validateSignUp: (dataForm: TUser) => Promise<void>
  signUp: (dataForm: TUser) => Promise<TUserCreate>
  searchEmail: (email: string) => Promise<any>
  login: (dataForm: any) => Promise<any>
}
