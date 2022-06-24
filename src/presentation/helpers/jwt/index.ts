import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import { env } from '@/main/config/env'
import { validateError } from '@/presentation/helpers'
import { UserTokenError, UserDisabledAccountError, UserAccessNotAllowedError } from '@/domain/errors'
import { TJwT, TCreateToken, TJwTPayload } from '@/presentation/contracts'

export const createToken = async (dataForm: any): Promise<TCreateToken> => {
  const { id, name, email, level, photo, active } = dataForm as TJwT
  const token = jwt.sign({ id, level, active }, env.secret, { expiresIn: '1d' })
  return { name, email, level, photo, token }
}

export const accessControl = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const auth = req.headers.authorization
    if (!auth) return await validateError(new UserTokenError('Sem autorização!'))

    const [, token] = auth.split(' ')
    if (!token) return await validateError(new UserTokenError('Token indefinido!'))

    const { id, level, active } = jwt.verify(token, env.secret) as TJwTPayload
    if (!active) return await validateError(new UserDisabledAccountError())

    const isRouteValid = await verifyRouteValid(level, req.url)
    if (!isRouteValid) return await validateError(new UserAccessNotAllowedError());

    (<any>req).user = { id, level, active }
    next()
  } catch (err: any) {
    res.status(401).json({ error: err.message })
  }
  // if (exclusions.includes(req.url)) {

  // } else {
  //   res.status(400).json({ t: 'Rota inválida' })
  // }
}

const verifyRouteValid = async (level: number, path: string): Promise<any> => {
  const exclusions = {
    client: {
      routes: ['/profile', '/category'],
      level: 0
    }
  }

  const validLevelClient = exclusions.client.level === level
  let validRouteClient = false;
  exclusions.client.routes.forEach((route) => {
    if (route === path) {
      validRouteClient = true
    }
  })

  return validLevelClient && validRouteClient
}
