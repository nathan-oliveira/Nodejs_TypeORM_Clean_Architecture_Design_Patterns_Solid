import { getRepository, Repository } from 'typeorm'

import { UserDAO } from '@/infra/data-sources'
import { TUserCreate, TUserProfile } from '@/domain/entities'
import { TUser, TUserPhoto, IUserRepository } from '@/data/contracts'

export class UserRepository implements IUserRepository {
  constructor (
    private readonly manager: Repository<UserDAO> = getRepository(UserDAO)
  ) { }

  async toCreate (dataForm: TUser): Promise<TUserCreate> {
    const user = this.manager.create(dataForm)
    return this.manager.save(user)
  }

  async searchEmail (email: string): Promise<TUserProfile[]> {
    return this.manager.find({ where: { email } })
  }

  async getById (id: number): Promise<TUserProfile[]> {
    return this.manager.find({ where: { id } })
  }

  async toUpdate (dataForm: TUser, profile: UserDAO): Promise<TUserProfile> {
    this.manager.merge(profile, dataForm)
    return this.manager.save(profile)
  }

  async toUpdatePhoto ({ photo }: TUserPhoto, profile: UserDAO): Promise<TUserProfile> {
    this.manager.merge(profile, { photo })
    return this.manager.save(profile)
  }
}
