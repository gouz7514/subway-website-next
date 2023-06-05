import { cache } from 'react'

export const getIngredients = cache(async (ingredient?: string) => {
  const response = await fetch(ingredient ? `/api/ingredients?type=${ingredient}` : `/api/ingredients`)
  const data = await response.json()
  return data
})