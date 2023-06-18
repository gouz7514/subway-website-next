'use client'

import Link from 'next/link'
import styled from 'styled-components'



const IngredientsList = styled.div`
  display: flex;
  height: calc(100vh - 100px);

  .ingredient-grid {
    display: grid;
    grid-template-columns: repeat(2, 350px);
    grid-template-rows: repeat(2, 350px);
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
      grid-template-columns: repeat(2, minmax(50%, 200px));
      grid-template-rows: repeat(2, minmax(50%, 200px));
    }
  }

  .ingredient-list {
    box-shadow: var(--box-shadow);
    height: 100%;
    width: 100%;
    border-radius: 12px;
    padding: 18px;
    display: flex;
    align-items: center;
    justify-content: center;

    .ingredient-item {
      width: 100%;
      height: 100%;
    }

    .ingredient-image {
      width: 100%;
      height: 100%;
      background-size: 100% 100%;
      background-repeat: no-repeat;

      &.bread {
        background-image: url('/image/image-bread.svg');
      }

      &.cheese {
        background-image: url('/image/image-cheese.svg');
      }

      &.sauce {
        background-image: url('/image/image-sauce.svg');
      }

      &.vegetable {
        background-image: url('/image/image-vegetable.svg');
      }
    }

    &:hover {
      transform: translateY(-6px) scale(1.05);
      transition: all 0.3s ease-in-out;
    }
  }
`

export default function PageIngredients() {
  return (
    <>
      <IngredientsList>
        <div className="ingredient-grid">
          <Link href="/ingredients/bread" className="ingredient-list">
            <div className="ingredient-item">
              <div className="ingredient-image bread"></div>
            </div>
          </Link>
          <Link href="/ingredients/cheese" className="ingredient-list">
            <div className="ingredient-item">
              <div className="ingredient-image cheese"></div>
            </div>
          </Link>
          <Link href="/ingredients/sauce" className="ingredient-list">
            <div className="ingredient-item">
              <div className="ingredient-image sauce"></div>
            </div>
          </Link>
          <Link href="/ingredients/vegetable" className="ingredient-list">
            <div className="ingredient-item">
              <div className="ingredient-image vegetable"></div>
            </div>
          </Link>
        </div>
      </IngredientsList>
    </>
  )
}