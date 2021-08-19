export type TJwT = {
  id: number
  name: string
  email: string
  level: string
  photo: string
  active: boolean
}

export type TCreateToken = {
  name: string
  email: string
  level: string
  photo: string
  token: string
}

export type TJwTPayload = {
  id: number
  level: number
  active: boolean
  iat: number
  exp: number
}
