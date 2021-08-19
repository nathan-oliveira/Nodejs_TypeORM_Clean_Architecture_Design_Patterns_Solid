import { Controller } from '@/presentation/contracts'
import { ProfileController } from '@/presentation/controllers'
import { UserRepository } from '@/infra/repositories'
import { UserService } from '@/data/services'

export const makeProfileController = (): Controller => {
  const repo = new UserRepository()
  const service = new UserService(repo)
  return new ProfileController(service)
}