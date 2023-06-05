import { Controller, HttpRequest, HttpResponse, ok, forbidden } from '@/presentation/contracts'
import { IGoalService } from '@/domain/usecases'
import { GoalPostViewModel } from '@/presentation/view-models'

export class GoalPostController implements Controller {
  constructor(private readonly goalService: IGoalService) { }

  async handle(http: HttpRequest): Promise<HttpResponse<GoalPostViewModel>> {
    const { description, types, money } = http.body

    try {
      const result = await this.goalService.create(http.user.id, { description, types, money })
      return ok(GoalPostViewModel.getView(result))
    } catch (err) {
      return forbidden(err)
    }
  }
}
