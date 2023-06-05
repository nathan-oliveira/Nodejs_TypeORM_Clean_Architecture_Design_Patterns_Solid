import { TGoalRequest } from '@/data/contracts'
import { TGoal, TGoalCreate, TGoalDelete, TGoalUpdate } from '@/domain/entities'

export interface IGoalService {
  getAll: (userId: number) => Promise<TGoal[]>
  getById: (userId: number, id: number) => Promise<TGoal>
  create: (userId: number, dataForm: TGoalRequest) => Promise<TGoalCreate>
  update: (userId: number, id: number, dataForm: TGoalRequest) => Promise<TGoalUpdate>
  delete: (userId: number, id: number) => Promise<TGoalDelete>
}
