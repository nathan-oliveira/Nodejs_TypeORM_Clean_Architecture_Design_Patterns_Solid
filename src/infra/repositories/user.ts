import { getRepository, Repository } from 'typeorm'

import { UserDAO } from '@/infra/data-sources'
import { TUserProfile } from '@/domain/entities'
import { TUserModel } from '@/data/models'
import { TUser, TUserPhoto, IUserRepository } from '@/data/contracts'
import { validateError } from '@/presentation/helpers'

export class UserRepository implements IUserRepository {
  constructor (
    private readonly manager: Repository<UserDAO> = getRepository(UserDAO)
  ) { }

  async toCreate (dataForm: TUser): Promise<TUserModel> {
    const user = this.manager.create(dataForm)
    await validateError(user)
    return this.manager.save(user)
  }

  async searchEmail (email: string): Promise<TUserModel[]> {
    return this.manager.find({ where: { email } })
  }

  async getById (id: number): Promise<TUserModel[]> {
    return this.manager.find({ where: { id } })
  }

  async toUpdate (dataForm: TUser, profile: TUserProfile): Promise<TUserModel> {
    this.manager.merge(profile as TUserModel, dataForm)
    return this.manager.save(profile)
  }

  async toUpdatePhoto ({ photo }: TUserPhoto, profile: TUserProfile): Promise<TUserModel> {
    this.manager.merge(profile as TUserModel, { photo })
    return this.manager.save(profile)
  }
}
