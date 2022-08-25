import { TCategory } from '@/domain/entities'

export interface ICategoryRepository {
  getAll: () => Promise<TCategory[]>
  getById: (id: number) => Promise<TCategory[]>
  toCreate: (dataForm: any) => Promise<any>
}
