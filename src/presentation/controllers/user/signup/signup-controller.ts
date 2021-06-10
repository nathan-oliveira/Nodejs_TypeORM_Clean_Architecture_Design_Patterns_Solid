import { Controller, HttpResponse, HttpRequest, serverError, ok } from '@/presentation/contracts'
import { IUserService, TUserRequestCreate } from '@/domain/usecases'
import { BCrypt } from '@/presentation/helpers'

export class SignUpController implements Controller {
  constructor (private readonly userService: IUserService) {}

  async handle (http: HttpRequest): Promise<HttpResponse<any>> {
    const { name, email, password, password_confirmation } = http.body as TUserRequestCreate

    try {
      const passwordHash = await BCrypt.createPasswordHash(password, password_confirmation)
      const result = await this.userService.create({ name, email, password: passwordHash, foto: '*' })
      return ok(result)
    } catch (err) {
      return serverError(err)
    }
  }
}
