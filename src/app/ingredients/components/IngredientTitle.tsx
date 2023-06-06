import styled from 'styled-components'
import { ReactNode } from 'react'

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  padding: 24px;

  .main-title {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 12px;
  }

  .sub-title {
    font-size: 24px;
    font-weight: bold;
    color: var(--primary-green);
  }

  @media screen and (max-width: 600px) {
    .main-title {
      font-size: 24px;
    }

    .sub-title {
      font-size: 16px;
    }
  }
`

const DescriptionWrapper = styled.div`
  line-height: 1.2em;
`

type TItleProps = {
  children: ReactNode
  mainTitle: string
  subTitle: string
}

export default function IngredientTitle({ children, mainTitle, subTitle }: TItleProps) {
  return (
    <TitleWrapper>
      <div className="main-title">
        재료 소개 : { mainTitle }
      </div>
      <div className="sub-title">
        { subTitle }
      </div>
      <DescriptionWrapper>
        {children}
      </DescriptionWrapper>
    </TitleWrapper>
  )
}