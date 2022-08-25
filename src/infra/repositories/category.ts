import { getRepository, Repository } from 'typeorm'

import { CategoryDAO } from '@/infra/data-sources'
import { TCategory } from '@/domain/entities'
import { ICategoryRepository } from '@/data/contracts'

export class CategoryRepository implements ICategoryRepository {
  constructor (
    private readonly manager: Repository<CategoryDAO> = getRepository(CategoryDAO)
  ) { }

  async getAll (): Promise<TCategory[]> {
    return this.manager.find()
  }

  async getById (id: number): Promise<TCategory[]> {
    return this.manager.find({ where: { id } })
  }
}
