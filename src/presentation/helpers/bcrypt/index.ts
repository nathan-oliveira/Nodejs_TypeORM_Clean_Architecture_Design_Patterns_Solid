import * as bcrypt from 'bcrypt'

import { createToken } from '@/presentation/helpers/jwt'
import { validateError } from '@/presentation/helpers'
import { TCreateToken, TBCrypt } from '@/presentation/contracts'
import {
  UserMinimumPasswordError,
  UserEmptyConfirmPasswordError,
  UserDifferentPasswordsError,
  UserEmptyPasswordError,
  UserInvalidError
} from '@/domain/errors'

export class BCrypt implements TBCrypt {
  async createPasswordHash(password: string, passwordConfirmation?: string): Promise<string> {
    if (!password || password.length < 6) await validateError(new UserMinimumPasswordError())
    if (!passwordConfirmation) await validateError(new UserEmptyConfirmPasswordError())
    if (password !== passwordConfirmation) await validateError(new UserDifferentPasswordsError())
    return bcrypt.hash(password, 8)
  }

  async verifyPasswordHash(password: string, user: any): Promise<TCreateToken> {
    if (!password) await validateError(new UserEmptyPasswordError())
    if (!user || !user.password) await validateError(new UserInvalidError())
    const compareUser = await bcrypt.compare(password, user.password)
    if (!compareUser) await validateError(new UserInvalidError())
    return createToken(user)
  }
}
