export const getMenus = async () => {
  const response = await fetch('/api/menus')
  const data = await response.json()
  return data
}

export const getIngredients = async () => {
  const response = await fetch('/api/ingredients')
  const data = await response.json()
  return data
}

export const getCombinations = async () => {
  const response = await fetch('/api/combinations')
  const data = await response.json()
  return data
}