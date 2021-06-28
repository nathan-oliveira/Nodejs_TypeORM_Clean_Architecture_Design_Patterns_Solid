import { getRepository } from 'typeorm'

import { UserDAO } from '@/infra/data-sources'
import {
  TUser,
  IUserRepository,
  TUserSearch
} from '@/data/contracts'

export class UserRepository implements IUserRepository {
  async toCreate (dataForm: TUser): Promise<UserDAO> {
    return getRepository(UserDAO).save(dataForm)
  }

  async searchEmail (email: string): Promise<TUserSearch[]> {
    const teste = await getRepository(UserDAO).find({ where: { email } })
    console.log(teste)
    return getRepository(UserDAO).find({ where: { email } })
  }

  async getById (id: number): Promise<UserDAO[]> {
    return getRepository(UserDAO).find({ where: { id } })
  }
}
