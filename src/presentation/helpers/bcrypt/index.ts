import * as bcrypt from 'bcrypt'

import { JwT } from '@/presentation/helpers/jwt'
import { createError } from '@/presentation/helpers'
import {
  errorCreatePassword,
  errorPasswordConfirmation,
  errorComparePassword,
  errorCompareUser,
  errorPasswordInvalid
} from './errors'

export class BCrypt {
  static async createPasswordHash (password: string, passwordConfirmation?: string): Promise<string> {
    if (!password || password.length < 6) await createError(errorCreatePassword)
    if (!passwordConfirmation) await createError(errorPasswordConfirmation)
    if (password !== passwordConfirmation) await createError(errorPasswordInvalid)
    return bcrypt.hash(password, 8)
  }

  static async comparePasswordHash (password: string, user: any): Promise<object> {
    if (!password) await createError(errorComparePassword)
    if (!user || !user.password) await createError(errorCompareUser)
    const compareUser = await bcrypt.compare(password, user.password)
    if (!compareUser) await createError(errorCompareUser)
    return JwT.createToken(user)
  }
}
