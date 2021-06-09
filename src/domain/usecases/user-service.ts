export type TUserRequestCreate = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface IUserService {
  create: (dataForm: any) => Promise<any>
}
