import { getRepository } from 'typeorm'

import { UserDAO } from '@/infra/data-sources'
import { TUser, IUserRepository } from '@/data/contracts'

export class UserRepository implements IUserRepository {
  async toCreate (dataForm: TUser): Promise<UserDAO> {
    return getRepository(UserDAO).save(dataForm)
  }

  async searchEmail (email: string): Promise<UserDAO[]> {
    return getRepository(UserDAO).find({ where: { email } })
  }
}
