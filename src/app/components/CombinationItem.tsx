import styled from 'styled-components'
import { CombinationTypes, IngredientTypes } from '@/types/types'
import Image from 'next/image'

const CombinationItemWrapper = styled.div`
  box-shadow: var(--box-shadow);
  border-radius: 12px;
  position: relative;
  background-color: var(--primary-yellow);

  .combination-id {
    background-color: var(--primary-green);
    color: white;
    border-top-left-radius: 12px;
    border-bottom-right-radius: 12px;
    text-align: center;
    padding: 12px 0;
    font-weight: bold;
    width: 50px;
  }

  .combination-content {
    display: flex;
    align-items: center;
    border-radius: 12px;
    padding: 12px;
    gap: 12px;

    @media screen and (max-width: 600px) {
      flex-direction: column;
    }
  }

  .combination-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    height: 100%;
    width: 100%;
    position: relative;

    .combination-menu-image {
      width: 100%;
      height: 100%;
      border-radius: 12px;
      box-shadow: var(--box-shadow);
      background-color: white;

      @media screen and (max-width: 600px) {
        height: 200px
      }
    }

    .combination-menu-title {
      position: absolute;
      left: 0;
      padding: 6px 8px;
      border-top-left-radius: 12px;
      border-bottom-right-radius: 12px;
      background-color: var(--primary-green);
      color: white;
      font-weight: bold;
    }
  }

  .combination-ingredients {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    gap: 12px;

    .combination-ingredients-primary,
    .combination-ingredients-sauce {
      display: flex;
      gap: 12px;
      width: 100%;
    }

    .ingredient-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 50%;
      position: relative;

      .ingredient-image {
        width: 100%;
        height: 100%;
        border-radius: 12px;
        box-shadow: var(--box-shadow);
        overflow: hidden;
      }

      .ingredient-title {
        position: absolute;
        left: 0;
        padding: 6px 8px;
        border-top-left-radius: 12px;
        border-bottom-right-radius: 12px;
        background-color: var(--primary-green);
        color: white;
        font-weight: bold;
      }
    }
  }
`

interface CombinationItemProps {
  combination: CombinationTypes
  idx: number
}

export default function CombinationItem({ combination, idx }: CombinationItemProps) {
  const { menu, ingredients } = combination

  return (
    <CombinationItemWrapper>
      <div className="combination-id">
        { idx + 1 }
      </div>
      <div className="combination-content">
        <div className="combination-menu">
          <div className="combination-menu-image">
            { menu && (
              <Image
                src={menu.image}
                alt={menu.title}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: '100%' }}
              />
            )}
          </div>
          <div className="combination-menu-title">
            {
              menu?.title
            }
          </div>
        </div>
        <div className="combination-ingredients">
          <div className="combination-ingredients-primary">
            {
              ingredients && (
                ingredients
                  .filter((ingredient: IngredientTypes) => ingredient.type !== 'sauce')
                  .sort((a: IngredientTypes, b: IngredientTypes) => {
                    const order = ['bread', 'cheese']
                    return order.indexOf(a.type) - order.indexOf(b.type)
                  })
                  .map((ingredient: IngredientTypes) => (
                    <div key={ingredient.id} className='ingredient-item'>
                      <div className="ingredient-image">
                        <Image
                          src={ingredient.image}
                          alt={ingredient.title}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: '100%', height: '100%' }}
                        />
                      </div>
                      <div className="ingredient-title">
                        { ingredient.title }
                      </div>
                    </div>
                  ))
              )
            }
          </div>
          <div className="combination-ingredients-sauce">
            {
              ingredients && (
                ingredients.filter((ingredient: IngredientTypes) => ingredient.type === 'sauce')
                  .map((ingredient: IngredientTypes) => (
                    <div key={ingredient.id} className='ingredient-item'>
                      <div className="ingredient-image">
                        <Image
                          src={ingredient.image}
                          alt={ingredient.title}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: '100%', height: '100%' }}
                        />
                      </div>
                      <div className="ingredient-title">
                        { ingredient.title }
                      </div>
                    </div>
                  ))
              )
            }
          </div>
        </div>
      </div>
    </CombinationItemWrapper>
  )
}