import styled from 'styled-components'
import { useState, useEffect } from 'react'

import { IngredientTypes } from '@/types/types'
import Loading from '../components/Loading'
import IngredientItem from '../components/IngredientItem'
import IngredientWrapper from '../components/IngredientWrapper'

import { getMenus } from '@/lib/util/getMenus'
import { getIngredients } from '@/lib/util/getIngredients'

const SwiperInner = styled.div`
  height: 90%;
  width: 100%;
  max-width: calc(100% - 24px);
  position: relative;
  display: flex;
  flex-direction: column;

  .usage-step {
    color: var(--primary-green);
    font-size: 24px;
    font-weight: bold;
  }

  .usage-title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 6px;
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
    .usage-step {
      font-size: 16px;
    }

    .usage-title {
      font-size: 20px;
    }

    .usage-content {
      line-height: 1.2em;
    }
  }
`

export const UsageMenu = () => {
  const [menus, setMenus] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const data = await getMenus()

        setMenus(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    fetchMenuData()
  }, [])

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
          <IngredientWrapper>
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
    const fetchBreadData = async () => {
      try {
        const data = await getIngredients('bread')

        setBreads(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    fetchBreadData()
  }, [])

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
          <IngredientWrapper>
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
    const fetchCheeseData = async () => {
      try {
        const data = await getIngredients('cheese')

        setCheeses(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    fetchCheeseData()
  }, [])


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
          <IngredientWrapper extraClass='cheese'>
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
    const fetchVegetablesData = async () => {
      try {
        const data = await getIngredients('vegetable')

        setVegetables(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    fetchVegetablesData()
  }, [])


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
          <IngredientWrapper>
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
    const fetchSaucesData = async () => {
      try {
        const data = await getIngredients('sauce')
        

        setSauces(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    fetchSaucesData()
  }, [])

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
          <IngredientWrapper>
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
    const fetchSetsData = async () => {
      try {
        const data = await getIngredients('set')


        setSets(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    fetchSetsData()
  }, [])

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
          <IngredientWrapper>
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