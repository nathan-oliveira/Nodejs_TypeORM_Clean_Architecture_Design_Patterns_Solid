import { validate } from 'class-validator'

export const validateError = async (dao: any): Promise<void> => {
  const errors = await validate(dao)
  if (errors.length === 0) return
  throw Object.assign({
    message: {
      error: errors.map((e: any) => {
        const property = Array.isArray(e.property) ? e.property : [e.property ?? e.stack]
        const message = e.constraints?.isLength ?? e.constraints?.isEmail ?? e.message
        return createObjectError(property, message)
      })
    }
  })
}

export const createObjectError = (property: any, message: string): object => ({ property , message })

export const createError = async (errors: any): Promise<void> => {
  if (errors.length === 0) return
  throw Object.assign({ message: { error: [createObjectError([...errors.stack.split(',')], errors.message)] } })
}
