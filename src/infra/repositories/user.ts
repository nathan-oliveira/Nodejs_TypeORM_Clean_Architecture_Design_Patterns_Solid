import { getRepository, Repository } from 'typeorm'

import { UserDAO } from '@/infra/data-sources'
import { TUserCreate, TUserProfile } from '@/domain/entities'
import { TUser, TUserPhoto, IUserRepository } from '@/data/contracts'
import { validateError } from '@/presentation/helpers'

export class UserRepository implements IUserRepository {
  constructor(
    private readonly manager: Repository<UserDAO> = getRepository(UserDAO)
  ) { }

  async toCreate(dataForm: TUser): Promise<TUserCreate> {
    const user = this.manager.create(dataForm)
    await validateError(user)
    return this.manager.save(user)
  }

  async searchEmail(email: string): Promise<TUserProfile[]> {
    return this.manager.find({ where: { email } })
  }

  async getById(id: number): Promise<TUserProfile[]> {
    return this.manager.find({ where: { id } })
  }

  async toUpdate(dataForm: TUser, profile: TUserProfile): Promise<TUserProfile> {
    this.manager.merge(profile as UserDAO, dataForm)
    return this.manager.save(profile)
  }

  async toUpdatePhoto({ photo }: TUserPhoto, profile: TUserProfile): Promise<TUserProfile> {
    this.manager.merge(profile as UserDAO, { photo })
    return this.manager.save(profile)
  }
}
