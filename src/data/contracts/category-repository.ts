import { TCategory, TCategoryCreate } from '@/domain/entities'

export type TCategoryRequest = {
  name: string
  icon: string
}

export interface ICategoryRepository {
  getAll: () => Promise<TCategory[]>
  getById: (id: number) => Promise<TCategory[]>
  toCreate: (dataForm: TCategoryRequest) => Promise<TCategoryCreate>
}
