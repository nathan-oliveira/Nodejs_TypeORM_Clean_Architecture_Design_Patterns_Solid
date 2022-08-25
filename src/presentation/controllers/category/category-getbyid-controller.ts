import { Controller, HttpRequest, HttpResponse, ok, forbidden } from '@/presentation/contracts';
import { ICategoryService } from '@/domain/usecases';
import { CategoryGetByIdViewModel } from '@/presentation/view-models'

export class CategoryGetByIdController implements Controller {
  constructor(private readonly categoryService: ICategoryService) { }

  async handle(http: HttpRequest): Promise<HttpResponse<CategoryGetByIdViewModel>> {
    try {
      const { id } = http.params;
      const result = await this.categoryService.getById(id);
      return ok(CategoryGetByIdViewModel.getView(result));
    } catch (err) {
      return forbidden(err)
    }
  }
}
