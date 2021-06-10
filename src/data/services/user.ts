import { IUserService } from '@/domain/usecases'
import { UserRepository } from '@/infra/repositories'
import { UserDAO } from '@/infra/data-sources'
import { errorValidator } from '@/presentation/helpers'

export class UserService implements IUserService {
  constructor (private readonly userRepository: UserRepository) {}

  async create (dataForm: any): Promise<any> {
    const user = UserDAO.create(dataForm)
    await errorValidator(user)

    return await this.userRepository.toCreate(dataForm)
    // if (!result) throw new Error('Erro ao cadastrar usuário!')
    // const result = await getCustomRepository()
  }
}
