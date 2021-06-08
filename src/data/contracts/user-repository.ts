export type TUser = {
  name: string
  email: string
  password: string
  photo: string
  active?: boolean
  level?: number
}

export interface IUserRepository {
  toCreate: (dataForm: TUser) => object
}
