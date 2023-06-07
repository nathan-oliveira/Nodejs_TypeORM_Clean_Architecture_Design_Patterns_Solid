import { getRepository, Repository } from 'typeorm'

import { BusinessDAO } from '@/infra/data-sources'
import { TBusinessModel } from '@/data/models'
import { IBusinessRepository, TBusinessRequest } from '@/data/contracts'

import { validateError } from '@/presentation/helpers'
import { BusinessNotFoundError } from '@/domain/errors'

export class BusinessRepository implements IBusinessRepository {
  constructor (
    private readonly manager: Repository<BusinessDAO> = getRepository(BusinessDAO)
  ) { }

  async getAll (userId: number): Promise<TBusinessModel[]> {
    return this.manager.find({ where: { userId } })
  }

  async getById (userId: number, id: number): Promise<TBusinessModel[]> {
    return this.manager.find({ where: { id, userId } })
  }

  async toCreate (userId: number, dataForm: TBusinessRequest): Promise<TBusinessModel> {
    const data = {
      ...dataForm,
      userId
    } as TBusinessModel

    const business = this.manager.create(data)

    await validateError(business)

    return this.manager.save(business)
  }

  async toUpdate (userId: number, id: number, dataForm: TBusinessRequest): Promise<TBusinessModel> {
    const data = {
      ...dataForm,
      userId,
      id
    } as TBusinessModel

    const business = await this.manager.preload(data) as TBusinessModel

    if (business) await validateError(new BusinessNotFoundError())
    return this.manager.save(business)
  }

  async toDelete (userId: number, id: number, dataForm: TBusinessRequest): Promise<TBusinessModel> {
    const data = {
      ...dataForm,
      userId,
      id
    } as TBusinessModel

    return this.manager.remove(data)
  }
}
