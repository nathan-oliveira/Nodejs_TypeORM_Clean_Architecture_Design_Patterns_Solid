import { Controller, HttpRequest, HttpResponse, ok, forbidden } from '@/presentation/contracts'
import { IBusinessService } from '@/domain/usecases'
import { BusinessDeleteViewModel } from '@/presentation/view-models'

export class BusinessDeleteController implements Controller {
  constructor (private readonly businessService: IBusinessService) { }

  async handle (http: HttpRequest): Promise<HttpResponse<BusinessDeleteViewModel>> {
    try {
      const result = await this.businessService.delete(http.user.id, http.params.id)
      return ok(BusinessDeleteViewModel.getView(result))
    } catch (err) {
      return forbidden(err)
    }
  }
}
