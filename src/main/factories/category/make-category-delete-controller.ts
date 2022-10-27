import { Controller } from '@/presentation/contracts'
import { CategoryRepository } from '@/infra/repositories'
import { CategoryService } from '@/data/services'
import { CategoryDeleteController } from '@/presentation/controllers'

export const makeCategoryDeleteController = (): Controller => {
  const repo = new CategoryRepository()
  const service = new CategoryService(repo)
  return new CategoryDeleteController(service)
}
