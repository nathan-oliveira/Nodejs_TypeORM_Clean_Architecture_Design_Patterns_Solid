import { Controller } from '@/presentation/contracts'
import { CategoryRepository } from '@/infra/repositories'
import { CategoryService } from '@/data/services'
import { CategoryGetByIdController } from '@/presentation/controllers'

export const makeCategoryGetByIdController = (): Controller => {
  const repo = new CategoryRepository()
  const service = new CategoryService(repo)
  return new CategoryGetByIdController(service)
}
