import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeSignUpController, makeLoginController, makeProfileController } from '@/main/factories'
import { accessControl } from '@/presentation/helpers'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
  router.get('/profile', accessControl, adaptRoute(makeProfileController()))
}
