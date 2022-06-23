import { Controller } from '@/presentation/contracts'
import { CategoryRepository } from '@/infra/repositories'
// import { CategoryService } from '@/data/services'

export const makeCategoryGetController = (): Controller => {
  const repo = new CategoryRepository()
  // const service = new CategoryService()

}