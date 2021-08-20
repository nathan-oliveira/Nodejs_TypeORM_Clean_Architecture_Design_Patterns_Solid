import { Controller } from '@/presentation/contracts'
import { ProfilePutController } from '@/presentation/controllers'
import { UserRepository } from '@/infra/repositories'
import { UserService } from '@/data/services'

export const makeProfilePutController = (): Controller => {
  const repo = new UserRepository()
  const service = new UserService(repo)
  return new ProfilePutController(service)
}
