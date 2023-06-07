import { Controller, HttpRequest, HttpResponse, ok, forbidden } from '@/presentation/contracts'
import { IBusinessService } from '@/domain/usecases'
import { BusinessGetByIdViewModel } from '@/presentation/view-models'

export class BusinessGetByIdController implements Controller {
  constructor (private readonly businessService: IBusinessService) { }

  async handle (http: HttpRequest): Promise<HttpResponse<BusinessGetByIdViewModel>> {
    try {
      const result = await this.businessService.getById(http.user.id, http.params.id)
      return ok(BusinessGetByIdViewModel.getView(result))
    } catch (err) {
      return forbidden(err)
    }
  }
}
