import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import { env } from '@/main/config/env'
import { validateError } from '@/presentation/helpers'
import { UserTokenError } from '@/domain/errors'
import { unauthorizedError, TJwT, TCreateToken, TJwTPayload } from '@/presentation/contracts'

export const createToken = async (dataForm: TJwT): Promise<TCreateToken> => {
  const { id, name, email, level, photo } = dataForm
  const token = jwt.sign({ id, level }, env.secret, { expiresIn: '1d' })
  return { name, email, level, photo, token }
}

export const jwtMiddleware = (exclusions: string[]): any => {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    if (!exclusions.includes(req.url)) {
      const auth = req.headers.authorization

      try {
        if (!auth) throw new Error('Token indefinido!')
        const [, token] = auth.split(' ')
        const { id, level } = jwt.verify(token, env.secret) as TJwTPayload
        (<any>req).user = { id, level }
        next()
      } catch (err) {
        const error = await validateError(new UserTokenError(err.message))
        const { statusCode, data } = unauthorizedError(error)
        res.status(statusCode).json(data)
        return false
      }
    }

    next()
  }
}
