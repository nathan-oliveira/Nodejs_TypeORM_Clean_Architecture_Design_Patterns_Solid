import { Router } from 'express'
import { adaptRoute } from '../adapters'
import { makeSignUpController, makeLoginController } from '../factories'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
