import {
  Controller,
  HttpResponse,
  HttpRequest,
  invalidArgument,
  ok
} from '@/presentation/contracts'
import { IUserService } from '@/domain/usecases'

export class SignUpController implements Controller {
  constructor (private readonly userService: IUserService) {}

  async handle (http: HttpRequest): Promise<HttpResponse<any>> {
    const { name, email, password, password_confirmation } = http.body

    try {
      const result = await this.userService.create({
        name,
        email,
        password,
        password_confirmation,
        photo: '*'
      })
      return ok(result)
    } catch (err) {
      return invalidArgument(err)
    }
  }
}
