'use client'

import styled from 'styled-components'
import { useState, useEffect } from "react"
import { CombinationTypes } from '@/types/types'
import CombinationItem from '../components/CombinationItem'
import Loading from '../components/Loading'

const CombinationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 24px;

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

  .combination-list {
    margin-top: 24px;
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(2, 1fr);

    @media screen and (max-width: 1024px) {
      grid-template-columns: repeat(1, 1fr);
    }

    @media screen and (max-width: 600px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}`

export default function PageCombination() {
  const [combinations, setCombinations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCombinations()
  }, [])

  const getCombinations = async () => {
    try {
      const response = await fetch('/api/combinations')
      const data = await response.json()
      console.log(data)

      setCombinations(data)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
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
      <div className="combination-list">
        {
          loading ?
          <Loading /> :
          combinations.map((combination: CombinationTypes) => (
            <CombinationItem key={combination.id} combination={combination} />
          ))
        }
      </div>
    </CombinationWrapper>
  )
}