import { Controller } from '@/presentation/contracts'
import { GoalRepository } from '@/infra/repositories'
import { GoalService } from '@/data/services'
import { GoalPutController } from '@/presentation/controllers'

export const makeGoalPutController = (): Controller => {
  const repo = new GoalRepository()
  const service = new GoalService(repo)
  return new GoalPutController(service)
}
