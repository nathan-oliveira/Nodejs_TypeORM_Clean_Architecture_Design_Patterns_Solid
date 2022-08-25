import { UserService } from '@/data/services'
import { UserRepository } from '@/infra/repositories'
import { Controller } from '@/presentation/contracts'
import { ProfilePatchController } from '@/presentation/controllers/profile/profile-patch-controller'
import { BCrypt } from '@/presentation/helpers'

export const makeProfilePatchController = (): Controller => {
  const bcrypt = new BCrypt()
  const repo = new UserRepository()
  const service = new UserService(repo, bcrypt)
  return new ProfilePatchController(service)
}
