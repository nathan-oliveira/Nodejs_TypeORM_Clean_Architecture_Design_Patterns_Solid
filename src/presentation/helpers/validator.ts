import { validate } from 'class-validator'

export const validateError = async (dao: any): Promise<void> => {
  const errors = await validate(dao)
  await createError(errors)
}

export const createError = async (errors: any): Promise<void> => {
  if (errors.length > 0) {
    throw Object.assign({
      message: {
        error: errors.map((e: any) => createObjectError([e.property], e.constraints?.isLength ?? e.constraints?.isEmail ?? e.message))
      }
    })
  }
}

export const createObjectError = (property: string[], message: string): object => ({ property , message })
