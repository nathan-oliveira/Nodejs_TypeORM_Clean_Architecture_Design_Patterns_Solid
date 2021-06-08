import { Controller, HttpResponse, serverError, ok } from '@/presentation/contracts'

export class TesteController implements Controller {
  async get (): Promise<HttpResponse<any>> {
    try {
      return ok({ message: 'Ok!' })
    } catch (err) {
      return serverError(err)
    }
  }
}
