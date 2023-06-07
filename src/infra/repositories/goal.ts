import { getRepository, Repository } from 'typeorm'

import { GoalDAO } from '@/infra/data-sources'
import { TGoalModel } from '@/data/models'
import { IGoalRepository, TGoalRequest } from '@/data/contracts'

import { validateError } from '@/presentation/helpers'
import { GoalNotFoundError } from '@/domain/errors'

export class GoalRepository implements IGoalRepository {
  constructor (
    private readonly manager: Repository<GoalDAO> = getRepository(GoalDAO)
  ) { }

  async getAll (userId: number): Promise<TGoalModel[]> {
    return this.manager.find({ where: { userId } })
  }

  async getById (userId: number, id: number): Promise<TGoalModel[]> {
    return this.manager.find({ where: { id, userId } })
  }

  async toCreate (userId: number, dataForm: TGoalRequest): Promise<TGoalModel> {
    const data = {
      ...dataForm,
      userId
    } as TGoalModel

    const goal = this.manager.create(data)

    await validateError(goal)

    return this.manager.save(goal)
  }

  async toUpdate (userId: number, id: number, dataForm: TGoalRequest): Promise<TGoalModel> {
    const goal = await this.manager.preload({
      ...dataForm,
      userId,
      id
    }) as TGoalModel

    if (goal) await validateError(new GoalNotFoundError())
    return this.manager.save(goal)
  }

  async toDelete (userId: number, id: number, goal: TGoalRequest): Promise<TGoalModel> {
    const dataModel = {
      ...goal,
      userId,
      id
    } as TGoalModel

    return this.manager.remove(dataModel)
  }
}
