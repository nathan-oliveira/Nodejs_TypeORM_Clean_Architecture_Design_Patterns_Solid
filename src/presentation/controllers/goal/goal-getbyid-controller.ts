import { Controller, HttpRequest, HttpResponse, ok, forbidden } from '@/presentation/contracts'
import { IGoalService } from '@/domain/usecases'
import { GoalGetByIdViewModel } from '@/presentation/view-models'

export class GoalGetByIdController implements Controller {
  constructor(private readonly goalService: IGoalService) { }

  async handle(http: HttpRequest): Promise<HttpResponse<GoalGetByIdViewModel>> {
    try {
      const result = await this.goalService.getById(http.user.id, http.params.id)
      return ok(GoalGetByIdViewModel.getView(result))
    } catch (err) {
      return forbidden(err)
    }
  }
}
