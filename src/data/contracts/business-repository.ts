import { TBusinessModel } from '@/data/models'

export type TBusinessRequest = {
  description: string
  types: string
  money: number
  categoryId: number
}

export interface IBusinessRepository {
  getAll: (userId: number) => Promise<TBusinessModel[]>
  getById: (userId: number, id: number) => Promise<TBusinessModel[]>
  toCreate: (userId: number, dataForm: TBusinessRequest) => Promise<TBusinessModel>
  toUpdate: (userId: number, id: number, dataForm: TBusinessRequest) => Promise<TBusinessModel>
  toDelete: (userId: number, id: number, dataForm: TBusinessRequest) => Promise<TBusinessModel>
}
