import { Controller, HttpRequest, HttpResponse, ok, forbidden } from '@/presentation/contracts'
import { IGoalService } from '@/domain/usecases'
import { GoalPutViewModel } from '@/presentation/view-models'

export class GoalPutController implements Controller {
  constructor (private readonly goalService: IGoalService) { }

  async handle (http: HttpRequest<any>): Promise<HttpResponse<GoalPutViewModel>> {
    const { description, types, money } = http.body

    try {
      const result = await this.goalService.update(http.user.id, http.params.id, { description, types, money })
      return ok(GoalPutViewModel.getView(result))
    } catch (err) {
      return forbidden(err)
    }
  }
}
