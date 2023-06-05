import { TCategory, TCategoryCreate } from '@/domain/entities'

export class CategoryGetAllViewModel {
  id: number
  name: string
  icon: string

  static getView(entity: TCategory[]): CategoryGetAllViewModel[] {
    return entity.map((item) => ({
      id: item.id,
      name: item.name,
      icon: item.icon
    }))
  }
}

export class CategoryGetByIdViewModel {
  id: number
  name: string
  icon: string

  static getView(entity: TCategory): CategoryGetAllViewModel {
    return {
      id: entity.id,
      name: entity.name,
      icon: entity.icon
    }
  }
}

export class CategoryPostViewModel {
  name: string
  icon: string

  static getView(entity: TCategoryCreate): CategoryPostViewModel {
    return {
      name: entity.name,
      icon: entity.icon
    }
  }
}

export class CategoryPutViewModel extends CategoryPostViewModel { }
export class CategoryDeleteViewModel extends CategoryPostViewModel { }
