import styled from 'styled-components'
import { useDarkMode } from '@/lib/util/hooks/useDarkmode'
import Icon from './Icon'
import { IconSun } from './icon/IconSun'
import { IconMoon } from './icon/IconMoon'

const DarkModeStyle = styled.div`
  width: 26px;
  height: 26px;
  cursor: pointer;
`

export default function DarkMode() {
  const [theme, toggleTheme] = useDarkMode()

  return (
    <DarkModeStyle onClick={toggleTheme}>
      <Icon icon={theme === 'light' ? <IconSun /> : <IconMoon /> }  />
    </DarkModeStyle>
  )
}