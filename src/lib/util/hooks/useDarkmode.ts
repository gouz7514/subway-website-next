import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/store/store'
import { setTheme, ThemeState } from '@/store/theme/theme'

type Theme = 'light' | 'dark'

export const useDarkMode = (): [string, () => void] => {
  const dispatch = useDispatch()
  const themeState = useSelector<RootState, ThemeState>(state => state.theme)

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme') as Theme | null

    dispatch(setTheme(localTheme || 'light'))
    window.localStorage.setItem('theme', localTheme || 'light')
  }, [dispatch])

  const toggleTheme = () => {
    const newTheme = themeState.value === 'light' ? 'dark' : 'light'
    window.localStorage.setItem('theme', newTheme)
    document.body.style.setProperty('transition', 'background-color 0.3s ease')
    document.body.dataset.theme = newTheme
    dispatch(setTheme(newTheme))
  };

  return [themeState.value, toggleTheme]
};
