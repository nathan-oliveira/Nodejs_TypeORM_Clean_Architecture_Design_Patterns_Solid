import { Controller, HttpResponse, HttpRequest, serverError, ok } from '@/presentation/contracts'
import { IUserService, TUserRequestCreate } from '@/domain/usecases'

export class SignUpController implements Controller {
  constructor (private readonly userService: IUserService) {}

  async handle (http: HttpRequest): Promise<HttpResponse<any>> {
    const { name, email, password, password_confirmation } = http.body as TUserRequestCreate

    try {
      const result = await this.userService.create({ name, email, password, foto: '' })
      console.log('result => ', result)

      return ok({ message: 'Ok!' })
    } catch (err) {
      console.log(err)
      return serverError(err)
    }
  }
}
