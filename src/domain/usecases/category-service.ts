import { TCategory, TCategoryCreate } from '@/domain/entities'
import { TCategoryRequest } from '@/data/contracts'

export interface ICategoryService {
  getAll: () => Promise<TCategory[]>
  getById: (id: number) => Promise<TCategory>
  create: (dataForm: TCategoryRequest) => Promise<TCategoryCreate>
}
