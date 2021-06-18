import { Controller } from '@/presentation/contracts'
import { LoginController } from '@/presentation/controllers'
import { UserRepository } from '@/infra/repositories'
import { UserService } from '@/data/services'

export const makeLoginController = (): Controller => {
  const repo = new UserRepository()
  const service = new UserService(repo)
  return new LoginController(service)
}
