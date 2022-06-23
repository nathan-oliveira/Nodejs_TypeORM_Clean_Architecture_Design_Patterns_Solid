import { getRepository, Repository } from 'typeorm'

import { TCategory } from '@/domain/entities'
import { CategoryDAO } from '@/infra/data-sources'

// import {
//   ICategoryRepository
// } from '@/data/contracts'

export class CategoryRepository {
  constructor(
    private readonly manager: Repository<CategoryDAO> = getRepository(CategoryDAO)
  ) { }

  getAll(): Promise<TCategory[]> {
    return this.manager.find();
  }
}