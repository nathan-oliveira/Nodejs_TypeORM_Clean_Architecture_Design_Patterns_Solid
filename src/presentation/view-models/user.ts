import { TUserCreate } from '@/domain/entities'

export class SignUpViewModel {
  name: string
  email: string
  active: boolean
  level: number
  photo: string

  static getView (entity: TUserCreate): SignUpViewModel {
    return {
      name: entity.name,
      email: entity.email,
      active: entity.active,
      level: entity.level,
      photo: entity.photo
    }
  }
}
