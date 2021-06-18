import { TUserCreate } from '@/domain/entities'
import { TCreateToken } from '@/presentation/contracts'

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

export type LoginViewModel = TCreateToken
