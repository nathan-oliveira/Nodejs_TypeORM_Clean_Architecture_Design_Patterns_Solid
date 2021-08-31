import { Controller } from '@/presentation/contracts'
import { ProfilePutController } from '@/presentation/controllers'
import { UserRepository } from '@/infra/repositories'
import { UserService } from '@/data/services'
import { BCrypt } from '@/presentation/helpers'

export const makeProfilePutController = (): Controller => {
  const bcrypt = new BCrypt()
  const repo = new UserRepository()
  const service = new UserService(repo, bcrypt)
  return new ProfilePutController(service)
}
