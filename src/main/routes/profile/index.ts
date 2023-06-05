import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { accessControl } from '@/presentation/middlewares'
import {
  makeProfileGetController,
  makeProfilePutController,
  makeProfilePatchController
} from '@/main/factories'

export default (router: Router): void => {
  router.get('/profile', accessControl, adaptRoute(makeProfileGetController()))
  router.put('/profile', accessControl, adaptRoute(makeProfilePutController()))
  router.patch('/profile', accessControl, adaptRoute(makeProfilePatchController()))
}
