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

    const isRouteValid = await verifyRouteValid(level, req.url, req.method)
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

const verifyRouteValid = async (level: number, path: string, method: string): Promise<boolean> => {
  const exclusions = {
    client: {
      routes: ['/profile', '/category'], // configurar methods
      level: 0
    }
  }

  let validRouteClient = false;

  if (exclusions.client.level === level) {
    exclusions.client.routes.forEach((route) => {
      if (route === path) validRouteClient = true
      const pathIncludeId = path.includes(route) && /[\/][0-9]{1,}/g.test(path);
      if (pathIncludeId) validRouteClient = true
    })
  }

  return validRouteClient;
}
