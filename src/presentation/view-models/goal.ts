import { TGoal, TGoalCreate } from '@/domain/entities'

export class GoalGetAllViewModel {
  id: number
  description: string
  types: string
  money: number
  userId: number

  static getView (entity: TGoal[]): GoalGetAllViewModel[] {
    return entity.map((item) => ({
      id: item.id,
      description: item.description,
      types: item.types,
      money: item.money,
      userId: item.userId
    }))
  }
}

export class GoalGetByIdViewModel {
  id: number
  description: string
  types: string
  money: number
  userId: number

  static getView (entity: TGoal): GoalGetByIdViewModel {
    return {
      id: entity.id,
      description: entity.description,
      types: entity.types,
      money: entity.money,
      userId: entity.userId
    }
  }
}

export class GoalPostViewModel {
  description: string
  types: string
  money: number
  userId: number

  static getView (entity: TGoalCreate): GoalPostViewModel {
    return {
      description: entity.description,
      types: entity.types,
      money: entity.money,
      userId: entity.userId
    }
  }
}

export class GoalPutViewModel extends GoalPostViewModel { }
export class GoalDeleteViewModel extends GoalPostViewModel { }
