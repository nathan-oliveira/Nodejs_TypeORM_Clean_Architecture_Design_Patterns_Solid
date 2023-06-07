import { Controller } from '@/presentation/contracts'
import { BusinessRepository } from '@/infra/repositories'
import { BusinessService } from '@/data/services'
import { BusinessPostController } from '@/presentation/controllers'

export const makeBusinessPostController = (): Controller => {
  const repo = new BusinessRepository()
  const service = new BusinessService(repo)
  return new BusinessPostController(service)
}
