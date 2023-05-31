export type MenuTypes = {
  id: number
  title: string
  image: string
  description: string | null
  kcal : number
}

export type IngredientTypes = {
  id: number
  title: string
  image: string
  description: string | null
  kcal: number
  type: string
}

export type CombinationTypes = {
  id: number
  menu: MenuTypes
  menuId: number
  ingredients: IngredientTypes[]
}