import { IUserService } from '@/domain/usecases'
import { UserDAO } from '@/infra/data-sources'
import { TBCrypt } from '@/presentation/contracts'
import { TUserCreate, TUserLogin, TUserProfile } from '@/domain/entities'
import { TUser, TUserRequest, IUserRepository } from '@/data/contracts'
import { validateError, createToken } from '@/presentation/helpers'
import {
  UserExistingEmailError,
  UserEmptyEmailError,
  UserEmptyPasswordError,
  UserInvalidError,
  UserNotFoundError,
  UserNotUpdatedError,
  UserEmptyNameError,
  UserEmptyConfirmPasswordError
} from '@/domain/errors'

export class UserService implements IUserService {
  constructor (
    private readonly userRepository: IUserRepository,
    private readonly bCrypt: TBCrypt
  ) {}

  async existEmail (email: string): Promise<void> {
    if (!email) await validateError(new UserEmptyEmailError())
    const result = await this.userRepository.searchEmail(email)
    if (result.length > 0) await validateError(new UserExistingEmailError())
  }

  async validateSignUp (dataForm: TUser): Promise<void> {
    await this.existEmail(dataForm.email)
    const result = UserDAO.create(dataForm)
    await validateError(result)
  }

  async signUp (dataForm: TUser): Promise<TUserCreate> {
    await this.validateSignUp(dataForm)
    dataForm.password = await this.bCrypt.createPasswordHash(dataForm.password, dataForm.password_confirmation)
    delete dataForm.password_confirmation

    return this.userRepository.toCreate(dataForm)
  }

  async validateLogin (dataForm: TUserRequest): Promise<void> {
    if (!dataForm.email) await validateError(new UserEmptyEmailError())
    if (!dataForm.password) await validateError(new UserEmptyPasswordError())
  }

  async login (dataForm: TUserRequest): Promise<TUserLogin> {
    await this.validateLogin(dataForm)

    const result = await this.userRepository.searchEmail(dataForm.email)
    if (!result.length) await validateError(new UserInvalidError())
    const verifyUser = this.bCrypt.verifyPasswordHash(dataForm.password, result[0])
    if (!verifyUser) await validateError(new UserInvalidError())
    return createToken(result[0])
  }

  async getProfile (id: number): Promise<TUserProfile[]> {
    const result = await this.userRepository.getById(id)
    if (!result.length) await validateError(new UserNotFoundError())
    return result
  }

  async validateProfile (dataForm: TUser): Promise<void> {
    if (!dataForm.name) await validateError(new UserEmptyNameError())
    if (!dataForm.email) await validateError(new UserEmptyEmailError())
    if (!dataForm.password) await validateError(new UserEmptyPasswordError())
    if (!dataForm.password_confirmation) await validateError(new UserEmptyConfirmPasswordError())
  }

  async updateProfile (id: number, dataForm: TUser): Promise<TUserProfile[]> {
    const [profile] = await this.getProfile(id)

    if (dataForm.password) {
      dataForm.password = await this.bCrypt.createPasswordHash(dataForm.password, dataForm.password_confirmation)
      delete dataForm.password_confirmation
    }
    // if (result.affected !== 1) await validateError(new UserNotUpdatedError())
    return this.userRepository.toUpdate(id, dataForm, profile)
  }
}
