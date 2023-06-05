import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { accessControl } from '@/presentation/middlewares'

import {
  makeGoalGetController,
  makeGoalGetByIdController,
  makeGoalPostController,
  makeGoalPutController,
  makeGoalDeleteController
} from '@/main/factories'

export default (router: Router): void => {
  router.get('/goal', accessControl, adaptRoute(makeGoalGetController()))
  router.get('/goal/:id', accessControl, adaptRoute(makeGoalGetByIdController()))
  router.post('/goal', accessControl, adaptRoute(makeGoalPostController()))
  router.put('/goal/:id', accessControl, adaptRoute(makeGoalPutController()))
  router.delete('/goal/:id', accessControl, adaptRoute(makeGoalDeleteController()))
}
