import { TBusinessRequest } from '@/data/contracts'
import { TBusiness, TBusinessCreate, TBusinessDelete, TBusinessUpdate } from '@/domain/entities'

export interface IBusinessService {
  getAll: (userId: number) => Promise<TBusiness[]>
  getById: (userId: number, id: number) => Promise<TBusiness>
  create: (userId: number, dataForm: TBusinessRequest) => Promise<TBusinessCreate>
  update: (userId: number, id: number, dataForm: TBusinessRequest) => Promise<TBusinessUpdate>
  delete: (userId: number, id: number) => Promise<TBusinessDelete>
}
