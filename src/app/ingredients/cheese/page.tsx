'use client'

import { useState, useEffect } from "react"

import { IngredientTypes } from "@/types/types"

import IngredientItem from "@/app/components/IngredientItem"
import IngredientWrapper from "@/app/components/IngredientWrapper"
import IngredientTitle from "../components/IntredientTitle"
import Loading from "@/app/components/Loading"

export default function PageCheese() {
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
    <IngredientTitle mainTitle="치즈" subTitle="3가지 치즈 중 입맛대로 골라보세요!">
      { loading ? 
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