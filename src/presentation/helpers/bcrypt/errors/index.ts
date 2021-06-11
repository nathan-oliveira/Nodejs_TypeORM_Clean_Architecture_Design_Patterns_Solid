import { createObjectError } from '@/presentation/helpers'

export const errorCreatePassword = [createObjectError(['password'], 'O campo "Senha" deve conter no mínimo 6 caracteres!')]
export const errorComparePassword = [createObjectError(['password'], 'O campo "Senha" não pode ser vazio!')]
export const errorCompareUser = [createObjectError(['email', 'password'], 'E-mail e/ou Senha inválidos!')]
export const errorPasswordInvalid = [createObjectError(['password', 'password_confirmation'], 'O campos "Senha" e "Confirmar Senha" são diferentes!')]
export const errorPasswordConfirmation = [createObjectError(['password_confirmation'], 'O campo "Confirmar Senha" não pode ser vazio!')]
