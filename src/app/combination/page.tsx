'use client'

import styled from 'styled-components'

const CombinationWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  padding: 24px;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;

  .title {
    margin-bottom: 24px;
    font-weight: bold;
    font-size: 2em;

    @media screen and (max-width: 680px) {
      font-size: 1.5em;
    }
  }

  .combination-description {
    line-height: 15.em;
  }
}`

export default function PageCombination() {
  return (
    <div className="container">
      <CombinationWrapper>
        <div className="title">
          <span>
            누구도 알려주지 않는<br />
          </span>
          <span>
            써브웨이의 꿀조합!
          </span>
        </div>
        <div className="combination-description">
          <div>
            다양한 메뉴와 소스로 만드는 써브웨이!
          </div>
          <div>
            이렇게 먹으면 더 맛있을지도?
          </div>
        </div>
      </CombinationWrapper>
    </div>
  )
}