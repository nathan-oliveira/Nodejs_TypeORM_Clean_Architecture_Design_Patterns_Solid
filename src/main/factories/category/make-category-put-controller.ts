import { Controller } from '@/presentation/contracts'
import { CategoryRepository } from '@/infra/repositories'
import { CategoryService } from '@/data/services'
import { CategoryPutController } from '@/presentation/controllers'

export const makeCategoryPutController = (): Controller => {
  const repo = new CategoryRepository()
  const service = new CategoryService(repo)
  return new CategoryPutController(service)
}
