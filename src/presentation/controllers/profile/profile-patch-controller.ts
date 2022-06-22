import { Controller, forbidden, HttpRequest, HttpResponse, ok } from '@/presentation/contracts';
import { IUserService } from '@/domain/usecases';
import { ProfileViewModel } from '@/presentation/view-models';


export class ProfilePatchController implements Controller {
  constructor(private readonly userService: IUserService) { }

  async handle(http: HttpRequest): Promise<HttpResponse<any>> {
    const { id } = http.user;

    try {
      const result = await this.userService.updatePhoto(id, http.body);
      return ok(ProfileViewModel.getView(result));
    } catch (err) {
      return forbidden(err);
    }
  }
}