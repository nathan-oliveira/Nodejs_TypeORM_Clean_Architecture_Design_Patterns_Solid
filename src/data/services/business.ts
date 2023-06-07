import { IBusinessService } from '@/domain/usecases'
import { IBusinessRepository, TBusinessRequest } from '@/data/contracts'
import { validateError } from '@/presentation/helpers'
import { BusinessNotFoundError } from '@/domain/errors'

import { TBusiness, TBusinessCreate, TBusinessUpdate, TBusinessDelete } from '@/domain/entities'

export class BusinessService implements IBusinessService {
  constructor (
    private readonly businessRepository: IBusinessRepository
  ) { }

  async getAll (userId: number): Promise<TBusiness[]> {
    return this.businessRepository.getAll(userId)
  }

  async getById (userId: number, id: number): Promise<TBusiness> {
    const [business] = await this.businessRepository.getById(userId, id)
    if (!business) await validateError(new BusinessNotFoundError())
    return business
  }

  async create (userId: number, dataForm: TBusinessRequest): Promise<TBusinessCreate> {
    return this.businessRepository.toCreate(userId, dataForm)
  }

  async update (userId: number, id: number, dataForm: TBusinessRequest): Promise<TBusinessUpdate> {
    return this.businessRepository.toUpdate(userId, id, dataForm)
  }

  async delete (userId: number, id: number): Promise<TBusinessDelete> {
    const business = await this.getById(userId, id)
    return this.businessRepository.toDelete(userId, id, business)
  }
}
