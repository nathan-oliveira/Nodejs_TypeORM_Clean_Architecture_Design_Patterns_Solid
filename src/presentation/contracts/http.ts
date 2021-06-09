import { StatusCode } from '@/presentation/contracts'

export type HttpResponse<T = any> = {
  statusCode: number
  data: T
}

export type HttpRequest<T = any> = {
  body?: T
  headers?: T
}

export const ok = (data: any): HttpResponse => ({
  statusCode: StatusCode.ok,
  data: data
})

export const badRequest = (error: any): HttpResponse => ({
  statusCode: StatusCode.badRequest,
  data: error.message
})

export const unauthorizedError = (error: any): HttpResponse => ({
  statusCode: StatusCode.unauthorized,
  data: error.message
})

export const serverError = (error: any): HttpResponse => ({
  statusCode: StatusCode.serverError,
  data: error.message
})

export const badGateway = (error: any): HttpResponse => ({
  statusCode: StatusCode.badGateway,
  data: error.message
})

export const forbidden = (error: any): HttpResponse => ({
  statusCode: StatusCode.forbidden,
  data: error.message
})

export const notFound = (error: any): HttpResponse => ({
  statusCode: StatusCode.notFound,
  data: error.message
})
