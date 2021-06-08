import { EntityRepository, Repository } from 'typeorm'

import { UserDAO } from '@/infra/data-sources'
import { TUser, IUserRepository } from '@/data/contracts'

@EntityRepository(UserDAO)
class UserRepository extends Repository<UserDAO> implements IUserRepository {
  toCreate = (dataForm: TUser): object => this.manager.save(UserDAO, dataForm)
}

export default UserRepository
