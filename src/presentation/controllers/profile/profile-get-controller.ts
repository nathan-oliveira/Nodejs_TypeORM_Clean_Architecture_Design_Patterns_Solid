import { Controller, HttpResponse, HttpRequest, forbidden, ok } from '@/presentation/contracts'
import { IUserService } from '@/domain/usecases'
import { ProfileViewModel } from '@/presentation/view-models'

export class ProfileGetController implements Controller {
  constructor (private readonly userService: IUserService) { }

  async handle (http: HttpRequest): Promise<HttpResponse<ProfileViewModel>> {
    const { id } = http.user

    try {
      const result = await this.userService.getProfile(id)
      return ok(ProfileViewModel.getView(result))
    } catch (err) {
      return forbidden(err)
    }
  }
}
