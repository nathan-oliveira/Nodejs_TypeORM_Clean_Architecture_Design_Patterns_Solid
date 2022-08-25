import { Controller, HttpRequest, HttpResponse, ok, forbidden } from '@/presentation/contracts'
import { ICategoryService } from '@/domain/usecases'
import { CategoryPostViewModel } from '@/presentation/view-models'

export class CategoryPostController implements Controller {
  constructor(private readonly categoryService: ICategoryService) { }

  async handle(http: HttpRequest): Promise<HttpResponse<CategoryPostViewModel>> {
    const { name, icon } = http.body
    try {
      const result = await this.categoryService.create({ name, icon })
      return ok(CategoryPostViewModel.getView(result))
    } catch (err) {
      return forbidden(err)
    }
  }
}