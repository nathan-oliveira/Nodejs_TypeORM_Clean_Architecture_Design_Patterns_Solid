import { getRepository, Repository } from 'typeorm'

import { CategoryDAO } from '@/infra/data-sources'
import { TCategoryModel } from '@/data/models'
import { ICategoryRepository, TCategoryRequest } from '@/data/contracts'

import { validateError } from '@/presentation/helpers'
import { CategoryNotFoundError } from '@/domain/errors'

export class CategoryRepository implements ICategoryRepository {
  constructor(
    private readonly manager: Repository<CategoryDAO> = getRepository(CategoryDAO)
  ) { }

  async getAll(): Promise<TCategoryModel[]> {
    return this.manager.find()
  }

  async getById(id: number): Promise<TCategoryModel[]> {
    return this.manager.find({ where: { id } })
  }

  async toCreate(dataForm: TCategoryRequest): Promise<TCategoryModel> {
    const category = this.manager.create(dataForm)
    await validateError(category)
    return this.manager.save(category)
  }

  async toUpdate(id: number, dataForm: TCategoryRequest): Promise<TCategoryModel> {
    const category = await this.manager.preload({
      ...dataForm,
      id: +id
    }) as TCategoryModel

    if (!category) await validateError(new CategoryNotFoundError())
    return this.manager.save(category)
  }

  async toDelete(id: number, category: TCategoryRequest): Promise<TCategoryModel> {
    const dataModel = {
      ...category,
      id: +id
    } as TCategoryModel
    return this.manager.remove(dataModel)
  }
}
