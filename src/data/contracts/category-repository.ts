import { TCategoryModel } from '@/data/models'

export type TCategoryRequest = {
  name: string
  icon: string
}

export interface ICategoryRepository {
  getAll: () => Promise<TCategoryModel[]>
  getById: (id: number) => Promise<TCategoryModel[]>
  toCreate: (dataForm: TCategoryRequest) => Promise<TCategoryModel>
}
