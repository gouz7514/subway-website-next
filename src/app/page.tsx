'use client'

import styled from "styled-components"

const Intro = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 24px;
  height: 100%;

  .intro-text {
    font-size: 2em;
    font-weight: bold;

    @media screen and (max-width: 768px) {
      font-size: 1.2em;
    }
  }

  .intro-list {
    display: flex;
    gap: 12px;
    align-items: center;

    @media screen and (max-width: 768px) {
      flex-direction: column;
    }

    .intro-menu {
      width: 220px;
      height: 220px;
      border: 1px solid black;
    }
  }

  @media screen and (min-width: 768px) {
    min-height: calc(100vh - 72px);
  }
`

export default function Home() {
  return (
    <main>
      <Intro>
        <div className="intro-text">
          SUBHOW와 함께 써브웨이를 즐기세요!
          <div className="intro-list">
            <div className="intro-menu">
              사용 방법
            </div>
            <div className="intro-menu">
              재료 소개
            </div>
            <div className="intro-menu">
              조합 추천
            </div>
          </div>
        </div>
      </Intro>
    </main>
  )
}
