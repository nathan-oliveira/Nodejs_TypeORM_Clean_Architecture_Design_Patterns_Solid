import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

import errorHandler from '@/main/config/errors/handler'
import { Connection } from '@/main/config/conn'
import { setupRoutes } from '@/main/config/routes'

class App {
  app: express.Express

  constructor () {
    this.app = express()
    this.middleware()
  }

  private middleware (): any {
    Connection()
    this.app.use(cors())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json({ limit: '20mb' }))
    setupRoutes(this.app)
    this.app.use(helmet())
    this.app.use(errorHandler.handler)
  }
}

export default new App().app
