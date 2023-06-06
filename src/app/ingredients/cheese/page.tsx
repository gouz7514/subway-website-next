'use client'

import { useState, useEffect } from "react"

import { IngredientTypes } from "@/types/types"

import IngredientItem from "@/app/components/IngredientItem"
import IngredientWrapper from "@/app/components/IngredientWrapper"
import IngredientTitle from "../components/IntredientTitle"
import Loading from "@/app/components/Loading"

import { getIngredients } from "@/lib/util/getIngredients"
import { useQuery } from "@tanstack/react-query"

export default function PageCheese() {
  const [cheeses, setCheeses] = useState([])

  const { data: ingredientData, isLoading } = useQuery({
    queryKey: ['ingredients'],
    queryFn: getIngredients,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 5
  })

  useEffect(() => {
    if (ingredientData) {
      const data = ingredientData.filter((ingredient: IngredientTypes) => ingredient.type === 'cheese')
      setCheeses(data)
    }
  }, [ingredientData])

  return (
    <IngredientTitle mainTitle="치즈" subTitle="3가지 치즈 중 입맛대로 골라보세요!">
      { isLoading ? 
        <Loading /> :
        <IngredientWrapper>
          {
            cheeses.map((cheese: IngredientTypes) => (
              <IngredientItem key={cheese.id} ingredient={cheese} />
            ))
          }
        </IngredientWrapper>
      }
    </IngredientTitle>
  )
}