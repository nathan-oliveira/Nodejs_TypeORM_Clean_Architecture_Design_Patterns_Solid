import { IUserService } from '@/domain/usecases'
import { UserDAO } from '@/infra/data-sources'
import { TUserCreate, TUserLogin } from '@/domain/entities'
import { TUser, TUserRequest, IUserRepository } from '@/data/contracts'
import { validateError, BCrypt, createToken } from '@/presentation/helpers'
import { UserExistingEmailError, UserEmptyEmailError, UserEmptyPasswordError, UserInvalidError } from '@/domain/errors'

export class UserService implements IUserService {
  constructor (private readonly userRepository: IUserRepository) {}

  async searchEmail (email: string): Promise<void> {
    if (!email) await validateError(new UserEmptyEmailError())
    const result = await this.userRepository.searchEmail(email)
    if (result.length > 0) await validateError(new UserExistingEmailError())
  }

  async validateSignUp (dataForm: TUser): Promise<void> {
    await this.searchEmail(dataForm.email)
    const user = UserDAO.create(dataForm)
    await validateError(user)
  }

  async signUp (dataForm: TUser): Promise<TUserCreate> {
    await this.validateSignUp(dataForm)
    dataForm.password = await BCrypt.createPasswordHash(dataForm.password, dataForm.password_confirmation)
    delete dataForm.password_confirmation

    return this.userRepository.toCreate(dataForm)
  }

  async validateLogin (dataForm: TUserRequest): Promise<void> {
    if (!dataForm.email) await validateError(new UserEmptyEmailError())
    if (!dataForm.password) await validateError(new UserEmptyPasswordError())
  }

  async login (dataForm: TUserRequest): Promise<TUserLogin> {
    await this.validateLogin(dataForm)
    const user: any = await this.userRepository.searchEmail(dataForm.email)
    if (!user.length) await validateError(new UserInvalidError())

    const compareUser = await BCrypt.comparePasswordHash(dataForm.password, user[0])
    if (!compareUser) await validateError(new UserInvalidError())
    return createToken(user[0])
  }
}
