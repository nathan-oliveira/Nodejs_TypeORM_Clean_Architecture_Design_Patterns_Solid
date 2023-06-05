import { Controller } from '@/presentation/contracts'
import { GoalRepository } from '@/infra/repositories'
import { GoalService } from '@/data/services'
import { GoalDeleteController } from '@/presentation/controllers'

export const makeGoalDeleteController = (): Controller => {
  const repo = new GoalRepository()
  const service = new GoalService(repo)
  return new GoalDeleteController(service)
}
