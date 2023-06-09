'use client'

import { useState, useEffect } from "react"

import { IngredientTypes } from "@/types/types"

import IngredientItem from "@/app/components/IngredientItem"
import IngredientWrapper from "@/app/components/IngredientWrapper"
import Loading from "@/app/components/Loading"

import IngredientTitle from "../components/IngredientTitle"

import { getIngredients } from "@/lib/util/api"
import { useQuery } from "@tanstack/react-query"

export default function PageSauce() {
  const [sauces, setSauces] = useState([])

  const { data: ingredientData, isLoading } = useQuery({
    queryKey: ['ingredients'],
    queryFn: getIngredients,
    staleTime: 1000 * 60 * 5
  })

  useEffect(() => {
    if (ingredientData) {
      const data = ingredientData.filter((ingredient: IngredientTypes) => ingredient.type === 'sauce')
      setSauces(data)
    }
  }, [ingredientData])

  return (
    <IngredientTitle mainTitle="소스" subTitle="뭘 먹어야할지 모르겠다면 '추천해주세요!'">
      { isLoading ? 
        <Loading /> :
        <IngredientWrapper>
          {
            sauces.map((sauce: IngredientTypes) => (
              <IngredientItem key={sauce.id} ingredient={sauce} />
            ))
          }
        </IngredientWrapper>
      }
    </IngredientTitle>
  )
}