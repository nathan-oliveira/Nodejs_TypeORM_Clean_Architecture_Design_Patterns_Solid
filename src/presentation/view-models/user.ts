import { TUserCreate, TUserProfile } from '@/domain/entities'
import { TCreateToken } from '@/presentation/contracts'

export class SignUpViewModel {
  name: string
  email: string
  active: boolean
  level: number
  photo: string

  static getView(entity: TUserCreate): SignUpViewModel {
    return {
      name: entity.name,
      email: entity.email,
      active: entity.active,
      level: entity.level,
      photo: entity.photo
    }
  }
}

// implements TCreateToken
export class LoginViewModel {
  name: string
  email: string
  level: string
  photo: string
  token: string

  static getView(entity: TCreateToken): LoginViewModel {
    return {
      name: entity.name,
      email: entity.email,
      level: entity.level,
      photo: entity.photo,
      token: entity.token
    }
  }
}

export class ProfileViewModel {
  id: number
  name: string
  email: string
  active: boolean
  photo: string
  level: number

  static getView(entity: TUserProfile): ProfileViewModel {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      active: entity.active,
      photo: entity.photo,
      level: entity.level
    }
  }
}

export class ProfileViewProfileModel {
  photo: string

  static getView(entity: TUserProfile): ProfileViewProfileModel {
    return {
      photo: entity.photo,
    }
  }
}
