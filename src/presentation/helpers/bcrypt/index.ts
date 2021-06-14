import * as bcrypt from 'bcrypt'

import { JwT } from '@/presentation/helpers/jwt'
import { createError } from '@/presentation/helpers'
import {
  UserMinimumPasswordError,
  UserEmptyConfirmPasswordError,
  UserDifferentPasswordsError,
  UserEmptyPasswordError,
  UserInvalidError
} from '@/domain/errors'

export class BCrypt {
  static async createPasswordHash (password: string, passwordConfirmation?: string): Promise<string> {
    if (!password || password.length < 6) await createError(new UserMinimumPasswordError())
    if (!passwordConfirmation) await createError(new UserEmptyConfirmPasswordError())
    if (password !== passwordConfirmation) await createError(new UserDifferentPasswordsError())
    return bcrypt.hash(password, 8)
  }

  static async comparePasswordHash (password: string, user: any): Promise<object> {
    if (!password) await createError(new UserEmptyPasswordError())
    if (!user || !user.password) await createError(new UserInvalidError())
    const compareUser = await bcrypt.compare(password, user.password)
    if (!compareUser) await createError(new UserInvalidError())
    return JwT.createToken(user)
  }
}
