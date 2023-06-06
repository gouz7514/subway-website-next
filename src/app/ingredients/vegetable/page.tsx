'use client'

import { useState, useEffect } from "react"

import { IngredientTypes } from "@/types/types"

import IngredientItem from "@/app/components/IngredientItem"
import IngredientWrapper from "@/app/components/IngredientWrapper"
import Loading from "@/app/components/Loading"

import IngredientTitle from "../components/IngredientTitle"

import { getIngredients } from "@/lib/util/api"
import { useQuery } from "@tanstack/react-query"

export default function PageVegetables() {
  const [vegetables, setVegetables] = useState([])
  
  const { data: ingredientData, isLoading } = useQuery({
    queryKey: ['ingredients'],
    queryFn: getIngredients,
    staleTime: 1000 * 60 * 5
  })

  useEffect(() => {
    if (ingredientData) {
      const data = ingredientData.filter((ingredient: IngredientTypes) => ingredient.type === 'vegetable')
      setVegetables(data)
    }
  }, [ingredientData])

  return (
    <IngredientTitle mainTitle="야채" subTitle="신선하고 다양한 써브웨이의 야채!">
      { isLoading ? 
        <Loading /> :
        <IngredientWrapper>
          {
            vegetables.map((vegetable: IngredientTypes) => (
              <IngredientItem key={vegetable.id} ingredient={vegetable} />
            ))
          }
        </IngredientWrapper>
      }
    </IngredientTitle>
  )
}