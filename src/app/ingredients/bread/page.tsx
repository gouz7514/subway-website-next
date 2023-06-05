'use client'

import { useState, useEffect } from "react"

import { IngredientTypes } from "@/types/types"

import IngredientItem from "@/app/components/IngredientItem"
import IngredientWrapper from "@/app/components/IngredientWrapper"
import IngredientTitle from "../components/IntredientTitle"
import Loading from "@/app/components/Loading"
import { getIngredients } from "@/lib/util/getIngredients"

export default function PageBread() {
  const [breads, setBreads] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBreadData = async () => {
      try {
        const data = await getIngredients('bread')
        setBreads(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    fetchBreadData()
  }, [])

  return (
    <IngredientTitle mainTitle="빵" subTitle="매장에서 직접 구운 6가지 빵을 소개합니다">
      { loading ? 
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