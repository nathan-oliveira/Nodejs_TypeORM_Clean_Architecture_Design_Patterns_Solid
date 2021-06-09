import { HttpResponse, HttpRequest } from '@/presentation/contracts'

export interface Controller {
  handle: (http: HttpRequest) => Promise<HttpResponse<any>>
}
