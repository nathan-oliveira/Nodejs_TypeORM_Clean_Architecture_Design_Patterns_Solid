import { Router } from 'express'
import { adaptRoute } from '../adapters'
import { makeTesteController } from '../factories'

export default (router: Router): void => {
  router.get('/teste', adaptRoute(makeTesteController()))
}
