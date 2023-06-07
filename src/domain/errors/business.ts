export class BusinessNotFoundError extends Error {
  constructor () {
    super('Negócio não encontrado!')
    this.name = 'BusinessNotFoundError'
    this.stack = 'business'
  }
}
