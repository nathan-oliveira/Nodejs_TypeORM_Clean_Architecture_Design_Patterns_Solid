import { Controller, HttpResponse, HttpRequest, invalidArgument, ok } from '@/presentation/contracts'
import { IUserService } from '@/domain/usecases'
import { SignUpViewModel } from '@/presentation/view-models'

export class SignUpController implements Controller {
  constructor (private readonly userService: IUserService) {}

  async handle (http: HttpRequest): Promise<HttpResponse<SignUpViewModel>> {
    const { name, email, password, password_confirmation } = http.body

    try {
      const result = await this.userService.signUp({
        name,
        email,
        password,
        password_confirmation,
        photo: '*'
      })

      return ok(SignUpViewModel.getView(result))
    } catch (err) {
      return invalidArgument(err)
    }
  }
}
