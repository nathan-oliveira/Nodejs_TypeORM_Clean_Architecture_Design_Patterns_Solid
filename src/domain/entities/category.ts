export type TCategory = {
  id: number
  name: string
  icon: string
  created_at: Date
  updated_at: Date
}

export type TCategoryCreate = {
  name: string
  icon: string
}

export type TCategoryUpdate = TCategoryCreate
export type TCategoryDelete = TCategoryCreate
