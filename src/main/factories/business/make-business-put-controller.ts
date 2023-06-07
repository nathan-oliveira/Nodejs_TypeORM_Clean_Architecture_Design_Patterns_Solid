import { Controller } from '@/presentation/contracts'
import { BusinessRepository } from '@/infra/repositories'
import { BusinessService } from '@/data/services'
import { BusinessPutController } from '@/presentation/controllers'

export const makeBusinessPutController = (): Controller => {
  const repo = new BusinessRepository()
  const service = new BusinessService(repo)
  return new BusinessPutController(service)
}
