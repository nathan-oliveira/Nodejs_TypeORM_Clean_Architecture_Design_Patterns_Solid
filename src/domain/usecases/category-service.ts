import { TCategory } from '@/domain/entities';

export interface ICategoryService {
  getAll: () => Promise<TCategory[]>
}