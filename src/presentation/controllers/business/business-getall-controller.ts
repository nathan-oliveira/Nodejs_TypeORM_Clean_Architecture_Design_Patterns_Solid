import { Controller, HttpRequest, HttpResponse, ok, forbidden } from '@/presentation/contracts'
import { IBusinessService } from '@/domain/usecases'
import { BusinessGetAllViewModel } from '@/presentation/view-models'

export class BusinessGetAllController implements Controller {
  constructor (private readonly businessService: IBusinessService) { }

  async handle (http: HttpRequest): Promise<HttpResponse<BusinessGetAllViewModel>> {
    try {
      const result = await this.businessService.getAll(http.user.id)
      return ok(BusinessGetAllViewModel.getView(result))
    } catch (err) {
      return forbidden(err)
    }
  }
}
