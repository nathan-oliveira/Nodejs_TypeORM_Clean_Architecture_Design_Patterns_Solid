import { Controller, HttpResponse, HttpRequest, forbidden, ok } from '@/presentation/contracts'
import { IUserService } from '@/domain/usecases'
import { ProfileViewModel } from '@/presentation/view-models'

export class ProfileController implements Controller {
  constructor (private readonly userService: IUserService) {}

  async handle (http: HttpRequest): Promise<HttpResponse<ProfileViewModel>> {
    const { id } = http.user

    try {
      const result = await this.userService.profile(id)
      return ok(ProfileViewModel.getView(result))
    } catch (err) {
      return forbidden(err)
    }
  }
}
