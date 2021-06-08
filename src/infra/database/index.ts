import { createConnection } from 'typeorm'

import '@/main/config/env/env-resolve'
import config from '@/main/config/orm'

const Connection = createConnection({
  database: config.database,
  entities: config.entities,
  host: config.host,
  logging: config.logging,
  password: config.password,
  port: config.port,
  synchronize: config.synchronize,
  type: 'mysql',
  username: config.username
})

export default Connection
