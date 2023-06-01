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

const SwiperStyleRot = styled.div`
  --swiper-theme-color: var(--primary-yellow);
  margin: auto;
  // max-width: 1024px;

  .swiper-slide {
    display: flex;
    justify-content: center;
  }

  // @media screen and (min-width: 1024px) {
  //   max-width: 900px;
  // }

  // @media screen and (max-width: 1024px) {
  //   max-width: 600px;
  // }
`

export default function Usage() {

  return (
    <>
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
            <UsageSauce />
          </SwiperSlide>
          <SwiperSlide>
            <UsageSet />
          </SwiperSlide>
        </Swiper>
      </SwiperStyleRot>
    </>
  )
}