import { Request, Response } from 'express'

import { Controller } from '@/presentation/contracts'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpResponse = await controller.get()
    res.status(httpResponse.statusCode).json(httpResponse.data)
  }
}
