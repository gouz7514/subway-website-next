import styled from 'styled-components'
import { IconTypes } from '@/types/types'

const IconWrapper = styled.span<{ width: number, height: number }>`
  display: inline-block;
  svg {
    width: ${(props) => props.width ? `${props.width}px` : 'auto'};
    height: ${(props) => props.height ? `${props.height}px` : 'auto'};
  }
`

export default function Icon({ icon, width = 26, height = 26 }: IconTypes) {
  return (
    <IconWrapper width={width} height={height}>
      { icon }
    </IconWrapper>
  )
}
