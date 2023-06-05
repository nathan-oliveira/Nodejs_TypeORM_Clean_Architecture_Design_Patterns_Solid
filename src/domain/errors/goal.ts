export class GoalNotFoundError extends Error {
  constructor() {
    super('Meta não encontrada!')
    this.name = 'GoalNotFoundError'
    this.stack = 'goal'
  }
}
