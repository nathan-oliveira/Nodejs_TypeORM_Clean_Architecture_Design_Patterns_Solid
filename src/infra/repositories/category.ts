import { getRepository, Repository } from 'typeorm'

import { CategoryDAO } from '@/infra/data-sources'
import { TCategory, TCategoryCreate } from '@/domain/entities'
import { ICategoryRepository, TCategoryRequest } from '@/data/contracts'
import { validateError } from '@/presentation/helpers'

export class CategoryRepository implements ICategoryRepository {
  constructor(
    private readonly manager: Repository<CategoryDAO> = getRepository(CategoryDAO)
  ) { }

  async getAll(): Promise<TCategory[]> {
    return this.manager.find()
  }

  async getById(id: number): Promise<TCategory[]> {
    return this.manager.find({ where: { id } })
  }

  async toCreate(dataForm: TCategoryRequest): Promise<TCategoryCreate> {
    const category = this.manager.create(dataForm)
    await validateError(category)
    return this.manager.save(category)
  }
}
