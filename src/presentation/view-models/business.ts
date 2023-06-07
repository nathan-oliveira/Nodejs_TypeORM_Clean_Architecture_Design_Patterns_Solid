import { TBusiness, TBusinessCreate } from '@/domain/entities'

export class BusinessGetAllViewModel {
  id: number
  description: string
  types: string
  money: number
  userId: number
  categoryId: number

  static getView (entity: TBusiness[]): BusinessGetAllViewModel[] {
    return entity.map((item) => ({
      id: item.id,
      description: item.description,
      types: item.types,
      money: item.money,
      userId: item.userId,
      categoryId: item.categoryId
    }))
  }
}

export class BusinessGetByIdViewModel {
  id: number
  description: string
  types: string
  money: number
  userId: number
  categoryId: number

  static getView (entity: TBusiness): BusinessGetByIdViewModel {
    return {
      id: entity.id,
      description: entity.description,
      types: entity.types,
      money: entity.money,
      userId: entity.userId,
      categoryId: entity.categoryId
    }
  }
}

export class BusinessPostViewModel {
  description: string
  types: string
  money: number
  userId: number
  categoryId: number

  static getView (entity: TBusinessCreate): BusinessPostViewModel {
    return {
      description: entity.description,
      types: entity.types,
      money: entity.money,
      userId: entity.userId,
      categoryId: entity.categoryId
    }
  }
}

export class BusinessPutViewModel extends BusinessPostViewModel { }
export class BusinessDeleteViewModel extends BusinessPostViewModel { }
