import { Controller } from '@/presentation/contracts'
import { SignUpController } from '@/presentation/controllers'
import { UserRepository } from '@/infra/repositories'
import { UserService } from '@/data/services'

export const makeSignUpController = (): Controller => {
  const repo = new UserRepository()
  const service = new UserService(repo)
  return new SignUpController(service)
}
