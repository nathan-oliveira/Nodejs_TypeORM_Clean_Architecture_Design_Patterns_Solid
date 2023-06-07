import { Controller, HttpRequest, HttpResponse, ok, forbidden } from '@/presentation/contracts'
import { IBusinessService } from '@/domain/usecases'
import { BusinessPutViewModel } from '@/presentation/view-models'

export class BusinessPutController implements Controller {
  constructor (private readonly businessService: IBusinessService) { }

  async handle (http: HttpRequest<any>): Promise<HttpResponse<BusinessPutViewModel>> {
    const { description, types, money, categoryId } = http.body

    try {
      const result = await this.businessService.update(http.user.id, http.params.id, { description, types, money, categoryId })
      return ok(BusinessPutViewModel.getView(result))
    } catch (err) {
      return forbidden(err)
    }
  }
}
