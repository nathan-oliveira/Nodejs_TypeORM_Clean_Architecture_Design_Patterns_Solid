export class UserInvalidError extends Error {
  constructor () {
    super('E-mail e/ou Senha inválidos!')
    this.name = 'UserInvalidError'
    this.stack = ['email', 'password'].toString()
  }
}

export class UserExistingEmailError extends Error {
  constructor () {
    super('E-mail informado em uso!')
    this.name = 'UserExistingEmailError'
    this.stack = 'email'
  }
}

export class UserEmptyNameError extends Error {
  constructor () {
    super('O campo "Nome" não pode ser vazio!')
    this.name = 'UserEmptyNameError'
    this.stack = 'name'
  }
}

export class UserEmptyEmailError extends Error {
  constructor () {
    super('O campo "E-mail" não pode ser vazio!')
    this.name = 'UserEmptyEmailError'
    this.stack = 'email'
  }
}

export class UserMinimumPasswordError extends Error {
  constructor () {
    super('O campo "Senha" deve conter no mínimo 6 caracteres!')
    this.name = 'UserMinimumPasswordError'
    this.stack = 'password'
  }
}

export class UserEmptyConfirmPasswordError extends Error {
  constructor () {
    super('O campo "Confirmar Senha" não pode ser vazio!')
    this.name = 'UserEmptyConfirmPasswordError'
    this.stack = 'password_confirmation'
  }
}

export class UserDifferentPasswordsError extends Error {
  constructor () {
    super('O campos "Senha" e "Confirmar Senha" são diferentes!')
    this.name = 'UserDifferentPasswordsError'
    this.stack = ['password', 'password_confirmation'].toString()
  }
}

export class UserEmptyPasswordError extends Error {
  constructor () {
    super('O campo "Senha" não pode ser vazio!')
    this.name = 'UserEmptyPasswordError'
    this.stack = 'password'
  }
}

export class UserNotFoundError extends Error {
  constructor () {
    super('Usuário não encontrado!')
    this.name = 'UserNotFoundError'
    this.stack = 'user'
  }
}

export class UserTokenError extends Error {
  constructor (msg: string) {
    super(msg)
    this.name = 'UserTokenError'
    this.stack = 'token'
  }
}

export class UserDisabledAccountError extends Error {
  constructor () {
    super('A sua conta está desativada!')
    this.name = 'UserDisabledAccountError'
    this.stack = 'token'
  }
}

export class UserAccessNotAllowedError extends Error {
  constructor () {
    super('Acesso não permitido!')
    this.name = 'UserAccessNotAllowedError'
    this.stack = 'route'
  }
}

export class UserNotUpdatedError extends Error {
  constructor () {
    super('Não foi possível atualizar o usuário!')
    this.name = 'UserAccessNotAllowedError'
    this.stack = 'user'
  }
}
