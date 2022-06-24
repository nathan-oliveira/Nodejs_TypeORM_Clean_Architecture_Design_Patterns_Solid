import { Controller, HttpRequest, HttpResponse, ok, forbidden } from '@/presentation/contracts';
import { ICategoryService } from '@/domain/usecases';
import { CategoryGetAllViewModel } from '@/presentation/view-models'

export class CategoryGetAllController implements Controller {
  constructor(private readonly categoryService: ICategoryService) { }

  async handle(http: HttpRequest): Promise<HttpResponse<CategoryGetAllViewModel>> {
    try {
      const result = await this.categoryService.getAll();
      return ok(CategoryGetAllViewModel.getView(result));
    } catch (err) {
      return forbidden(err)
    }
  }
}
