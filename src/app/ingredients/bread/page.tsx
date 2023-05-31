'use client'

import { useState, useEffect } from "react"

import { IngredientTypes } from "@/types/types"

import IngredientItem from "@/app/components/IngredientItem"
import IngredientWrapper from "@/app/components/IngredientWrapper"
import IngredientTitle from "../components/IntredientTitle"
import Loading from "@/app/components/Loading"

export default function PageBread() {
  const [breads, setBreads] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBreads()
  }, [])

  const getBreads = async () => {
    try {
      const response = await fetch('/api/ingredients?type=bread')
      const data = await response.json()

      setBreads(data)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

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