import { getRepository, Repository } from 'typeorm'

import { UserDAO } from '@/infra/data-sources'
import { TUserCreate } from '@/domain/entities'
import {
  TUser,
  IUserRepository,
  TUserSearch,
  TUserProfile,
  TUserPhoto
} from '@/data/contracts'

export class UserRepository implements IUserRepository {
  constructor(
    private readonly manager: Repository<UserDAO> = getRepository(UserDAO)
  ) { }

  toCreate(dataForm: TUser): Promise<TUserCreate> {
    const user = this.manager.create(dataForm)
    return this.manager.save(user)
  }

  searchEmail(email: string): Promise<TUserSearch[]> {
    return this.manager.find({ where: { email } })
  }

  getById(id: number): Promise<TUserProfile[]> {
    return this.manager.find({ where: { id } })
  }

  toUpdate(dataForm: TUser, profile: UserDAO): Promise<TUserProfile> {
    this.manager.merge(profile, dataForm)
    return this.manager.save(profile)
  }

  toUpdatePhoto({ photo }: TUserPhoto, profile: UserDAO): Promise<TUserProfile> {
    this.manager.merge(profile, { photo })
    return this.manager.save(profile)
  }
}
