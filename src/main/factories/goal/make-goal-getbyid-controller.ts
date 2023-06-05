import { Controller } from '@/presentation/contracts'
import { GoalRepository } from '@/infra/repositories'
import { GoalService } from '@/data/services'
import { GoalGetByIdController } from '@/presentation/controllers'

export const makeGoalGetByIdController = (): Controller => {
  const repo = new GoalRepository()
  const service = new GoalService(repo)
  return new GoalGetByIdController(service)
}
