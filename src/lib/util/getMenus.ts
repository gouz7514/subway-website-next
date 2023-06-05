import { cache } from 'react'

export const getMenus = cache(async () => {
  const response = await fetch('/api/menus')
  const data = await response.json()
  return data
})