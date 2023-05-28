'use client'

import Link from 'next/link'
import styled from 'styled-components'



const IngredientsList = styled.div`
  display: flex;
  height: calc(100vh - 100px);

  .ingredient-grid {
    display: grid;
    grid-template-columns: repeat(2, 450px);
    grid-template-rows: repeat(2, 450px);
    gap: 24px;
    padding: 24px;
    max-width: 1024px;
    margin: auto;
    justify-content: center;

    @media screen and (max-width: 1024px) {
      grid-template-columns: repeat(2, 300px);
      grid-template-rows: repeat(2, 300px);
    }

    @media screen and (max-width: 680px) {
      grid-template-columns: repeat(1, 320px);
      grid-template-rows: repeat(4, 320px);
    }
  }

  .ingredient-list {
    border: 1px solid black;
    height: 100%;
    border-radius: 12px;
    padding: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export default function PageIngredients() {
  return (
    <>
      <IngredientsList>
        <div className="ingredient-grid">
          <Link href="/ingredients/bread" className="ingredient-list">
            <div className="ingredient-item">
              <h2 className="ingredient-item-title">
                빵
              </h2>
            </div>
          </Link>
          <Link href="/ingredients/cheese" className="ingredient-list">
            <div className="ingredient-item">
              <h2 className="ingredient-item-title">
              치즈
              </h2>
            </div>
          </Link>
          <Link href="/ingredients/sauce" className="ingredient-list">
            <div className="ingredient-item">
              <h2 className="ingredient-item-title">
                소스
              </h2>
            </div>
          </Link>
          <Link href="/ingredients/vegetable" className="ingredient-list">
            <div className="ingredient-item">
              <h2 className="ingredient-item-title">
                채소
              </h2>
            </div>
          </Link>
        </div>
      </IngredientsList>
    </>
  )
}