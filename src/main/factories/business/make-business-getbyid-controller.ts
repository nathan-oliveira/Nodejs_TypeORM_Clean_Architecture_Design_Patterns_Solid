import { Controller } from '@/presentation/contracts'
import { BusinessRepository } from '@/infra/repositories'
import { BusinessService } from '@/data/services'
import { BusinessGetByIdController } from '@/presentation/controllers'

export const makeBusinessGetByIdController = (): Controller => {
  const repo = new BusinessRepository()
  const service = new BusinessService(repo)
  return new BusinessGetByIdController(service)
}
