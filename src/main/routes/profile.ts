import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { accessControl } from '@/presentation/helpers'
import { makeProfileController, makeProfilePutController } from '@/main/factories'

export default (router: Router): void => {
  router.get('/profile', accessControl, adaptRoute(makeProfileController()))
  router.put('/profile', accessControl, adaptRoute(makeProfilePutController()))
}