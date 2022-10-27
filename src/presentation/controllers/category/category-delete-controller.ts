import { Controller, HttpRequest, HttpResponse, ok, forbidden } from '@/presentation/contracts'
import { ICategoryService } from '@/domain/usecases'
import { CategoryDeleteViewModel } from '@/presentation/view-models'

export class CategoryDeleteController implements Controller {
  constructor (private readonly categoryService: ICategoryService) { }

  async handle (http: HttpRequest): Promise<HttpResponse<CategoryDeleteViewModel>> {
    const { id } = http.params

    try {
      const result = await this.categoryService.delete(id)
      return ok(CategoryDeleteViewModel.getView(result))
    } catch (err) {
      return forbidden(err)
    }
  }
}
