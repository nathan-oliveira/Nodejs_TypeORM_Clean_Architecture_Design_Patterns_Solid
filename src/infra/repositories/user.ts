import { getRepository } from 'typeorm'

import { UserDAO } from '@/infra/data-sources'
import { TUserCreate } from '@/domain/entities'
import {
  TUser,
  IUserRepository,
  TUserSearch,
  TUserProfile
} from '@/data/contracts'
export class UserRepository implements IUserRepository {
  async toCreate (dataForm: TUser): Promise<TUserCreate> {
    return getRepository(UserDAO).save(dataForm)
  }

  async searchEmail (email: string): Promise<TUserSearch[]> {
    return getRepository(UserDAO).find({ where: { email } })
  }

  async getById (id: number): Promise<TUserProfile[]> {
    return getRepository(UserDAO).find({ where: { id } })
  }
}
