import { Controller, HttpRequest, HttpResponse, ok, forbidden } from '@/presentation/contracts'
import { ICategoryService } from '@/domain/usecases'
import { CategoryPutViewModel } from '@/presentation/view-models'

export class CategoryPutController implements Controller {
  constructor (private readonly categoryService: ICategoryService) { }

  async handle (http: HttpRequest): Promise<HttpResponse<CategoryPutViewModel>> {
    const { name, icon } = http.body
    const { id } = http.params

    try {
      const result = await this.categoryService.update(Number(id), { name, icon })
      return ok(CategoryPutViewModel.getView(result))
    } catch (err) {
      return forbidden(err)
    }
  }
}
