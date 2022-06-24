import { TCategory } from "@/domain/entities";

export interface ICategoryRepository {
  getAll: () => Promise<TCategory[]>
}