'use client'

import { useState, useEffect } from "react"

import { IngredientTypes } from "@/types/types"

import IngredientItem from "@/app/components/IngredientItem"
import IngredientWrapper from "@/app/components/IngredientWrapper"
import IngredientTitle from "../components/IntredientTitle"
import Loading from "@/app/components/Loading"

export default function PageSauce() {
  const [sauces, setSauces] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSauces()
  }, [])

  const getSauces = async () => {
    try {
      const response = await fetch('/api/ingredients?type=sauce')
      const data = await response.json()

      setSauces(data)
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
            sauces.map((sauce: IngredientTypes) => (
              <IngredientItem key={sauce.id} ingredient={sauce} />
            ))
          }
        </IngredientWrapper>
      }
    </IngredientTitle>
  )
}