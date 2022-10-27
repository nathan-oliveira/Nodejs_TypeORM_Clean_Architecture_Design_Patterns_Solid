import { ICategoryService } from '@/domain/usecases'
import { ICategoryRepository, TCategoryRequest } from '@/data/contracts'
import { validateError } from '@/presentation/helpers'
import { CategoryNotFoundError } from '@/domain/errors/category'

import { TCategory, TCategoryCreate, TCategoryUpdate, TCategoryDelete } from '@/domain/entities'

export class CategoryService implements ICategoryService {
  constructor (
    private readonly categoryRepository: ICategoryRepository
  ) { }

  async getAll (): Promise<TCategory[]> {
    return this.categoryRepository.getAll()
  }

  async getById (id: number): Promise<TCategory> {
    const [category] = await this.categoryRepository.getById(id)
    if (!category) await validateError(new CategoryNotFoundError())
    return category
  }

  async create (dataForm: TCategoryRequest): Promise<TCategoryCreate> {
    return this.categoryRepository.toCreate(dataForm)
  }

  async update (id: number, dataForm: TCategoryRequest): Promise<TCategoryUpdate> {
    return this.categoryRepository.toUpdate(id, dataForm)
  }

  async delete (id: number): Promise<TCategoryDelete> {
    const category = await this.getById(id)
    return this.categoryRepository.toDelete(id, category)
  }
}
