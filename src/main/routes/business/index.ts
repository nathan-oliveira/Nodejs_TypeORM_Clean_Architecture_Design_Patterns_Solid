import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { accessControl } from '@/presentation/middlewares'

import {
  makeBusinessGetController,
  makeBusinessGetByIdController,
  makeBusinessPostController,
  makeBusinessPutController,
  makeBusinessDeleteController
} from '@/main/factories'

export default (router: Router): void => {
  router.get('/business', accessControl, adaptRoute(makeBusinessGetController()))
  router.get('/business/:id', accessControl, adaptRoute(makeBusinessGetByIdController()))
  router.post('/business', accessControl, adaptRoute(makeBusinessPostController()))
  router.put('/business/:id', accessControl, adaptRoute(makeBusinessPutController()))
  router.delete('/business/:id', accessControl, adaptRoute(makeBusinessDeleteController()))
}
