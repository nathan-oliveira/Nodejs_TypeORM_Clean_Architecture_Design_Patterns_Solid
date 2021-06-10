import { validate } from 'class-validator'

export const errorValidator = async (dao: any): Promise<any> => {
  const errors = await validate(dao)
  await createError(errors)
}

export const createError = async (errors: any): Promise<any> => {
  if (errors.length > 0) {
    throw Object.assign({
      message: {
        error: errors.map((e: any) => ({
          property: [e.property],
          message: e.constraints.isLength ?? e.constraints.isEmail ?? e.message
        }))
      }
    })
  }
}
