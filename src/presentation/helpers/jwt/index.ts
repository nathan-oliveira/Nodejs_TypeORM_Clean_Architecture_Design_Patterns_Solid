import * as jwt from 'jsonwebtoken'

import { env } from '@/main/config/env'
import { TJwT, TCreateToken } from '@/presentation/contracts'

export const createToken = async (dataForm: any): Promise<TCreateToken> => {
  const { id, name, email, level, photo, active } = dataForm as TJwT
  const token = jwt.sign({ id, level, active }, env.secret, { expiresIn: '1d' })
  return { name, email, level, photo, token }
}
