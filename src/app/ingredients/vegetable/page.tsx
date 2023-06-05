'use client'

import { useState, useEffect } from "react"

import { IngredientTypes } from "@/types/types"

import IngredientItem from "@/app/components/IngredientItem"
import IngredientWrapper from "@/app/components/IngredientWrapper"
import IngredientTitle from "../components/IntredientTitle"
import Loading from "@/app/components/Loading"
import { getIngredients } from "@/lib/util/getIngredients"

export default function PageVegetables() {
  const [vegetables, setVegetables] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVegetableData = async () => {
      try {
        const data = await getIngredients('vegetable')
        setVegetables(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    fetchVegetableData()
  }, [])

  return (
    <IngredientTitle mainTitle="야채" subTitle="신선하고 다양한 써브웨이의 야채!">
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
    </IngredientTitle>
  )
}