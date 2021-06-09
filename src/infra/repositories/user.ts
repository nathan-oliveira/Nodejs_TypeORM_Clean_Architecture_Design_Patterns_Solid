import { EntityRepository, Repository } from 'typeorm'

import { UserDAO } from '@/infra/data-sources'
import { TUser, IUserRepository } from '@/data/contracts'

@EntityRepository(UserDAO)
export class UserRepository extends Repository<UserDAO> implements IUserRepository {
  async toCreate (dataForm: TUser): Promise<UserDAO> {
    const isThereEmail = await this.searchEmail(dataForm.email)
    if (isThereEmail.length > 0) throw new Error('E-mail informado já está cadastrado!')

    return await this.manager.save(UserDAO, dataForm)
  }

  async searchEmail (email: string): Promise<UserDAO[]> {
    return await this.manager.find(UserDAO, { where: { email } })
  }
}
