import { IUserService } from '@/domain/usecases'
import { TBCrypt } from '@/presentation/contracts'
import { TUserCreate, TUserLogin, TUserProfile } from '@/domain/entities'
import { TUser, TUserRequest, IUserRepository, TUserPhoto } from '@/data/contracts'
import { validateError, createToken } from '@/presentation/helpers'
import {
  UserExistingEmailError,
  UserEmptyEmailError,
  UserEmptyPasswordError,
  UserInvalidError,
  UserNotFoundError
} from '@/domain/errors'

export class UserService implements IUserService {
  constructor (
    private readonly userRepository: IUserRepository,
    private readonly bCrypt: TBCrypt
  ) { }

  async existEmail (email: string): Promise<void> {
    if (!email) await validateError(new UserEmptyEmailError())
    const result = await this.userRepository.searchEmail(email)
    if (result.length > 0) await validateError(new UserExistingEmailError())
  }

  async signUp (dataForm: TUser): Promise<TUserCreate> {
    await this.existEmail(dataForm.email)
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

  async getProfile (id: number): Promise<TUserProfile> {
    const [result] = await this.userRepository.getById(id)
    if (!result) await validateError(new UserNotFoundError())
    return result
  }

  async updateProfile (id: number, dataForm: TUser): Promise<TUserProfile> {
    if (dataForm.password) {
      dataForm.password = await this.bCrypt.createPasswordHash(dataForm.password, dataForm.password_confirmation)
      delete dataForm.password_confirmation
    }

    const profile = await this.getProfile(id)
    return await this.userRepository.toUpdate(dataForm, profile)
  }

  async updatePhoto (id: number, dataForm: TUserPhoto): Promise<TUserProfile> {
    if (!dataForm.photo) dataForm.photo = '*'
    const profile = await this.getProfile(id)
    return await this.userRepository.toUpdatePhoto(dataForm, profile)
  }
}
