import { Controller } from '@/presentation/contracts'
import { BusinessRepository } from '@/infra/repositories'
import { BusinessService } from '@/data/services'
import { BusinessDeleteController } from '@/presentation/controllers'

export const makeBusinessDeleteController = (): Controller => {
  const repo = new BusinessRepository()
  const service = new BusinessService(repo)
  return new BusinessDeleteController(service)
}
