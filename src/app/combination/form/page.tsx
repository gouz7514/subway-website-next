'use client'

import { useState, useEffect } from "react"
import styled from "styled-components"
import { MenuTypes, IngredientTypes } from "@/types/types"

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import Image from "next/image"

import Loading from "@/app/components/Loading"
import { getMenus, getIngredients } from "@/lib/util/api"
import { useQuery, QueryClient } from "@tanstack/react-query"

const queryClient = new QueryClient()

const CombinationFormWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  margin: 12px auto;
  max-width: 1024px;
  padding: 24px;
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

const SwiperStyleRoot = styled.div`
  .swiper {
    height: 200px;
    position: relative;
  }

  .swiper-wrapper {
    height: calc(200px - 24px) !important;
    padding: 12px 0;
  }

  .ingredient-slide {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius: 12px;
    overflow: hidden;

    .ingredient-checked {
      display: none;
    }

    &.checked {
      .ingredient-checked {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        width: 50px;
        height: 50px;
        background-image: url('/icon/icon_check.svg');
        background-size: 50px 50px;
        background-repeat: no-repeat;
      }
    }
  }

  .ingredient-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    height: 100%;

    .ingredient-title {
      font-size: 16px;
      position: absolute;
      left: 0;
      background-color: var(--primary-green);
      border-top-left-radius: 12px;
      border-bottom-right-radius: 12px;
      padding: 6px 8px;
      color: white;
    }
  }
`

const CombinationFormResult = styled.section` 
  display: flex;
  flex-direction: column;
  align-items: center;

  .combination-form-result {
    width: 100%;
    max-width: 600px;
    background-color: var(--primary-yellow);
    border-radius: 12px;
    padding: 12px;

    .combination-ready {
      font-size: 24px;
      font-weight: bold;
    }

    .combination-result-content {
      display: flex;
      gap: 12px;
      flex-direction: column;
      margin-top: 12px;
  
      .combination-item-list {
        display: flex;
        flex-direction: column;
  
        .combination-item-title {
          font-size: 20px;
          font-weight: bold;
        }
  
        .combination-item {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
  
          .combination-item-inner {
            background-color: var(--primary-green);
            padding: 6px 8px;
            color: white;
            font-size: 16px;
            font-weight: bold;
            border-radius: 6px;
          }
        }
      }
    }
  }

  .combination-submit-btn {
    margin: 12px auto;
    width: 100%;
    max-width: 600px;
    padding: 12px;
    background-color: var(--primary-green);
    border: none;
    color: white;
    font-size: 20px;
    font-weight: bold;
    border-radius: 12px;
    cursor: pointer;

    &:hover {
      background-color: var(--primary-green-hover);
    }

    &:disabled {
      cursor: not-allowed;
    }
  }
`

export default function CombinationForm() {
  const [menus, setMenus] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [loading, setLoading] = useState(true)
  const [btnLoading, setBtnLoading] = useState(false)

  const [swiperCnt, setSwiperCnt] = useState(0)

  // 화면 크기에 따라 swiper slide의 갯수 조절
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 400) {
        setSwiperCnt(1.5)
      } else if (window.innerWidth < 600) {
        setSwiperCnt(2)
      } else if (window.innerWidth < 1024) {
        setSwiperCnt(3)
      } else {
        setSwiperCnt(4)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // 선택된 결과를 모아놓는 배열
  const [selectedCombinations, setSelectedCombinations] = useState<{
    menu: number
    bread: number
    cheese: Set<number>
    sauce: Set<number>
  }>({
    menu: 0,
    bread: 0,
    cheese: new Set<number>(),
    sauce: new Set<number>()
  })

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
        setSelectedCombinations((prevState) => {
          const updatedCheese = new Set(prevState.cheese)
          if (updatedCheese.has(id)) {
            updatedCheese.delete(id)
          } else {
            updatedCheese.add(id)
          }
          return { ...prevState, cheese: updatedCheese }
        })
        break
      case 'sauce':
        setSelectedCombinations((prevState) => {
          const updatedSauce = new Set(prevState.sauce)
          if (updatedSauce.has(id)) {
            updatedSauce.delete(id)
          } else {
            updatedSauce.add(id)
          }
          return { ...prevState, sauce: updatedSauce }
        })
        break
      default:
        break
    }
  }

  const { data: menuData, isLoading: menuLoading } = useQuery({
    queryKey: ['menus'],
    queryFn: getMenus,
    staleTime: 1000 * 60 * 5
  })

  const { data: ingredientData, isLoading: ingredientLoading } = useQuery({
    queryKey: ['ingredients'],
    queryFn: getIngredients,
    staleTime: 1000 * 60 * 5
  })

  useEffect(() => {
    if (menuData && ingredientData) {
      setMenus(menuData)
      setIngredients(ingredientData)
      setLoading(false)
    }
  }, [menuData, ingredientData])

  const onClickSubmit = async () => {
    setBtnLoading(true)
    try {
      const combinationData = {
        menu: selectedCombinations.menu,
        ingredients: [
          selectedCombinations.bread, ...Array.from(selectedCombinations.cheese), ...Array.from(selectedCombinations.sauce)
        ]
      }

      const res = await fetch('/api/combinations', {
        method: 'POST',
        body: JSON.stringify(combinationData)
      })
      const data = await res.json()
      if (data.message === 'success') {
        queryClient.invalidateQueries({
          queryKey: ['combinations']
        })

        setBtnLoading(false)
        alert('조합이 추가되었습니다!')
        location.href = '/combination'
      }
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
      {
        loading ?
        <Loading /> :
        <>
          <section className="combination-form-section">
            <div className="combination-form-item-title">
              메뉴
              <SwiperStyleRoot>
                <Swiper
                  spaceBetween={12}
                  slidesPerView={swiperCnt}
                >
                  {
                    menus.map((menu: MenuTypes) => (
                      <SwiperSlide
                        key={menu.id}
                        className={ `ingredient-slide ${selectedCombinations.menu === menu.id ? 'checked' : ''}` }
                        onClick={() => handleOptionSelect('menu', menu.id)}
                      >
                        <div className="ingredient-item">
                          <Image
                            src={menu.image}
                            alt={menu.title}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: '100%', height: '100%' }}
                          />
                          <div className="ingredient-title">
                            { menu.title }
                          </div>
                        </div>
                        <div className="ingredient-checked" />
                      </SwiperSlide>
                    ))
                  }
                </Swiper>
              </SwiperStyleRoot>
            </div>
            <div className="combination-form-item-title">
              빵
              <SwiperStyleRoot>
                <Swiper
                  spaceBetween={12}
                  slidesPerView={swiperCnt}
                >
                  {
                    ingredients.filter((ingredient: IngredientTypes) => ingredient.type === 'bread')
                      .map((ingredient: IngredientTypes, idx: number) => (
                        <SwiperSlide
                          key={ingredient.id}
                          className={ `ingredient-slide ${selectedCombinations.bread === idx + 1 ? 'checked' : ''}` }
                          onClick={() => handleOptionSelect('bread', ingredient.id)}
                        >
                          <div className="ingredient-item">
                            <Image
                              src={ingredient.image}
                              alt={ingredient.title}
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{ width: '100%', height: '100%' }}
                            />
                            <div className="ingredient-title">
                              { ingredient.title }
                            </div>
                          </div>
                          <div className="ingredient-checked" />
                        </SwiperSlide>
                      ))
                  }
                </Swiper>
              </SwiperStyleRoot>
            </div>
            <div className="combination-form-item-title">
              치즈
              <SwiperStyleRoot>
                <Swiper
                  spaceBetween={12}
                  slidesPerView={swiperCnt}
                >
                  {
                    ingredients.filter((ingredient: IngredientTypes) => ingredient.type === 'cheese')
                      .map((ingredient: IngredientTypes, idx: number) => (
                        <SwiperSlide
                          key={ingredient.id}
                          className={ `ingredient-slide ${Array.from(selectedCombinations.cheese).includes(ingredient.id) ? 'checked' : ''}` }
                          onClick={() => handleOptionSelect('cheese', ingredient.id)}
                        >
                          <div className="ingredient-item">
                            <Image
                              src={ingredient.image}
                              alt={ingredient.title}
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{ width: '100%', height: '100%' }}
                            />
                            <div className="ingredient-title">
                              { ingredient.title }
                            </div>
                          </div>
                          <div className="ingredient-checked" />
                        </SwiperSlide>
                      ))
                  }
                </Swiper>
              </SwiperStyleRoot>
            </div>
            <div className="combination-form-item-title">
              소스
              <SwiperStyleRoot>
                <Swiper
                  spaceBetween={12}
                  slidesPerView={swiperCnt}
                >
                  {
                    ingredients.filter((ingredient: IngredientTypes) => ingredient.type === 'sauce')
                      .map((ingredient: IngredientTypes, idx: number) => (
                        <SwiperSlide
                          key={ingredient.id}
                          className={ `ingredient-slide ${Array.from(selectedCombinations.sauce).includes(ingredient.id) ? 'checked' : ''}` }
                          onClick={() => handleOptionSelect('sauce', ingredient.id)}
                        >
                          <div className="ingredient-item">
                            <Image
                              src={ingredient.image}
                              alt={ingredient.title}
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{ width: '100%', height: '100%' }}
                            />
                            <div className="ingredient-title">
                              { ingredient.title }
                            </div>
                          </div>
                          <div className="ingredient-checked" />
                        </SwiperSlide>
                      ))
                  }
                </Swiper>
              </SwiperStyleRoot>
            </div>
          </section>
          <CombinationFormResult>
            <div className="combination-form-result">
              <div className="combination-ready">
                샌드위치 조합 완료!
              </div>
              <div className="combination-result-content">
                <div className="combination-item-list">
                  <div className="combination-item-title">
                    메뉴
                  </div>
                  <div className="combination-item">
                    {
                      menus.filter((menu: MenuTypes) => menu.id === selectedCombinations.menu)
                        .map((menu: MenuTypes) => (
                          <div className="combination-item-inner" key={menu.id}>{menu.title}</div>
                        ))
                    }
                  </div>
                </div>
                <div className="combination-item-list">
                  <div className="combination-item-title">
                    빵
                  </div>
                  <div className="combination-item">
                    {
                      ingredients.filter((ingredient: IngredientTypes) => ingredient.id === selectedCombinations.bread)
                        .map((ingredient: IngredientTypes) => (
                          <div className="combination-item-inner" key={ingredient.id}>{ingredient.title}</div>
                        ))
                    }
                  </div>
                </div>
                <div className="combination-item-list">
                  <div className="combination-item-title">
                    치즈
                  </div>
                  <div className="combination-item">
                  {
                    ingredients.filter((ingredient: IngredientTypes) => Array.from(selectedCombinations.cheese).includes(ingredient.id))
                      .map((ingredient: IngredientTypes) => (
                        <div className="combination-item-inner" key={ingredient.id}>{ingredient.title}</div>
                      ))
                  }
                  </div>
                </div>
                <div className="combination-item-list">
                  <div className="combination-item-title">
                    소스
                  </div>
                  <div className="combination-item">
                    {
                      ingredients.filter((ingredient: IngredientTypes) => Array.from(selectedCombinations.sauce).includes(ingredient.id))
                        .map((ingredient: IngredientTypes) => (
                          <div className="combination-item-inner" key={ingredient.id}>{ingredient.title}</div>
                        ))
                    }
                  </div>
                </div>
              </div>
            </div>
            <button className="combination-submit-btn" onClick={onClickSubmit} disabled={btnLoading}>
              {
                btnLoading ?
                '제출 중' :
                '제출하기'
              }
            </button>
          </CombinationFormResult>
        </>
      }
    </CombinationFormWrapper>
  )
}