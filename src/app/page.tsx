'use client'

import styled from "styled-components"
import Link from 'next/link'

const Intro = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: calc(100vh - var(--height-header));

  .intro-text {
    font-size: 2em;
    font-weight: bold;
    margin: 24px 0;

    @media screen and (max-width: 1024px) {
      font-size: 1.2em;
    }
  }

  .intro-list {
    display: flex;
    gap: 12px;
    align-items: center;
    transition: transform 0.3s ease-in-out;

    .intro-link {
      border-radius: 12px;

      &:first-child {
        background: radial-gradient(ellipse farthest-corner at 90% 90%, #ff723a, #ff506e);
      }

      &:nth-child(2) {
        background: radial-gradient(ellipse farthest-corner at 90% 90%, #00e244, #00b48e);
      }

      &:last-child {
        background: radial-gradient(ellipse farthest-corner at 90% 90%, #882ef0, rgba(80, 115, 255, 0.8));
      }

      &:hover {
        transform: translateY(-6px);
        transition: transform 0.3s ease-in-out;
      }
    }

    .intro-item {
      width: 300px;
      height: 300px;
      border-radius: 12px;
      padding: 18px;
      color: white;
      cursor: pointer;

      .intro-item-title {
        margin-bottom: 12px;
      }

      @media screen and (max-width: 450px) {
        width: 260px;
        height: 260px;
      }
    }

    @media screen and (max-width: 1024px) {
      flex-direction: column;
    }
  }

  @media screen and (min-width: 1024px) {
    min-height: calc(100vh - 72px);
  }
`

export default function Home() {
  return (
    <main>
      <Intro>
        <div className="intro-text">
          SUBHOW와 함께 써브웨이를 즐기세요!
        </div>
        <div className="intro-list">
          <Link href="/usage" className="intro-link">
            <div className="intro-item">
              <div className="intro-item-title">
                <h3>
                  사용 방법
                </h3>
              </div>
              <div className="intro-item-description">
                <span>
                  알고 보면 쉬워요!<br />
                  써브웨이 주문 방법 알려드려요
                </span>
              </div>
            </div>
          </Link>
          <Link href="/ingredients" className="intro-link">
            <div className="intro-item">
              <div className="intro-item-title">
                <h3>
                  재료 소개
                </h3>
              </div>
              <div className="intro-item-description">
                <span>
                  건강과 맛을 동시에!<br />
                  빵부터 쿠키까지 소개해드려요
                </span>
              </div>
            </div>
          </Link>
          <Link href="/combination" className="intro-link">
            <div className="intro-item">
              <div className="intro-item-title">
                <h3>
                  조합 추천
                </h3>
              </div>
              <div className="intro-item-description">
                <span>
                  매일 같은 메뉴는 그만!<br />
                  숨겨진 꿀조합을 추천해드려요
                </span>
              </div>
            </div>
        
          </Link>
        </div>
      </Intro>
    </main>
  )
}
