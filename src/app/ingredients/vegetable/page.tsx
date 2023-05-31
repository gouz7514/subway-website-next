'use client'

import { useState, useEffect } from "react"

import { IngredientTypes } from "@/types/types"

import IngredientItem from "@/app/components/IngredientItem"
import IngredientWrapper from "@/app/components/IngredientWrapper"
import IngredientTitle from "../components/IntredientTitle"
import Loading from "@/app/components/Loading"

export default function PageVegetables() {
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
    <IngredientTitle>
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