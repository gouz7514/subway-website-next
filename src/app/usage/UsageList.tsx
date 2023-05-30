import styled from 'styled-components'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const SwiperInner = styled.div`
  height: 90%;
  width: 100%;
  max-width: calc(100% - 48px);
  margin: 24px;
  padding: 40px;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  position: relative;
  display: flex;
  flex-direction: column;

  .usage-step {
    color: var(--primary-green);
    font-size: 28px;
    font-weight: bold;
  }

  .usage-title {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 24px;
  }

  .usage-content {
    word-break: keep-all;
    line-height: 1.5em;
    flex: 1;
    height: 50%;

    .usage-content-extra {
      margin-top: 12px;
      font-size: 0.8em;
    }
  }

  @media screen and (max-width: 600px) {
    padding: 24px;
  }
`

const ItemWrapper = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, 1fr);
  height: 90%;
  overflow: auto;
  padding: 12px 6px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }

  .item {
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    height: 400px;
    position: relative;

    .item-image {
      text-align: center;
      height: 70%;
      position: relative;
    }

    .item-content {
      padding: 12px;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
      height: 30%;

      .item-title {
        font-size: 1.2em;
        font-weight: bold;
      }

      .item-description {
        font-size: 0.9em;
      }

      .item-kcal {
        font-size: 1.1em;
        color: var(--primary-yellow);
        font-weight: bold;
      }
    }

    @media screen and (max-width: 600px) {
      height: 380px;

      .item-image {
        height: 240px;
        transform: scale(0.9);
      }

      .item-content {
        height: 140px;;
      }
    }
  }
`

export const UsageMenu = () => {
  const [menus, setMenus] = useState([])

  useEffect(() => {
    getMenus()
  }, [])

  const getMenus = async () => {
    try {
      const response = await fetch('/api/menus')
      const data = await response.json()
  
      setMenus(data)
    } catch (error) {
      console.error(error)
    }
  }

  

  return (
    <SwiperInner>
      <div className="usage-step">
        STEP 1
      </div>
      <div className="usage-title">
        메뉴 선택
      </div>
      <div className="usage-content">
        <div>
          원하는 메뉴를 선택하세요!
        </div>
        <div>
          샌드위치 (15cm 또는 30cm)와<br />
        </div>
        <div>
          샐러드 중 선택 가능합니다.
        </div>
        <ItemWrapper className="item-wrapper">
          {
            menus.map((menu: any) => (
              <div key={menu.id} className="item">
                <div className="item-image">
                  <Image
                    src={menu.image}
                    alt={menu.title}
                    fill
                    sizes="100%"
                  />
                </div>
                <div className="item-content">
                  <div className="item-title">
                    { menu.title}
                  </div>
                  <div className='item-description'>
                    { menu.description }
                  </div>
                  <div className='item-kcal'>
                    { menu.kcal } kcal
                  </div>
                </div>
              </div>
            ))
          }
        </ItemWrapper>
      </div>
    </SwiperInner>
  )
}

export const UsageBread = () => {
  return (
    <SwiperInner>
      <div className="usage-step">
        STEP 2
      </div>
      <div className="usage-title">
        빵 선택
      </div>
      <div className="usage-content">
        <div>
          원하는 빵을 선택하세요!
        </div>
        <div>
          추가비용 없이 6가지 빵 중 선택 가능합니다.
        </div>
      </div>
    </SwiperInner>
  )
}

export const UsageCheese = () => {
  return (
    <SwiperInner>
      <div className="usage-step">
        STEP 3
      </div>
      <div className="usage-title">
        치즈 선택
      </div>
      <div className="usage-content">
        <div>
          치즈 또한 원하는 대로 선택 가능합니다.
        </div>
        <div className="usage-content-extra">
          (추가 시 : 15cm : 1,400원 / 30cm : 2,800원)
        </div>
      </div>
    </SwiperInner>
  )
}

export const UsageVegetable = () => {
  return (
    <SwiperInner>
      <div className="usage-step">
        STEP 4
      </div>
      <div className="usage-title">
        야채 선택
      </div>
      <div className="usage-content">
        <div>
          원하지 않는 채소는 빼고, 원하는 채소는 더해보세요!
        </div>
      </div>
    </SwiperInner>
  )
}

export const UsageExtra = () => {
  return (
    <SwiperInner>
      <div className="usage-step">
        STEP 5
      </div>
      <div className="usage-title">
        소스 선택
      </div>
      <div className="usage-content">
        <div>
          가격 차이 없이 원하는 소스를 마음껏 선택하세요!
        </div>
      </div>
    </SwiperInner>
  )
}

export const UsageSet = () => {
  return (
    <SwiperInner>
      <div className="usage-step">
        STEP 6
      </div>
      <div className="usage-title">
        세트 선택
      </div>
      <div className="usage-content">
        <div>
          샌드위치만으로 부족하다면 쿠키와 음료까지!
        </div>
      </div>
    </SwiperInner>
  )
}