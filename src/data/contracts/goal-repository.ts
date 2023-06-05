import { TGoalModel } from '@/data/models'

export type TGoalRequest = {
  description: string
  types: string
  money: number
}

export interface IGoalRepository {
  getAll: (userId: number) => Promise<TGoalModel[]>
  getById: (userId: number, id: number) => Promise<TGoalModel[]>
  toCreate: (userId: number, dataForm: TGoalRequest) => Promise<TGoalModel>
  toUpdate: (userId: number, id: number, dataForm: TGoalRequest) => Promise<TGoalModel>
  toDelete: (userId: number, id: number, dataForm: TGoalRequest) => Promise<TGoalModel>
}
