import { IngredientTypes } from "@/types/types";
import styled from "styled-components"
import Image from "next/image";

const IngredientWrapper = styled.div`
  .item {
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    position: relative;
    height: 100%;

    .item-image {
      text-align: center;
      height: 70%;
      position: relative;
    }

    .item-content {
      padding: 12px;
      height: 30%;
      display: flex;
      flex-direction: column;
      // justify-content: space-between;

      .item-title {
        font-size: 1.1em;
        font-weight: bold;
      }

      .item-description {
        font-size: 0.8em;
        flex-grow: 2;
      }

      .item-kcal {
        font-size: 0.9em;
        color: var(--primary-yellow);
        font-weight: bold;
      }
    }
  }
`

export default function IngredientItem({ ingredient }: { ingredient: IngredientTypes }) {
  const { id, title, image, description, kcal, type } = ingredient

  return (
    <IngredientWrapper>
      <div className="item">
        <div className="item-image">
          <Image
            src={image}
            alt={title}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div className="item-content">
          <div className="item-title">
            { title }
          </div>
          <div className="item-description">
            { description }
          </div>
          <div className="item-kcal">
            { kcal !== 0 ? kcal +  ' kcal' : '' }
          </div>
        </div>
      </div>
    </IngredientWrapper>
  )
}