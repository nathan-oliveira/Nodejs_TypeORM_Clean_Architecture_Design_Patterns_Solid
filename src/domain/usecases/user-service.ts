import { TUserCreate } from '@/domain/entities'
import { TUser } from '@/data/contracts'

export interface IUserService {
  signUp: (dataForm: TUser) => Promise<TUserCreate>
  validateCreateUser: (dataForm: TUser) => Promise<void>
}
