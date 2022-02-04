import { getRepository, Repository } from 'typeorm'

import { UserDAO } from '@/infra/data-sources'
import { TUserCreate } from '@/domain/entities'
import {
  TUser,
  IUserRepository,
  TUserSearch,
  TUserProfile
} from '@/data/contracts'

export class UserRepository implements IUserRepository {
  constructor (
    private readonly manager: Repository<UserDAO> = getRepository(UserDAO)
  ) {}

  async toCreate (dataForm: TUser): Promise<TUserCreate> {
    const user = this.manager.create(dataForm)
    return this.manager.save(user)
  }

  async searchEmail (email: string): Promise<TUserSearch[]> {
    return this.manager.find({ where: { email } })
  }

  async getById (id: number): Promise<TUserProfile[]> {
    return this.manager.find({ where: { id } })
  }

  async toUpdate (dataForm: any, profile: any): Promise<any> {
    this.manager.merge(profile, dataForm)
    return this.manager.save(profile)
  }
}
