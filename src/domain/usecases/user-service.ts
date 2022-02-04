import { TUserCreate, TUserLogin, TUserProfile } from '@/domain/entities'
import { TUser, TUserRequest } from '@/data/contracts'

export interface IUserService {
  validateSignUp: (dataForm: TUser) => Promise<void>
  signUp: (dataForm: TUser) => Promise<TUserCreate>
  existEmail: (email: string) => Promise<void>
  login: (dataForm: TUserRequest) => Promise<TUserLogin>
  getProfile: (id: number) => Promise<TUserProfile[]>
  validateLogin: (dataForm: TUserRequest) => Promise<void>
  updateProfile: (id: number, dataForm: any) => Promise<TUserProfile>
}
