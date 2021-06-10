import { NextFunction, Request, Response } from 'express'

import { Errors } from './base'
import { StatusCode } from '@/presentation/contracts'

class ErrorHandler {
  handler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    if (err instanceof Errors) {
      res.status(err.statusCode).json(err.message)
    } else {
      res.status(StatusCode.serverError).json({ error: [{ message: 'Internal server error!' }] })
    }
  }
}

export default new ErrorHandler()
