import { TUserCreate, TUserLogin, TUserProfile } from '@/domain/entities'
import { TUser } from '@/data/contracts'

export interface IUserService {
  validateSignUp: (dataForm: TUser) => Promise<void>
  signUp: (dataForm: TUser) => Promise<TUserCreate>
  existEmail: (email: string) => Promise<void>
  login: (dataForm: any) => Promise<TUserLogin>
  profile: (id: number) => Promise<TUserProfile[]>
}
