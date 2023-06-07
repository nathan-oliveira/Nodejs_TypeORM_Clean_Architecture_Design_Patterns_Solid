export type TBusiness = {
  id: number
  description: string
  types: string
  money: number
  userId: number
  categoryId: number
  created_at: Date
  updated_at: Date
}

export type TBusinessCreate = {
  description: string
  types: string
  money: number
  userId: number
  categoryId: number
}

export type TBusinessUpdate = TBusinessCreate
export type TBusinessDelete = TBusinessCreate
