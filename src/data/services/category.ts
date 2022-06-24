import { TCategory } from '@/domain/entities';
import { ICategoryService } from '@/domain/usecases';
import { ICategoryRepository } from '@/data/contracts';

export class CategoryService implements ICategoryService {
  constructor(
    private readonly categoryService: ICategoryRepository,
  ) { }

  getAll(): Promise<TCategory[]> {
    return this.categoryService.getAll();
  }
}
