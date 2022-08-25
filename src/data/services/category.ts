import { TCategory } from '@/domain/entities'
import { ICategoryService } from '@/domain/usecases'
import { ICategoryRepository } from '@/data/contracts'
import { validateError } from '@/presentation/helpers'
import { CategoryNotFoundError } from '@/domain/errors/category'

export class CategoryService implements ICategoryService {
  constructor(
    private readonly categoryRepository: ICategoryRepository
  ) { }

  async getAll(): Promise<TCategory[]> {
    return this.categoryRepository.getAll()
  }

  async getById(id: number): Promise<TCategory> {
    const [result] = await this.categoryRepository.getById(id)
    if (!result) await validateError(new CategoryNotFoundError())
    return result
  }

  async create(dataForm: any): Promise<any> {
    return this.categoryRepository.toCreate(dataForm)
  }
}
