'use client'

import { useState, useEffect } from "react"
import styled from "styled-components"
import { MenuTypes, IngredientTypes } from "@/types/types"

const CombinationFormWrapper = styled.div`
  width: 100%;
  margin: 12px auto;
  max-width: 1024px;
  padding: 24px;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  .combination-form-title {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 12px;
  }

  .combination-form-section {
    .combination-form-item-title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 12px;
    }
  }
`

export default function CombinationForm() {
  const [menus, setMenus] = useState([])
  const [ingredients, setIngredients] = useState([])

  const [selectedCheese, setSelectedCheese] = useState(0)
  const [selectedSauce, setSelectedSauce] = useState(0)

  // 선택된 결과를 모아놓는 배열
  const [selectedCombinations, setSelectedCombinations] = useState<{
    menu: number
    bread: number
    cheese: number[]
    sauce: number[]
  }>({
    menu: 0,
    bread: 0,
    cheese: [],
    sauce: []
  });
  

  const handleOptionSelect = (option: string, id: number) => {
    switch (option) {
      case 'menu':
        setSelectedCombinations((prevState) => ({
          ...prevState,
          menu: id
        }))
        break
      case 'bread':
        setSelectedCombinations((prevState) => ({
          ...prevState,
          bread: id
        }))
        break
      case 'cheese':
        setSelectedCheese(id)
        setSelectedCombinations((prevState) => {
          const newState = { ...prevState }
          if (newState.cheese.length >= 2) {
            newState.cheese.shift()
            newState.cheese.push(id)
          } else {
            newState.cheese.push(id)
          }
          return newState
        })
        break
      case 'sauce':
        setSelectedSauce(id)
        setSelectedCombinations((prevState) => {
          const newState = { ...prevState }
          if (newState.sauce.length >= 2) {
            newState.sauce.shift()
            newState.sauce.push(id)
          } else {
            newState.sauce.push(id)
          }
          return newState
        })
        break
      default:
        break
    }
  }

  useEffect(() => {
    Promise.all([getMenus(), getIngredients()])
    .catch((err) => console.log(err))
  }, [])

  const getMenus = async () => {
    try {
      const res = await fetch('/api/menus')
      const data = await res.json()
      setMenus(data)
    } catch (err) {
      console.log(err)
    }
  }

  const getIngredients = async () => {
    try {
      const res = await fetch('/api/ingredients')
      const data = await res.json()
      setIngredients(data)
    } catch (err) {
      console.log(err)
    }
  }

  const submitCombination = async () => {
    try {
      const combinationData = {
        menu: selectedCombinations.menu,
        ingredients: [
          selectedCombinations.bread, ...selectedCombinations.cheese, ...selectedCombinations.sauce
        ]
      }

      const res = await fetch('/api/combinations', {
        method: 'POST',
        body: JSON.stringify(combinationData)
      })
      const data = await res.json()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <CombinationFormWrapper>
      <section className="combination-form-section">
        <div className="combination-form-title">
          조합 추가하기
        </div>
        <div className="combination-form-subtitle">
          나만 알고 있는 써브웨이의 조합을 추가해보세요!
        </div>
      </section>
      <section className="combination-form-section">
        <div className="combination-form-item-title">
          메뉴
          <div className="combination-selector menu">
            <select value={selectedCombinations.menu} onChange={(e) => handleOptionSelect('menu', parseInt(e.target.value))}>
              {
                menus.map((menu: MenuTypes) => (
                  <option key={menu.id} value={menu.id}>{menu.title}</option>
                )
                )
              }
            </select>
          </div>
        </div>
        <div className="combination-form-item-title">
          빵
          <div className="combination-selector bread">
            <select value={selectedCombinations.bread} onChange={(e) => handleOptionSelect('bread', parseInt(e.target.value))}>
              {
                ingredients.filter((ingredient: IngredientTypes) => ingredient.type === 'bread')
                  .map((ingredient: IngredientTypes) => (
                    <option key={ingredient.id} value={ingredient.id}>{ingredient.title}</option>
                  ))
              }
            </select>
          </div>
        </div>
        <div className="combination-form-item-title">
          치즈
          <div className="combination-selector cheese">
            <select value={selectedCheese} onChange={(e) => handleOptionSelect('cheese', parseInt(e.target.value))}>
              {
                ingredients.filter((ingredient: IngredientTypes) => ingredient.type === 'cheese')
                  .map((ingredient: IngredientTypes) => (
                    <option key={ingredient.id} value={ingredient.id}>{ingredient.title}</option>
                  ))
              }
            </select>
          </div>
        </div>
        <div className="combination-form-item-title">
          소스
          <div className="combination-selector sauce">
            <select value={selectedSauce} onChange={(e) => handleOptionSelect('sauce', parseInt(e.target.value))}>
              {
                ingredients.filter((ingredient: IngredientTypes) => ingredient.type === 'sauce')
                  .map((ingredient: IngredientTypes) => (
                    <option key={ingredient.id} value={ingredient.id}>{ingredient.title}</option>
                  ))
              }
            </select>
          </div>
        </div>
      </section>
      <section className="combination-form-result">
        <div>
          현재 선택 결과
        </div>
        <div>
          <div>
            메뉴: {selectedCombinations.menu}
          </div>
          <div>
            빵: {selectedCombinations.bread}
          </div>
          <div>
            치즈:
            {
              selectedCombinations.cheese.map((cheese) => (
                <span key={cheese}>{cheese}</span>
              ))
            }
          </div>
          <div>
            소스:
            {
              selectedCombinations.sauce.map((sauce) => (
                <span key={sauce}>{sauce}</span>
              ))
            }
          </div>
        </div>
      </section>
      <section className="combination-form-submit">
        <button onClick={submitCombination}>
          제출하기
        </button>
      </section>
    </CombinationFormWrapper>
  )
}