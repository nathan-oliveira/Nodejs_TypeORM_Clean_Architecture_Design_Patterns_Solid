import { TCategory } from "@/domain/entities"

export class CategoryGetAllViewModel {
  id: number
  name: string
  icon: string

  static getView(entity: TCategory[]): CategoryGetAllViewModel[] {
    return entity.map((item) => ({
      id: item.id,
      name: item.name,
      icon: item.icon,
    }))
  }
}