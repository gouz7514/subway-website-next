'use client'

import Link from 'next/link'
import styled from 'styled-components'



const IngredientsList = styled.div`
  .ingredient-grid {
    display: grid;
    height: calc(100vh - 100px);
    grid-template-columns: repeat(2, minmax(300px, 600px));
    gap: 24px;
    padding: 24px;
    max-width: 1024px;
    margin: auto;
    justify-content: center;

    @media screen and (max-width: 680px) {
      grid-template-columns: repeat(1, 300px);
      grid-template-rows: repeat(4, 250px);
    }
  }

  .ingredient-list {
    border: 1px solid black;
  }
`

export default function PageIngredients() {
  return (
    <>
      <div>Ingredients</div>
      <IngredientsList>
        <div className="ingredient-grid">
          <div className="ingredient-list">
            <Link href="/ingredients/bread">
              빵
            </Link>
          </div>
          <div className="ingredient-list">
            <Link href="/ingredients/cheese">
              치즈
            </Link>
          </div>
          <div className="ingredient-list">
            <Link href="/ingredients/sauce">
              소스
            </Link>
          </div>
          <div className="ingredient-list">
            <Link href="/ingredients/vegetable">
              야채
            </Link>
          </div>
        </div>
      </IngredientsList>
    </>
  )
}