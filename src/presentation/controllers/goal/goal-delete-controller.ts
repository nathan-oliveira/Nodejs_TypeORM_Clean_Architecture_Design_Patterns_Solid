import { Controller, HttpRequest, HttpResponse, ok, forbidden } from '@/presentation/contracts'
import { IGoalService } from '@/domain/usecases'
import { GoalDeleteViewModel } from '@/presentation/view-models'

export class GoalDeleteController implements Controller {
  constructor(private readonly goalService: IGoalService) { }

  async handle(http: HttpRequest): Promise<HttpResponse<GoalDeleteViewModel>> {
    try {
      const result = await this.goalService.delete(http.user.id, http.params.id)
      return ok(GoalDeleteViewModel.getView(result))
    } catch (err) {
      return forbidden(err)
    }
  }
}
