import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { accessControl } from '@/presentation/helpers'
import {
  makeCategoryGetController,
  makeCategoryGetByIdController,
  makeCategoryPostController,
  makeCategoryPutController,
  makeCategoryDeleteController
} from '@/main/factories'

export default (router: Router): void => {
  router.get('/category', accessControl, adaptRoute(makeCategoryGetController()))
  router.get('/category/:id', accessControl, adaptRoute(makeCategoryGetByIdController()))
  router.post('/category', accessControl, adaptRoute(makeCategoryPostController()))
  router.put('/category/:id', accessControl, adaptRoute(makeCategoryPutController()))
  router.delete('/category/:id', accessControl, adaptRoute(makeCategoryDeleteController()))
}
