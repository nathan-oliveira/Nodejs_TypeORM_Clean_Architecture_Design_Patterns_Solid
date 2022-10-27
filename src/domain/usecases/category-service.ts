import { TCategoryRequest } from '@/data/contracts'
import { TCategory, TCategoryCreate, TCategoryDelete, TCategoryUpdate } from '@/domain/entities'

export interface ICategoryService {
  getAll: () => Promise<TCategory[]>
  getById: (id: number) => Promise<TCategory>
  create: (dataForm: TCategoryRequest) => Promise<TCategoryCreate>
  update: (id: number, dataForm: TCategoryRequest) => Promise<TCategoryUpdate>
  delete: (id: number) => Promise<TCategoryDelete>
}
