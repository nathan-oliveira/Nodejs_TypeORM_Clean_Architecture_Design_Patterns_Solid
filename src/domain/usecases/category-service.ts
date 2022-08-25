import { TCategory } from '@/domain/entities';

export interface ICategoryService {
  getAll: () => Promise<TCategory[]>
  getById: (id: number) => Promise<TCategory>
}
