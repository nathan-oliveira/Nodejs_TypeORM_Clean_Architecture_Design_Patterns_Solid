import { IGoalService } from '@/domain/usecases'
import { IGoalRepository, TGoalRequest } from '@/data/contracts'
import { validateError } from '@/presentation/helpers'
import { GoalNotFoundError } from '@/domain/errors'

import { TGoal, TGoalCreate, TGoalUpdate, TGoalDelete } from '@/domain/entities'

export class GoalService implements IGoalService {
  constructor (
    private readonly goalRepository: IGoalRepository
  ) { }

  async getAll (userId: number): Promise<TGoal[]> {
    return this.goalRepository.getAll(userId)
  }

  async getById (userId: number, id: number): Promise<TGoal> {
    const [goal] = await this.goalRepository.getById(userId, id)
    if (!goal) await validateError(new GoalNotFoundError())
    return goal
  }

  async create (userId: number, dataForm: TGoalRequest): Promise<TGoalCreate> {
    return this.goalRepository.toCreate(userId, dataForm)
  }

  async update (userId: number, id: number, dataForm: TGoalRequest): Promise<TGoalUpdate> {
    return this.goalRepository.toUpdate(userId, id, dataForm)
  }

  async delete (userId: number, id: number): Promise<TGoalDelete> {
    const goal = await this.getById(userId, id)
    return this.goalRepository.toDelete(userId, id, goal)
  }
}
