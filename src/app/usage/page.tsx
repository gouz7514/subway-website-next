'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, {  Pagination } from "swiper"
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import styled from 'styled-components'

import {
  UsageMenu,
  UsageBread,
  UsageCheese,
  UsageVegetable,
  UsageSauce,
  UsageSet
} from './UsageList'

SwiperCore.use([Pagination])

const SwiperStyleRoot = styled.div`
  margin: auto;

  .swiper-pagination-bullet {
    background-color: var(--primary-yellow);
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
  }
`

export default function Usage() {
  const slideContents: React.ReactNode[] = [
    <UsageMenu key="menu" />,
    <UsageBread key="bread" />,
    <UsageCheese key="cheese" />,
    <UsageVegetable key="vegetable" />,
    <UsageSauce key="sauce" />,
    <UsageSet key="set" />
  ]

  return (
    <>
      <SwiperStyleRoot>
        <Swiper
          modules={[Pagination]}
          spaceBetween={12}
          slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          pagination={{ clickable: true }}
        >
          {
            slideContents.map((content, index) => (
              <SwiperSlide key={index}>
                {content}
              </SwiperSlide>
            ))
          }
        </Swiper>
      </SwiperStyleRoot>
    </>
  )
}