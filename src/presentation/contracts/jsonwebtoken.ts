export type TJwT = {
  id: number
  name: string
  email: string
  level: string
  photo: string
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
  level: string
  iat: number
  exp: number
}
