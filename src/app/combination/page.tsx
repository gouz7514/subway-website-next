'use client'

import styled from 'styled-components'
import { useState, useEffect } from "react"
import { CombinationTypes } from '@/types/types'
import CombinationItem from '@/app/components/CombinationItem'
import Loading from '@/app/components/Loading'
import Link from 'next/link'

import { getCombinations } from '@/lib/util/api'
import { useQuery } from '@tanstack/react-query'

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
    line-height: 1.5em;

    .combination-form-link {
      margin-top: 12px;
      color: var(--primary-green);
      font-weight: bold;
      text-decoration: underline;
    }
  }

  .combination-list {
    margin-top: 24px;
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(2, 1fr);
    position: relative;
    min-height: 300px;

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

  const { data: combinationData, isLoading } = useQuery({
    queryKey: ['combinations'],
    queryFn: getCombinations,
    staleTime: 1000 * 60 * 5
  })

  useEffect(() => {
    if (combinationData) {
      setCombinations(combinationData)
    }
  }, [combinationData])

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
        <div className="combination-form-link">
          <Link href="/combination/form">
            <span>
              나만의조합 추가하기 →
            </span>
          </Link>
        </div>
      </div>
      <div className="combination-list">
        {
          isLoading ?
          <Loading /> :
          combinations.map((combination: CombinationTypes, idx: number) => (
            <CombinationItem key={combination.id} combination={combination} idx={idx} />
          ))
        }
      </div>
    </CombinationWrapper>
  )
}