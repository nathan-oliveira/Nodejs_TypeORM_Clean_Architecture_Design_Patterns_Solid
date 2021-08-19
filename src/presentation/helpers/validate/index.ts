import { validate } from 'class-validator'

export const validateError = async (data: any): Promise<void> => {
  if (data?.stack) throw Object.assign({ message: [createObjectError([...data.stack.split(',')], data.message)] })

  const errors = await validate(data)
  if (errors.length === 0) return

  throw Object.assign({
    message: errors.map((e: any) => {
      const property = Array.isArray(e.property) ? e.property : [e.property ?? e.stack]
      const message = e.constraints?.isLength ?? e.constraints?.isEmail ?? e.message
      return createObjectError(property, message)
    })
  })
}

export const createObjectError = (property: any, message: string): object => ({ property , message })

export const createObjectCustomError = (property: string, message: string): object => ({ error: [{ property, message }] })
