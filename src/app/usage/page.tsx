'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import {
  UsageMenu,
  UsageBread,
  UsageCheese,
  UsageVegetable,
  UsageExtra,
  UsageSet
} from './UsageList'

export default function Usage() {
  return (
    <>
      <Swiper
        spaceBetween={12}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
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
    </>
  )
}