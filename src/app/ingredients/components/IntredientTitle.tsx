import styled from 'styled-components'
import { ReactNode } from 'react'

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  padding: 24px;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
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
    <div className="container">
      <TitleWrapper>
        <DescriptionWrapper>
          {children}
        </DescriptionWrapper>
      </TitleWrapper>
    </div>
  )
}