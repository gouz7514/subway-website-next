export const getMenus = async () => {
  const response = await fetch('/api/menus')
  const data = await response.json()
  return data
}