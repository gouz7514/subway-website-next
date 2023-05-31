import styled from 'styled-components'
import { useState, useEffect } from 'react'
import Image from 'next/image'

import { IngredientTypes } from '@/types/types'
import Loading from '../components/Loading'
import IngredientItem from '../components/IngredientItem'

const SwiperInner = styled.div`
  height: 90%;
  width: 100%;
  max-width: calc(100% - 48px);
  margin: 24px;
  padding: 24px;
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
    margin-bottom: 12px;
  }

  .usage-content {
    word-break: keep-all;
    line-height: 1.3em;
    flex: 1;
    height: 50%;
    overflow: hidden;

    .usage-content-extra {
      margin-top: 6px;
      font-size: 0.8em;
    }
  }

  @media screen and (max-width: 600px) {
    padding: 12px;

    .usage-step {
      font-size: 20px;
    }

    .usage-title {
      font-size: 24px;
    }

    .usage-content {
      line-height: 1.2em;
    }
  }
`

const IngredientWrapper = styled.div`
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
    grid-template-rows: repeat(2, 0.5fr);
  }
`

export const UsageMenu = () => {
  const [menus, setMenus] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMenus()
  }, [])

  const getMenus = async () => {
    try {
      const response = await fetch('/api/menus')
      const data = await response.json()
  
      setMenus(data)
      setLoading(false)
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
        { loading ?
          <Loading /> :
          <IngredientWrapper className="item-wrapper">
            {
              menus.map((menu: IngredientTypes) => (
                <IngredientItem key={menu.id} ingredient={menu} />
              ))
            }
          </IngredientWrapper>
        }
      </div>
    </SwiperInner>
  )
}

export const UsageBread = () => {
  const [breads, setBreads] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBreads()
  }, [])

  const getBreads = async () => {
    try {
      const response = await fetch('/api/ingredients?type=bread')
      const data = await response.json()

      setBreads(data)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

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
        { loading ? 
          <Loading /> :
          <IngredientWrapper className="item-wrapper">
            {
              breads.map((bread: IngredientTypes) => (
                <IngredientItem key={bread.id} ingredient={bread} />
              ))
            }
          </IngredientWrapper>
        }
      </div>
    </SwiperInner>
  )
}

export const UsageCheese = () => {
  const [cheeses, setCheeses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCheeses()
  }, [])

  const getCheeses = async () => {
    try {
      const response = await fetch('/api/ingredients?type=cheese')
      const data = await response.json()

      setCheeses(data)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }


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
        { loading ?
          <Loading /> :
          <IngredientWrapper className="item-wrapper cheese">
            {
              cheeses.map((cheese: IngredientTypes) => (
                <IngredientItem key={cheese.id} ingredient={cheese} />
              ))
            }
          </IngredientWrapper>
        }
      </div>
    </SwiperInner>
  )
}

export const UsageVegetable = () => {
  const [vegetables, setVegetables] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getVegetables()
  }, [])

  const getVegetables = async () => {
    try {
      const response = await fetch('/api/ingredients?type=vegetable')
      const data = await response.json()

      setVegetables(data)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }


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
        { loading ?
          <Loading /> :  
          <IngredientWrapper className="item-wrapper">
            {
              vegetables.map((vegetable: IngredientTypes) => (
                <IngredientItem key={vegetable.id} ingredient={vegetable} />
              ))
            }
          </IngredientWrapper>
        }
      </div>
    </SwiperInner>
  )
}

export const UsageSauce = () => {
  const [sauces, setSauces] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSauces()
  }, [])

  const getSauces = async () => {
    try {
      const response = await fetch('/api/ingredients?type=sauce')
      const data = await response.json()

      setSauces(data)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

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
        { loading ?
          <Loading /> :
          <IngredientWrapper className="item-wrapper">
            {
              sauces.map((sauce: IngredientTypes) => (
                <IngredientItem key={sauce.id} ingredient={sauce} />
              ))
            }
          </IngredientWrapper>
        }
      </div>
    </SwiperInner>
  )
}

export const UsageSet = () => {
  const [sets, setSets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSets()
  }, [])

  const getSets = async () => {
    try {
      const response = await fetch('/api/ingredients?type=set')
      const data = await response.json()

      setSets(data)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

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
        { loading ?
          <Loading /> :  
          <IngredientWrapper className="item-wrapper">
            {
              sets.map((set: IngredientTypes) => (
                <IngredientItem key={set.id} ingredient={set} />
              ))
            }
          </IngredientWrapper>
        }
      </div>
    </SwiperInner>
  )
}