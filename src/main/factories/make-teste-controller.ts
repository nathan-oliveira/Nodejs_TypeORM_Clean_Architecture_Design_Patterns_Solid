import { Controller } from '@/presentation/contracts'
import { TesteController } from '@/presentation/controllers'

export const makeTesteController = (): Controller => {
  return new TesteController()
}
