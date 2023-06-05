export type TGoal = {
  id: number
  description: string
  types: string
  money: number
  userId: number
  created_at: Date
  updated_at: Date
}

export type TGoalCreate = {
  description: string
  types: string
  money: number
  userId: number
}

export type TGoalUpdate = TGoalCreate
export type TGoalDelete = TGoalCreate
