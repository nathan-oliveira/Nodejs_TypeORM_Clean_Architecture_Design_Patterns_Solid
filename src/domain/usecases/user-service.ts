import { TUserCreate } from '@/domain/entities'
import { TUser } from '@/data/contracts'

export interface IUserService {
  create: (dataForm: TUser) => Promise<TUserCreate>
}
