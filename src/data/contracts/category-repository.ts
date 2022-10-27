import { TCategoryModel } from '@/data/models'

export type TCategoryRequest = {
  name: string
  icon: string
}

export interface ICategoryRepository {
  getAll: () => Promise<TCategoryModel[]>
  getById: (id: number) => Promise<TCategoryModel[]>
  toCreate: (dataForm: TCategoryRequest) => Promise<TCategoryModel>
  toUpdate: (id: number, dataForm: TCategoryRequest) => Promise<TCategoryModel>
  toDelete: (id: number, category: TCategoryRequest) => Promise<TCategoryModel>
}
