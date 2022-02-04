import conn from '@/infra/database'
import { Connection } from 'typeorm'

export const Conn = async (): Promise<Connection> => {
  return await conn
}
