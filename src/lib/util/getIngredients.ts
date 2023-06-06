export const getIngredients = async () => {
  const response = await fetch('/api/ingredients')
  const data = await response.json()
  return data
}