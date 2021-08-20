import { TCreateToken } from './jsonwebtoken'

export interface TBCrypt {
  createPasswordHash: (password: string, passwordConfirmation?: string) => Promise<string>
  verifyPasswordHash: (password: string, user: any) => Promise<TCreateToken>
}
