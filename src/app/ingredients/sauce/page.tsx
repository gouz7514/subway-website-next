'use client'

import { useState, useEffect } from "react"

import { IngredientTypes } from "@/types/types"

import IngredientItem from "@/app/components/IngredientItem"
import IngredientWrapper from "@/app/components/IngredientWrapper"
import IngredientTitle from "../components/IntredientTitle"
import Loading from "@/app/components/Loading"
import { getIngredients } from "@/lib/util/getIngredients"

export default function PageSauce() {
  const [sauces, setSauces] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSauceData = async () => {
      try {
        const data = await getIngredients('sauce')
        setSauces(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    fetchSauceData()
  }, [])

  return (
    <IngredientTitle mainTitle="소스" subTitle="뭘 먹어야할지 모르겠다면 '추천해주세요!'">
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