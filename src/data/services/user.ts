import { IUserService } from '@/domain/usecases'
import { UserRepository } from '@/infra/repositories'
import { UserDAO } from '@/infra/data-sources'
import { validateError, createError, createObjectError, BCrypt } from '@/presentation/helpers'
import { TUserCreate } from '@/domain/entities'
import { TUser } from '@/data/contracts'

export class UserService implements IUserService {
  constructor (private readonly userRepository: UserRepository) {}

  async validateCreateUser (dataForm: TUser): Promise<any> {
    const result = await this.userRepository.searchEmail(dataForm.email)
    if (result.length > 0) await createError([createObjectError(['email'], 'E-mail informado já existe!')])
    const user = UserDAO.create(dataForm)
    await validateError(user)
  }

  async create (dataForm: TUser): Promise<TUserCreate> {
    await this.validateCreateUser(dataForm)
    dataForm.password = await BCrypt.createPasswordHash(dataForm.password, dataForm.password_confirmation)
    delete dataForm.password_confirmation

    const { name, email, active, level } = await this.userRepository.toCreate(dataForm)
    return { name, email, active, level }
  }
}
