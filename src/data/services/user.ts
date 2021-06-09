import { validate } from 'class-validator'
import { getCustomRepository } from 'typeorm'


import { IUserService } from '@/domain/usecases'
import { UserRepository } from '@/infra/repositories'
import { UserDAO } from '@/infra/data-sources'

export class UserService implements IUserService {
  constructor (private readonly userRepository: UserRepository) {}

  async create (dataForm: any): Promise<any> {
    const user = UserDAO.create(dataForm)
    const errors = await validate(user)
    if (errors.length > 0) throw new Error('Todos os campos deve conter no mínimo 6 caracteres!')

    return await this.userRepository.toCreate(dataForm)
    // if (!result) throw new Error('Erro ao cadastrar usuário!')
    // const result = await getCustomRepository()
  }
}
