import styled from 'styled-components'
import { ReactNode } from 'react'

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  padding: 24px;
`

const DescriptionWrapper = styled.div`
  margin-top: 24px;
  line-height: 1.5em;
`

type TItleProps = {
  children: ReactNode
}

export default function IngredientTitle({ children }: TItleProps) {
  return (
    <TitleWrapper>
      <DescriptionWrapper>
        {children}
      </DescriptionWrapper>
    </TitleWrapper>
  )
}