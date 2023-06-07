import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

import errorHandler from '@/main/config/errors/handler'
import { Conn as Connection } from '@/main/config/conn'
import { setupRoutes } from '@/main/config/routes'
import { createObjectCustomError } from '@/presentation/helpers'

class App {
  app: express.Express

  constructor () {
    this.app = express()
    this.initApp() // eslint-disable-line
  }

  private async initApp (): Promise<void> {
    await Connection()
    this.app.use(cors())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json({ limit: '20mb' }))
    setupRoutes(this.app)
    this.app.use(helmet())
    this.app.use(errorHandler.handler)
    this.app.use(function (req, res, next) {
      res.status(404).json(createObjectCustomError('url', 'URL não encontrada!'))
    })
  }
}

export default new App().app
