import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { accessControl } from '@/presentation/helpers'
import { makeCategoryGetController, makeCategoryGetByIdController, makeCategoryPostController } from '@/main/factories'

export default (router: Router): void => {
  router.get('/category', accessControl, adaptRoute(makeCategoryGetController()))
  router.get('/category/:id', accessControl, adaptRoute(makeCategoryGetByIdController()))
  router.post('/category', accessControl, adaptRoute(makeCategoryPostController()))
}
