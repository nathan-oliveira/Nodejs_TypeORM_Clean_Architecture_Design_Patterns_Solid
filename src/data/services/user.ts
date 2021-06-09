import { validate } from 'class-validator'

import { IUserService } from '@/domain/usecases'
import { TUser, IUserRepository } from '@/data/contracts'
import { UserDAO } from '@/infra/data-sources'

export class UserService implements IUserService {
  constructor (private readonly userRepository: IUserRepository) {}

  async create (dataForm: TUser): Promise<any> {
    const user = UserDAO.create(dataForm)
    const errors = await validate(user)
    if (errors.length > 0) throw new Error('Todos os campos deve conter no mínimo 6 caracteres!')

    const result = this.userRepository.toCreate(dataForm)
    console.log('result => ', result)
    // if (!result) throw new Error('Erro ao cadastrar usuário!')
    // const result = await getCustomRepository()
  }
}
