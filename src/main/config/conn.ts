import conn from '@/infra/database'

export const Connection = (): void => {
  conn.then(async (resp) => conn).catch((err) => console.error(err))
}
