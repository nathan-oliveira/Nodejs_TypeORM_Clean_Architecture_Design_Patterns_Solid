import { Controller } from '@/presentation/contracts'
import { BusinessRepository } from '@/infra/repositories'
import { BusinessService } from '@/data/services'
import { BusinessGetAllController } from '@/presentation/controllers'

export const makeBusinessGetController = (): Controller => {
  const repo = new BusinessRepository()
  const service = new BusinessService(repo)
  return new BusinessGetAllController(service)
}
