import { Controller } from '@/presentation/contracts'
import { GoalRepository } from '@/infra/repositories'
import { GoalService } from '@/data/services'
import { GoalGetAllController } from '@/presentation/controllers'

export const makeGoalGetController = (): Controller => {
  const repo = new GoalRepository()
  const service = new GoalService(repo)
  return new GoalGetAllController(service)
}
