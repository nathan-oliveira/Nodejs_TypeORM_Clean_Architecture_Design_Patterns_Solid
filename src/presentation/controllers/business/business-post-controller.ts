import { Controller, HttpRequest, HttpResponse, ok, forbidden } from '@/presentation/contracts'
import { IBusinessService } from '@/domain/usecases'
import { BusinessPostViewModel } from '@/presentation/view-models'

export class BusinessPostController implements Controller {
  constructor (private readonly businessService: IBusinessService) { }

  async handle (http: HttpRequest): Promise<HttpResponse<BusinessPostViewModel>> {
    const { description, types, money, categoryId } = http.body

    try {
      const result = await this.businessService.create(http.user.id, { description, types, money, categoryId })
      return ok(BusinessPostViewModel.getView(result))
    } catch (err) {
      return forbidden(err)
    }
  }
}
