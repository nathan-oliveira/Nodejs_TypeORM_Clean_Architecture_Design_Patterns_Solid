import { StatusCode } from '@/presentation/contracts'

export abstract class Errors extends Error {
  public readonly name: string
  public readonly statusCode: StatusCode

  constructor(name: string, statusCode: StatusCode, message: string) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)

    this.name = name
    this.statusCode = statusCode

    Error.captureStackTrace(this)
  }
}
