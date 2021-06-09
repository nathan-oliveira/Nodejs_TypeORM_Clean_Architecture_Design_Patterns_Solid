import { SignUpController } from '@/presentation/controllers/user/signup/signup-controller'
import { UserRepository } from '@/infra/repositories'
import { UserService } from '@/data/services'

export const makeSignUpController = (): any => {
  const repo = new UserRepository()
  const service = new UserService(repo)
  return new SignUpController(service)
}
