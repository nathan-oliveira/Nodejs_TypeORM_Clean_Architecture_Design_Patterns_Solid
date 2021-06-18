import { Controller, HttpResponse, HttpRequest, forbidden, ok } from '@/presentation/contracts'
import { IUserService } from '@/domain/usecases'
import { LoginViewModel } from '@/presentation/view-models'

export class LoginController implements Controller {
  constructor (private readonly userService: IUserService) {}

  async handle (http: HttpRequest): Promise<HttpResponse<LoginViewModel>> {
    const { email, password } = http.body

    try {
      const result = await this.userService.login({ email, password })
      return ok(result)
    } catch (err) {
      return forbidden(err)
    }
  }
}
