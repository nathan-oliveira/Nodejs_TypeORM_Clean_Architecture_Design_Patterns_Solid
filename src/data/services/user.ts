import { IUserService } from '@/domain/usecases'
import { UserDAO } from '@/infra/data-sources'
import { TUserCreate } from '@/domain/entities'
import { TUser, IUserRepository } from '@/data/contracts'
import { validateError, createError, BCrypt } from '@/presentation/helpers'
import { UserExistingEmailError, UserEmptyEmailError } from '@/domain/errors'

export class UserService implements IUserService {
  constructor (private readonly userRepository: IUserRepository) {}

  async validateCreateUser (dataForm: TUser): Promise<void> {
    const result = await this.userRepository.searchEmail(dataForm.email)
    if (result.length > 0) await createError(new UserExistingEmailError())
    const user = UserDAO.create(dataForm)
    await validateError(user)
  }

  async signUp (dataForm: TUser): Promise<TUserCreate> {
    await this.validateCreateUser(dataForm)
    dataForm.password = await BCrypt.createPasswordHash(dataForm.password, dataForm.password_confirmation)
    delete dataForm.password_confirmation

    return this.userRepository.toCreate(dataForm)
  }

  async getUserByEmail (email: string): Promise<any> {
    if (!email) await createError(new UserEmptyEmailError())
  }
}
