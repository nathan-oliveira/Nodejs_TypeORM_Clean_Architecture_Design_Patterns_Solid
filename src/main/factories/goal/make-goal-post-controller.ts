import { Controller } from '@/presentation/contracts'
import { GoalRepository } from '@/infra/repositories'
import { GoalService } from '@/data/services'
import { GoalPostController } from '@/presentation/controllers'

export const makeGoalPostController = (): Controller => {
  const repo = new GoalRepository()
  const service = new GoalService(repo)
  return new GoalPostController(service)
}
