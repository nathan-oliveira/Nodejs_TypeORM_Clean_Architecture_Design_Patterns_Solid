import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import { env } from '@/main/config/env'
import { createError } from '@/presentation/helpers'
import { unauthorizedError, TJwT, TCreateToken, TJwTPayload } from '@/presentation/contracts'

export class JwT {
  static async createToken (dataForm: TJwT): Promise<TCreateToken> {
    const { id, name, email, level, photo } = dataForm
    const token = jwt.sign({ id, level }, env.secret, { expiresIn: '1d' })
    return { name, email, level, photo, token }
  }

  static async checkToken (req: Request, res: Response, next: NextFunction): Promise<void> {
    const auth = req.headers.authorization

    try {
      if (!auth) throw new Error('Token indefinido!')
      const [, token] = auth.split(' ')
      const { id, level } = jwt.verify(token, env.secret) as TJwTPayload
      (<any>req).user = { id, level }
      next()
    } catch (err) {
      const error = await createError([{ property: ['token'], message: err.message }])
      const { statusCode, data } = unauthorizedError(error)
      res.status(statusCode).json(data)
    }
  }
}
