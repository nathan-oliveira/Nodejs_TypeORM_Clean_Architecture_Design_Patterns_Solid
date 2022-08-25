import { Controller } from '@/presentation/contracts'
import { CategoryRepository } from '@/infra/repositories'
import { CategoryService } from '@/data/services'
import { CategoryPostController } from '@/presentation/controllers'

export const makeCategoryPostController = (): Controller => {
  const repo = new CategoryRepository()
  const service = new CategoryService(repo)
  return new CategoryPostController(service);
}
