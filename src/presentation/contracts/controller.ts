import { HttpResponse } from '@/presentation/contracts'

export interface Controller {
  get: () => Promise<HttpResponse>
}
