import { Controller, HttpRequest, HttpResponse, ok, forbidden } from '@/presentation/contracts'
import { IGoalService } from '@/domain/usecases'
import { GoalGetAllViewModel } from '@/presentation/view-models'

export class GoalGetAllController implements Controller {
  constructor (private readonly goalService: IGoalService) { }

  async handle (http: HttpRequest): Promise<HttpResponse<GoalGetAllViewModel>> {
    try {
      const result = await this.goalService.getAll(http.user.id)
      return ok(GoalGetAllViewModel.getView(result))
    } catch (err) {
      return forbidden(err)
    }
  }
}
