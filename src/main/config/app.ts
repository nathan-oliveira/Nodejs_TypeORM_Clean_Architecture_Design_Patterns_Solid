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
    this.connection() // eslint-disable-line
    this.configApp()
    this.errorHandler()
  }

  private async connection (): Promise<void> {
    await Connection()
  }

  private configApp (): void {
    this.app.use(cors())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json({ limit: '20mb' }))
    this.app.use(helmet())
    setupRoutes(this.app)
  }

  private errorHandler (): void {
    this.app.use(errorHandler.handler)
    this.app.use(function (req, res, next) {
      res.status(404).json(createObjectCustomError('url', 'URL não encontrada!'))
    })
  }
}

export default new App().app
