'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination } from "swiper"
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
  UsageExtra,
  UsageSet
} from './UsageList'

SwiperCore.use([Pagination])

const SwiperStyleRot = styled.div`
  --swiper-theme-color: var(--primary-yellow);

  .swiper-slide {
    display: flex;
    justify-content: center;
  }
`

export default function Usage() {
  return (
    <SwiperStyleRot>
      <Swiper
        modules={[Pagination]}
        spaceBetween={12}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <UsageMenu />
        </SwiperSlide>
        <SwiperSlide>
          <UsageBread />
        </SwiperSlide>
        <SwiperSlide>
          <UsageCheese />
        </SwiperSlide>
        <SwiperSlide>
          <UsageVegetable />
        </SwiperSlide>
        <SwiperSlide>
          <UsageExtra />
        </SwiperSlide>
        <SwiperSlide>
          <UsageSet />
        </SwiperSlide>
      </Swiper>
    </SwiperStyleRot>
  )
}