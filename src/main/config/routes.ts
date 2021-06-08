import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import { resolve } from 'path'

export const setupRoutes = (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  readdirSync(resolve(__dirname, '../routes')).forEach(async (fileName) => {
    (await import (`../routes/${fileName}`)).default(router)
  })
}
