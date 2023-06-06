'use client'

import { useState, useEffect } from "react"

import { IngredientTypes } from "@/types/types"

import IngredientItem from "@/app/components/IngredientItem"
import IngredientWrapper from "@/app/components/IngredientWrapper"
import IngredientTitle from "../components/IntredientTitle"
import Loading from "@/app/components/Loading"

import { getIngredients } from "@/lib/util/getIngredients"
import { useQuery } from '@tanstack/react-query'

export default function PageBread() {
  const [breads, setBreads] = useState([])

  const { data: ingredientData, isLoading } = useQuery({
    queryKey: ['ingredients'],
    queryFn: getIngredients,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 5
  })

  useEffect(() => {
    if (ingredientData) {
      const data = ingredientData.filter((ingredient: IngredientTypes) => ingredient.type === 'bread')
      setBreads(data)
    }
  }, [ingredientData])

  return (
    <IngredientTitle mainTitle="빵" subTitle="매장에서 직접 구운 6가지 빵을 소개합니다">
      { isLoading ? 
        <Loading /> :
        <IngredientWrapper>
          {
            breads.map((bread: IngredientTypes) => (
              <IngredientItem key={bread.id} ingredient={bread} />
            ))
          }
        </IngredientWrapper>
      }
    </IngredientTitle>
  )
}