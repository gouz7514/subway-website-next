import { ReactNode } from 'react'
import styled from 'styled-components'

const IngredientWrapperStyle = styled.div`
  display: grid;
  gap: 12px;
  height: calc(100% - 60px);
  overflow: auto;
  padding: 12px 6px;
  margin-top: 12px;
  grid-template-columns: repeat(5, 1fr);

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 2000px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: 1500px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }

  &.cheese {
    grid-template-rows: repeat(3, 1fr);
  }
`

type IngredientWrapperProps = {
  children: ReactNode
  extraClass?: string
}

export default function IngredientWrapper({ children, extraClass }: IngredientWrapperProps) {
  return (
    <IngredientWrapperStyle className={ extraClass }>
      {children}
    </IngredientWrapperStyle>
  )
}